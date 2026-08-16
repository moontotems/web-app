/*
 * Repo-level utility scripts. Invoked as `node scripts.js <command>` and
 * also exposed via the `env:check` / `env:sync` npm scripts.
 *
 * Commands:
 *   env:check  Copy each .env.example to .env if .env is missing.
 *   env:sync   Read `supabase status -o env` from the running local stack
 *              and splice the keys into the local .env files. Skips any
 *              .env that points at a non-local URL so it can never
 *              clobber production credentials.
 */

const fs = require('node:fs')
const path = require('node:path')
const { execSync } = require('node:child_process')

const ENV_TARGETS = [
  'apps/web/.env',
  'packages/hardhat/.env',
  'apps/my-app/.env',
  'packages/db-drizzle/.env',
]

/**
 * Map a key from `supabase status -o env` output to the names that may
 * appear in our local .env files. We try every alias so the same script
 * works whether a given .env uses `SUPABASE_API_URL`, the older
 * `SUPABASE_URL`, or the `NEXT_PUBLIC_...` prefix the db-drizzle template
 * happens to use.
 */
const KEY_ALIASES = {
  API_URL: ['SUPABASE_API_URL', 'SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'VITE_SUPABASE_URL'],
  GRAPHQL_URL: ['SUPABASE_GRAPHQL_URL', 'NEXT_PUBLIC_SUPABASE_GRAPHQL_URL'],
  STORAGE_S3_URL: ['SUPABASE_STORAGE_URL', 'NEXT_PUBLIC_SUPABASE_STORAGE_URL'],
  STUDIO_URL: ['SUPABASE_STUDIO_URL', 'NEXT_PUBLIC_SUPABASE_STUDIO_URL'],
  INBUCKET_URL: ['INBUCKET_URL', 'NEXT_PUBLIC_INBUCKET_URL'],
  ANON_KEY: ['SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY'],
  DB_URL: ['SUPABASE_DB_URL'],
  JWT_SECRET: ['SUPABASE_JWT_SECRET'],
  SERVICE_ROLE_KEY: ['SUPABASE_SERVICE_ROLE_KEY'],
  S3_PROTOCOL_ACCESS_KEY_ID: ['SUPABASE_S3_ACCESS_KEY'],
  S3_PROTOCOL_ACCESS_KEY_SECRET: ['SUPABASE_S3_SECRET_KEY'],
  S3_PROTOCOL_REGION: ['SUPABASE_S3_REGION'],
}

function envCheck() {
  for (const target of ENV_TARGETS) {
    const envPath = path.join(process.cwd(), target)
    const examplePath = `${envPath}.example`
    if (fs.existsSync(envPath)) {
      console.log(`ok: ${target}`)
      continue
    }
    if (!fs.existsSync(examplePath)) {
      console.log(`skip: ${target} (no .env.example)`)
      continue
    }
    fs.copyFileSync(examplePath, envPath)
    console.log(`created: ${target} from ${path.basename(examplePath)}`)
  }
}

function parseEnvLines(text) {
  const map = {}
  for (const line of text.split('\n')) {
    // Match `KEY=value` or `KEY="value"`, ignoring banners/warnings/comments.
    const m = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*"?([^"\r\n]*)"?\s*$/)
    if (m) map[m[1]] = m[2]
  }
  return map
}

function fetchSupabaseStatus() {
  const out = execSync('npx --yes supabase status -o env', {
    cwd: path.join(process.cwd(), 'apps', 'supabase'),
    stdio: ['ignore', 'pipe', 'ignore'], // silence stderr banners
  }).toString()
  return parseEnvLines(out)
}

function isLocalUrl(url) {
  if (!url) return true // empty values are safe to fill in
  // Normalise postgres:// URLs into something the URL parser likes.
  const normalised = url.startsWith('postgres')
    ? url.replace(/^postgres(ql)?:\/\//, 'http://')
    : url
  try {
    const u = new URL(normalised)
    return u.hostname === '127.0.0.1' || u.hostname === 'localhost'
  } catch {
    return false
  }
}

function syncEnv() {
  let status
  try {
    status = fetchSupabaseStatus()
  } catch {
    console.error(
      'Could not read `supabase status`. Is the local stack running? Try `bun run dev:db`.',
    )
    process.exit(1)
  }

  if (!status.API_URL) {
    console.error('supabase status returned no usable output. Aborting.')
    process.exit(1)
  }

  for (const target of ENV_TARGETS) {
    const abs = path.join(process.cwd(), target)
    if (!fs.existsSync(abs)) {
      console.log(`skip: ${target} (does not exist; run \`bun run env:check\` first)`)
      continue
    }

    const original = fs.readFileSync(abs, 'utf8')
    const parsed = parseEnvLines(original)

    // Safety guard: never touch a .env that points at a non-local URL.
    const guard =
      parsed.SUPABASE_API_URL ||
      parsed.SUPABASE_URL ||
      parsed.NEXT_PUBLIC_SUPABASE_URL ||
      parsed.SUPABASE_DB_URL
    if (!isLocalUrl(guard)) {
      console.log(`skip: ${target} (non-local URL: ${guard})`)
      continue
    }

    let updated = original
    let touched = 0
    for (const [statusKey, aliases] of Object.entries(KEY_ALIASES)) {
      const value = status[statusKey]
      if (value === undefined) continue
      for (const envKey of aliases) {
        const regex = new RegExp(`^(${envKey}\\s*=).*$`, 'm')
        if (regex.test(updated)) {
          updated = updated.replace(regex, `$1"${value}"`)
          touched++
        }
      }
    }

    if (updated !== original) {
      fs.writeFileSync(abs, updated)
      console.log(`updated: ${target} (${touched} key${touched === 1 ? '' : 's'})`)
    } else {
      console.log(`no changes: ${target}`)
    }
  }
}

const command = process.argv[2]
switch (command) {
  case 'env:check':
    envCheck()
    break
  case 'env:sync':
    syncEnv()
    break
  default:
    console.log('Unknown command. Available commands: env:check, env:sync')
    process.exit(1)
}
