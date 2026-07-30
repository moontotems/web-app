import { join } from 'node:path'
import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: join(process.cwd(), '.env') })

export default defineConfig({
	schema: './src/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	schemaFilter: ['public'],
	dbCredentials: {
		url:
			process.env.SUPABASE_DB_URL ||
			'postgres://postgres:postgres@localhost:5432/postgres',
		ssl: false,
	},
	verbose: true,
	strict: true,
	introspect: {
		casing: 'preserve',
	},
})
