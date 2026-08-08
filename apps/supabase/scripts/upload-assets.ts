/**
 * Upload folders from the repo-root `assets/` directory into a Supabase
 * Storage bucket over the S3 protocol.
 *
 * Object keys mirror the path relative to `assets/`, e.g.
 * `assets/website-assets/headercrops/x.jpg` -> `website-assets/headercrops/x.jpg`,
 * matching the `${CDN_BASE}/website-assets/...` convention in apps/web.
 *
 * Resumable: files whose remote size already matches the local size are
 * skipped, so re-running after an interruption picks up where it left off.
 *
 * Credentials come from apps/supabase/.env (see .env.example): S3 access keys
 * and region from the dashboard's Storage settings page.
 *
 * Usage (from repo root):
 *   bun run storage:upload                        # website-assets + social-media
 *   bun run storage:upload -- --dry-run
 *   bun run storage:upload -- social-media
 *   bun run storage:upload -- erc721/erc721       # the 9 GB token image set
 *   bun run storage:upload -- --force --concurrency=10
 */
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	CreateBucketCommand,
	HeadBucketCommand,
	HeadObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const supabaseAppDir = resolve(scriptDir, '..')
const assetsRoot = resolve(supabaseAppDir, '../../assets')

const DEFAULT_DIRS = ['totem-owner-assets', 'website-assets', 'social-media']
const DEFAULT_CONCURRENCY = 6

const CONTENT_TYPES: Record<string, string> = {
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.webp': 'image/webp',
	'.svg': 'image/svg+xml',
	'.mp4': 'video/mp4',
	'.webm': 'video/webm',
	'.mov': 'video/quicktime',
	'.json': 'application/json',
	'.txt': 'text/plain',
	'.pdf': 'application/pdf',
}

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

type CliOptions = {
	dirs: string[]
	dryRun: boolean
	force: boolean
	concurrency: number
	bucket?: string
}

function parseArgs(argv: string[]): CliOptions {
	const options: CliOptions = {
		dirs: [],
		dryRun: false,
		force: false,
		concurrency: DEFAULT_CONCURRENCY,
	}
	for (const arg of argv) {
		if (arg === '--dry-run') options.dryRun = true
		else if (arg === '--force') options.force = true
		else if (arg.startsWith('--concurrency=')) {
			const n = Number(arg.slice('--concurrency='.length))
			if (!Number.isInteger(n) || n < 1) {
				console.error(`Invalid --concurrency value: ${arg}`)
				process.exit(1)
			}
			options.concurrency = n
		} else if (arg.startsWith('--bucket=')) {
			options.bucket = arg.slice('--bucket='.length)
		} else if (arg.startsWith('--')) {
			console.error(`Unknown flag: ${arg}`)
			process.exit(1)
		} else {
			options.dirs.push(arg.replace(/\/+$/, ''))
		}
	}
	if (options.dirs.length === 0) options.dirs = [...DEFAULT_DIRS]
	return options
}

// ---------------------------------------------------------------------------
// Env
// ---------------------------------------------------------------------------

/**
 * Bun auto-loads .env from the cwd; this fallback makes the script work when
 * invoked from a different directory too.
 */
function loadEnvFile() {
	const envPath = join(supabaseAppDir, '.env')
	if (!existsSync(envPath)) return
	for (const line of readFileSync(envPath, 'utf8').split('\n')) {
		const m = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*"?([^"\r\n]*)"?\s*$/)
		if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2]
	}
}

