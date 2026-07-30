import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * Houdini-generated metadata for every MoonTotem, one typed column per field.
 * Column names match the keys in houdini_json_hashmap.json exactly so records
 * round-trip 1:1 (imported via `packages/db-drizzle/scripts/import-moontotems.ts`).
 */
export const moontotems = pgTable('moontotems', {
	token_id: integer().primaryKey().notNull(),

	// age
	age: integer().notNull(),
	ageRank: integer().notNull(),
	AgeScore: integer().notNull(),

	// birth date
	birthDay: integer().notNull(),
	birthMonth: integer().notNull(),
	birthYear: integer().notNull(),
	birthYearStr: text().notNull(),

	// lineage
	Generation: integer().notNull(),
	Parent_Id: integer().notNull(),
	Parent_trait_name1: text().notNull(),
	Parent_trait_name2: text().notNull(),
	Child_Id: integer().notNull(),
	Child_trait_name1: text().notNull(),
	Child_trait_name2: text().notNull(),

	// body colors (RGB)
	color1_R: integer().notNull(),
	color1_G: integer().notNull(),
	color1_B: integer().notNull(),
	color2_R: integer().notNull(),
	color2_G: integer().notNull(),
	color2_B: integer().notNull(),
	color3_R: integer().notNull(),
	color3_G: integer().notNull(),
	color3_B: integer().notNull(),
	colorRank: integer().notNull(),
	colorScore: integer().notNull(),
	colorsTotal: integer().notNull(),

	// complexity
	complexityRank: integer().notNull(),
	complexityMax: integer().notNull(),
	complexityPieces: integer().notNull(),
	complexityScore: integer().notNull(),

	// eyes
	eyeAsymmetrical: integer().notNull(),
	eyeColor1_R: integer().notNull(),
	eyeColor1_G: integer().notNull(),
	eyeColor1_B: integer().notNull(),
	eyeColor2_R: integer().notNull(),
	eyeColor2_G: integer().notNull(),
	eyeColor2_B: integer().notNull(),
	eyeRank: integer().notNull(),
	eyeMulticolor: integer().notNull(),
	eyeScore: integer().notNull(),
	eyeShape: text().notNull(),
	eyeShapeId: integer().notNull(),

	// holes
	holesBlobby: integer().notNull(),
	holesCut: integer().notNull(),

	// identity / indexing
	id: integer().notNull(),
	index: integer().notNull(),
	match: integer().notNull(),
	total: integer().notNull(),
	P: text().notNull(),

	// lunar origin
	lunarOriginBatchId: integer().notNull(),
	lunarOriginId: integer().notNull(),
	lunarOriginName: text().notNull(),
	lunarOriginNameLatin: text().notNull(),
	lunarOriginQuantity: integer().notNull(),
	lunarOriginScore: integer().notNull(),

	// material
	Material: text().notNull(),
	MaterialId: integer().notNull(),
	materialScore: integer().notNull(),
	mat_patternBump: integer().notNull(),
	mat_patterBumpName: text().notNull(),
	mat_patternPerf: integer().notNull(),
	mat_patterPerfName: text().notNull(),

	// moon month / phase
	moonMonth: text().notNull(),
	moonMonthId: integer().notNull(),
	moonMonthScore: integer().notNull(),
	moonPhase: text().notNull(),
	moonPhaseId: integer().notNull(),
	moonPhaseScore: integer().notNull(),

	// rarity
	rarityRank: integer().notNull(),
	rarityScore: integer().notNull(),

	// spawn date
	spawn_DateDay: integer().notNull(),
	spawn_DateMonth: integer().notNull(),
	spawn_DateYear: integer().notNull(),
	spawn_Hour: integer().notNull(),

	// traits
	trait_jobField: text().notNull(),
	trait_jobFieldScore: integer().notNull(),
	trait_jobTitle: text().notNull(),
	trait_jobTitleScore: integer().notNull(),
	trait_name1: text().notNull(),
	trait_name2: text().notNull(),
	trait_personality1: text().notNull(),
	trait_personality2: text().notNull(),
	trait_personality3: text().notNull(),

	updated_at: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
})
