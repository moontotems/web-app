/**
 * Generate one ERC-721 metadata JSON file per totem from
 * `packages/db-drizzle/data/houdini_json_hashmap.json`.
 *
 * Files are named `<tokenId>.json` and follow the OpenSea metadata standard
 * (name, description, image, external_url, attributes). Attribute names match
 * the facet labels used by the web app (apps/web/src/lib/nft/totem-filters.ts)
 * so marketplaces and the site describe traits consistently.
 *
 * Output goes to `packages/db-drizzle/data/metadata/`. Upload the folder to
 * the Supabase bucket to serve the files publicly, e.g. under
 *   ${CDN_BASE}/erc721/metadata/0.json
 *
 * IMPORTANT: the deployed contract (0x8fE8...9720) builds tokenURI as
 * `baseUri + tokenId` with NO `.json` suffix. If you plan to point setBaseUri
 * at these files, run with `--bare` to additionally write extension-less
 * copies (`0`, `1`, ...) that the on-chain concatenation can resolve.
 *
 * Usage (from packages/db-drizzle):
 *   bun run generate:metadata
 *   bun run generate:metadata -- --bare
 *   bun run generate:metadata -- --out=/tmp/metadata
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const dataDir = resolve(scriptDir, '../data')
const jsonPath = join(dataDir, 'houdini_json_hashmap.json')
const defaultOutDir = join(dataDir, 'metadata')

/** Same public bucket the web app reads from (apps/web/src/lib/constants.ts). */
const CDN_BASE =
	'https://qjhckpovfxlhfuoducwr.supabase.co/storage/v1/object/public/moontotems'
const SITE_BASE = 'https://moontotems.com'

type HoudiniRecord = Record<string, string | number>

type Attribute = {
	trait_type: string
	value: string | number
	display_type?: 'number'
}

// ---------------------------------------------------------------------------
// Attribute mapping (labels follow apps/web totem-filters.ts)
// ---------------------------------------------------------------------------

const STRING_TRAITS: [label: string, key: string][] = [
	['Name 1', 'trait_name1'],
	['Name 2', 'trait_name2'],
	['Job Field', 'trait_jobField'],
	['Job Title', 'trait_jobTitle'],
	['Origin', 'lunarOriginName'],
	['Origin Latin', 'lunarOriginNameLatin'],
	['Lunar Month', 'moonMonth'],
	['Lunar Phase', 'moonPhase'],
	['Material', 'Material'],
	['Bumps', 'mat_patterBumpName'],
	['Perforation', 'mat_patterPerfName'],
	['Eye Shape', 'eyeShape'],
	['Birth Year', 'birthYearStr'],
]

/** 0/1 fields shown as Yes/No, like the web app's boolean facets. */
const BOOLEAN_TRAITS: [label: string, key: string][] = [
	['Blobby Holes', 'holesBlobby'],
	['Cut Holes', 'holesCut'],
	['Asymmetrical Eye', 'eyeAsymmetrical'],
	['Multicolored Eyes', 'eyeMulticolor'],
]

const NUMBER_TRAITS: [label: string, key: string][] = [
	['Generation', 'Generation'],
	['Age', 'age'],
	['Age Score', 'AgeScore'],
	['Age Rank', 'ageRank'],
	['Color Count', 'colorsTotal'],
	['Color Rank', 'colorRank'],
	['Complexity Score', 'complexityScore'],
	['Pieces Count', 'complexityPieces'],
	['Complexity Rank', 'complexityRank'],
	['Origin Population', 'lunarOriginQuantity'],
	['Origin Score', 'lunarOriginScore'],
	['Lunar Month Score', 'moonMonthScore'],
	['Lunar Phase Score', 'moonPhaseScore'],
	['Material Score', 'materialScore'],
	['Rarity Score', 'rarityScore'],
	['Rarity Rank', 'rarityRank'],
]

function buildAttributes(record: HoudiniRecord): Attribute[] {
	const attributes: Attribute[] = []
	for (const [label, key] of STRING_TRAITS) {
		attributes.push({ trait_type: label, value: String(record[key]) })
	}
	// Repeated trait_type is the OpenSea convention for multi-value traits.
	for (const key of ['trait_personality1', 'trait_personality2', 'trait_personality3']) {
		attributes.push({ trait_type: 'Personality', value: String(record[key]) })
	}
	for (const [label, key] of BOOLEAN_TRAITS) {
		attributes.push({ trait_type: label, value: record[key] === 1 ? 'Yes' : 'No' })
	}
	for (const [label, key] of NUMBER_TRAITS) {
		attributes.push({ trait_type: label, value: Number(record[key]), display_type: 'number' })
	}
	return attributes
}

function buildMetadata(tokenId: number, record: HoudiniRecord) {
	const name = `${record.trait_name1} ${record.trait_name2}`
	const description =
		`Moon Totem #${tokenId}: ${name} - ${record.trait_jobField} ${record.trait_jobTitle}. ` +
		`${record.trait_personality1}, ${record.trait_personality2} & ${record.trait_personality3}. ` +
		`Lunar Origin: ${record.lunarOriginName} (${record.lunarOriginNameLatin}). ` +
		`Born ${record.birthYearStr} under a ${record.moonPhase} moon in the ${record.moonMonth} month.`

	return {
		name: `Moon Totem #${tokenId} - ${name}`,
		description,
		image: `${CDN_BASE}/totems/base/jpeg/2048/moontotems_g1_base_2048_${tokenId}.jpg`,
		external_url: `${SITE_BASE}/moontotem/${tokenId}`,
		attributes: buildAttributes(record),
	}
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
	let outDir = defaultOutDir
	let bare = false
	for (const arg of process.argv.slice(2)) {
		if (arg === '--bare') bare = true
		else if (arg.startsWith('--out=')) outDir = resolve(arg.slice('--out='.length))
		else {
			console.error(`Unknown argument: ${arg}`)
			process.exit(1)
		}
	}

	console.log(`Reading ${jsonPath} ...`)
	const hashmap = JSON.parse(readFileSync(jsonPath, 'utf8')) as Record<string, HoudiniRecord>
	const entries = Object.entries(hashmap)

	mkdirSync(outDir, { recursive: true })
	console.log(
		`Writing ${entries.length} metadata files to ${outDir}${bare ? ' (plus extension-less copies)' : ''} ...`,
	)

	let written = 0
	for (const [tokenIdStr, record] of entries) {
		const tokenId = Number(tokenIdStr)
		const json = JSON.stringify(buildMetadata(tokenId, record), null, 2)
		writeFileSync(join(outDir, `${tokenId}.json`), json)
		if (bare) writeFileSync(join(outDir, `${tokenId}`), json)
		written++
		if (written % 1000 === 0) process.stdout.write(`\r  ${written}/${entries.length}`)
	}
	process.stdout.write(`\r  ${written}/${entries.length}\n`)
	console.log('Done.')
}

main()