function requireEnv(name: string): string {
	const value = process.env[name]
	if (!value) {
		console.error(
			`Missing ${name}. Copy apps/supabase/.env.example to apps/supabase/.env and fill in the S3 credentials from the Supabase dashboard (Storage settings -> S3 connection).`,
		)
		process.exit(1)
	}
	return value
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

type FileEntry = {
	absPath: string
	/** Object key in the bucket: path relative to assets/, forward slashes. */
	key: string
	size: number
}

/**
 * Supabase Storage only accepts object keys matching
 * `[\w/!-.*'() &$@=;:+,?]`; anything else (e.g. `[` and `]`) is rejected.
 * Replace disallowed characters with `_`.
 */
function sanitizeKey(key: string): string {
	return key.replace(/[^\w/!\-.*'() &$@=;:+,?]/g, '_')
}

async function walkDir(dir: string, files: FileEntry[]) {
	const entries = await readdir(dir, { withFileTypes: true })
	for (const entry of entries) {
		// Skip .git, .DS_Store and other dotfiles.
		if (entry.name.startsWith('.')) continue
		const absPath = join(dir, entry.name)
		if (entry.isDirectory()) {
			await walkDir(absPath, files)
		} else if (entry.isFile()) {
			const { size } = await stat(absPath)
			const rawKey = relative(assetsRoot, absPath).split('\\').join('/')
			const key = sanitizeKey(rawKey)
			if (key !== rawKey) {
				console.warn(`Warning: renaming object key with unsupported characters:\n  ${rawKey}\n  -> ${key}`)
			}
			files.push({ absPath, key, size })
		}
	}
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

function formatBytes(bytes: number): string {
	if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(2)} GB`
	if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`
	if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`
	return `${bytes} B`
}

function httpStatus(error: unknown): number | undefined {
	return (error as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode
}

function errorName(error: unknown): string {
	return (error as { name?: string })?.name ?? 'Error'
}

function errorMessage(error: unknown): string {
	return (error as { message?: string })?.message ?? String(error)
}

function isEntityTooLarge(error: unknown): boolean {
	return errorName(error) === 'EntityTooLarge' || httpStatus(error) === 413
}

async function remoteSize(
	client: S3Client,
	bucket: string,
	key: string,
): Promise<number | undefined> {
	try {
		const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
		return head.ContentLength
	} catch (error) {
		if (errorName(error) === 'NotFound' || httpStatus(error) === 404) return undefined
		throw error
	}
}

async function ensureBucket(client: S3Client, bucket: string) {
	try {
		await client.send(new HeadBucketCommand({ Bucket: bucket }))
		return
	} catch (error) {
		if (errorName(error) !== 'NotFound' && httpStatus(error) !== 404) throw error
	}
	console.log(`Bucket "${bucket}" does not exist; creating it ...`)
	await client.send(new CreateBucketCommand({ Bucket: bucket }))
	console.warn(
		`Warning: buckets created via the S3 protocol are private. Toggle "Public bucket" in the Supabase dashboard if these assets should be publicly readable.`,
	)
}

async function uploadFile(client: S3Client, bucket: string, file: FileEntry) {
	const upload = new Upload({
		client,
		params: {
			Bucket: bucket,
			Key: file.key,
			Body: createReadStream(file.absPath),
			ContentType: CONTENT_TYPES[extname(file.key).toLowerCase()] ?? 'application/octet-stream',
			CacheControl: 'public, max-age=31536000, immutable',
		},
		partSize: 8 * 1024 * 1024,
		queueSize: 4,
		leavePartsOnError: false,
	})
	await upload.done()
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
	const options = parseArgs(process.argv.slice(2))
	loadEnvFile()

	// Collect files first so both dry runs and real runs report the same plan.
	const files: FileEntry[] = []
	for (const dir of options.dirs) {
		const absDir = resolve(assetsRoot, dir)
		if (!absDir.startsWith(assetsRoot)) {
			console.error(`Refusing to upload from outside assets/: ${dir}`)
			process.exit(1)
		}
		if (!existsSync(absDir)) {
			console.error(`Directory not found: ${absDir}`)
			process.exit(1)
		}
		await walkDir(absDir, files)
	}
	files.sort((a, b) => a.key.localeCompare(b.key))

	const totalBytes = files.reduce((sum, f) => sum + f.size, 0)
	console.log(
		`Found ${files.length} files (${formatBytes(totalBytes)}) in: ${options.dirs.join(', ')}`,
	)

	const withSpaces = files.filter((f) => f.key.includes(' '))
	if (withSpaces.length > 0) {
		console.warn(
			`Warning: ${withSpaces.length} object key(s) contain spaces (URLs will need encoding):`,
		)
		for (const f of withSpaces) console.warn(`  ${f.key}`)
	}

	if (options.dryRun) {
		for (const f of files) console.log(`  ${f.key}  (${formatBytes(f.size)})`)
		console.log(`Dry run: would upload ${files.length} files (${formatBytes(totalBytes)}).`)
		return
	}

	const projectRef = requireEnv('SUPABASE_PROJECT_REF')
	const accessKeyId = requireEnv('SUPABASE_S3_ACCESS_KEY')
	const secretAccessKey = requireEnv('SUPABASE_S3_SECRET_KEY')
	const region = requireEnv('SUPABASE_S3_REGION')
	const bucket = options.bucket ?? process.env.SUPABASE_STORAGE_BUCKET ?? 'moontotems'

	const client = new S3Client({
		forcePathStyle: true,
		region,
		// The direct storage hostname performs better for large uploads than
		// the <ref>.supabase.co API gateway.
		endpoint: `https://${projectRef}.storage.supabase.co/storage/v1/s3`,
		credentials: { accessKeyId, secretAccessKey },
		// aws-sdk >= 3.729 sends x-amz-checksum-crc32 by default, which some
		// S3-compatible backends reject with 501 NotImplemented.
		requestChecksumCalculation: 'WHEN_REQUIRED',
		responseChecksumValidation: 'WHEN_REQUIRED',
	})

	await ensureBucket(client, bucket)
	console.log(`Uploading to bucket "${bucket}" (concurrency ${options.concurrency}) ...`)

	let uploaded = 0
	let skipped = 0
	let uploadedBytes = 0
	const failures: { key: string; error: unknown }[] = []
	let nextIndex = 0

	async function worker() {
		while (true) {
			const index = nextIndex++
			if (index >= files.length) return
			const file = files[index]
			const progress = `[${index + 1}/${files.length}]`
			try {
				if (!options.force) {
					const existing = await remoteSize(client, bucket, file.key)
					if (existing === file.size) {
						skipped++
						console.log(`${progress} skip (exists)  ${file.key}`)
						continue
					}
				}
				await uploadFile(client, bucket, file)
				uploaded++
				uploadedBytes += file.size
				console.log(`${progress} uploaded  ${file.key}  (${formatBytes(file.size)})`)
			} catch (error) {
				failures.push({ key: file.key, error })
				if (isEntityTooLarge(error)) {
					console.error(
						`${progress} FAILED  ${file.key}  (${formatBytes(file.size)}): exceeds the project's max file size. The Free plan caps files at 50 MB; raise the limit in the dashboard's Storage settings (requires Pro).`,
					)
				} else {
					console.error(`${progress} FAILED  ${file.key}: ${errorMessage(error)}`)
				}
			}
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(options.concurrency, files.length) }, () => worker()),
	)

	console.log(
		`Done. ${uploaded} uploaded (${formatBytes(uploadedBytes)}), ${skipped} skipped, ${failures.length} failed.`,
	)
	if (failures.length > 0) {
		console.error('Failed files:')
		for (const { key, error } of failures) console.error(`  ${key}: ${errorMessage(error)}`)
		process.exit(1)
	}
}

main().catch((error) => {
	console.error(error)
	process.exit(1)
})
