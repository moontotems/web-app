import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString =
	process.env.SUPABASE_DB_URL ||
	'postgres://postgres:postgres@localhost:5432/postgres'

const postgresClient = postgres(connectionString, {
	max: 10,
	idle_timeout: 20,
	connect_timeout: 10,
	prepare: false, // Required for Supabase pooler compatibility.
	onnotice: (notice) => {
		console.info('Postgres notice', notice)
	},
	onclose: (client) => {
		console.info('Postgres client closed', client)
	},
})

export const postgres_db = drizzle(postgresClient, { schema })

export const transaction = postgresClient.begin
