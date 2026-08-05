import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import * as schema from './schema'

export { schema }

export { and, asc, desc, eq, inArray, like, not, or, sql } from 'drizzle-orm'

export type Moontotem = InferSelectModel<typeof schema.moontotems>
export type NewMoontotem = InferInsertModel<typeof schema.moontotems>
