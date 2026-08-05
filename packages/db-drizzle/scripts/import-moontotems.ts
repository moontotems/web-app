/**
 * Import the Houdini metadata hashmap (packages/db-drizzle/data/houdini_json_hashmap.json)
 * into the `moontotems` Postgres table in batched inserts.
 *
 * Column names match the JSON keys exactly, so each record maps 1:1 onto a row.
 * Idempotent: the table is truncated before importing (it is a pure derived
 * copy of the JSON file).
 *
 * Usage (from repo root, local Supabase running):
 *   bun run db:seed:moontotems
 * or directly:
 *   cd packages/db-drizzle && npx tsx scripts/import-moontotems.ts
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Default to the local Supabase database (port from apps/supabase/config.toml)
// before the db client reads the env.
process.env.SUPABASE_DB_URL ??= 'postgresql://postgres:postgres@127.0.0.1:54422/postgres'

const { postgres_db, schema, sql } = await import('../src')
type NewMoontotem = typeof schema.moontotems.$inferInsert

// 84 columns per row; keep params per statement well under Postgres' 65535 limit.
const BATCH_SIZE = 250

const jsonPath = join(
	dirname(fileURLToPath(import.meta.url)),
	'../data/houdini_json_hashmap.json',
)

async function main() {
	console.log(`Reading ${jsonPath} ...`)
	const hashmap = JSON.parse(readFileSync(jsonPath, 'utf8')) as Record<
		string,
		Record<string, string | number>
	>

	const rows: NewMoontotem[] = Object.entries(hashmap).map(
		([tokenId, record]) => ({ token_id: Number(tokenId), ...record }) as NewMoontotem,
	)
	console.log(`Importing ${rows.length} moontotems in batches of ${BATCH_SIZE} ...`)

	await postgres_db.execute(sql`truncate table ${schema.moontotems}`)

	let imported = 0
	for (let i = 0; i < rows.length; i += BATCH_SIZE) {
		const batch = rows.slice(i, i + BATCH_SIZE)
		await postgres_db.insert(schema.moontotems).values(batch)
		imported += batch.length
		process.stdout.write(`\r  ${imported}/${rows.length}`)
	}
	process.stdout.write('\n')

	const [{ count }] = await postgres_db
		.select({ count: sql<number>`count(*)::int` })
		.from(schema.moontotems)
	console.log(`Done. Table now holds ${count} rows.`)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
