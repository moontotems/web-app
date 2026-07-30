-- MoonTotems metadata table, mirroring the Drizzle schema in
-- `packages/db-drizzle/src/schema.ts`. One row per token with a typed column
-- per Houdini metadata field; column names match the keys in
-- houdini_json_hashmap.json exactly (hence the quoted mixed-case identifiers).
--
-- Populated by `packages/db-drizzle/scripts/import-moontotems.ts`
-- (root: `bun run db:seed:moontotems`).
create table if not exists public.moontotems (
  token_id integer not null,

  -- age
  "age" integer not null,
  "ageRank" integer not null,
  "AgeScore" integer not null,

  -- birth date
  "birthDay" integer not null,
  "birthMonth" integer not null,
  "birthYear" integer not null,
  "birthYearStr" text not null,

  -- lineage
  "Generation" integer not null,
  "Parent_Id" integer not null,
  "Parent_trait_name1" text not null,
  "Parent_trait_name2" text not null,
  "Child_Id" integer not null,
  "Child_trait_name1" text not null,
  "Child_trait_name2" text not null,

  -- body colors (RGB)
  "color1_R" integer not null,
  "color1_G" integer not null,
  "color1_B" integer not null,
  "color2_R" integer not null,
  "color2_G" integer not null,
  "color2_B" integer not null,
  "color3_R" integer not null,
  "color3_G" integer not null,
  "color3_B" integer not null,
  "colorRank" integer not null,
  "colorScore" integer not null,
  "colorsTotal" integer not null,

  -- complexity
  "complexityRank" integer not null,
  "complexityMax" integer not null,
  "complexityPieces" integer not null,
  "complexityScore" integer not null,

  -- eyes
  "eyeAsymmetrical" integer not null,
  "eyeColor1_R" integer not null,
  "eyeColor1_G" integer not null,
  "eyeColor1_B" integer not null,
  "eyeColor2_R" integer not null,
  "eyeColor2_G" integer not null,
  "eyeColor2_B" integer not null,
  "eyeRank" integer not null,
  "eyeMulticolor" integer not null,
  "eyeScore" integer not null,
  "eyeShape" text not null,
  "eyeShapeId" integer not null,

  -- holes
  "holesBlobby" integer not null,
  "holesCut" integer not null,

  -- identity / indexing
  "id" integer not null,
  "index" integer not null,
  "match" integer not null,
  "total" integer not null,
  "P" text not null,

  -- lunar origin
  "lunarOriginBatchId" integer not null,
  "lunarOriginId" integer not null,
  "lunarOriginName" text not null,
  "lunarOriginNameLatin" text not null,
  "lunarOriginQuantity" integer not null,
  "lunarOriginScore" integer not null,

  -- material
  "Material" text not null,
  "MaterialId" integer not null,
  "materialScore" integer not null,
  "mat_patternBump" integer not null,
  "mat_patterBumpName" text not null,
  "mat_patternPerf" integer not null,
  "mat_patterPerfName" text not null,

  -- moon month / phase
  "moonMonth" text not null,
  "moonMonthId" integer not null,
  "moonMonthScore" integer not null,
  "moonPhase" text not null,
  "moonPhaseId" integer not null,
  "moonPhaseScore" integer not null,

  -- rarity
  "rarityRank" integer not null,
  "rarityScore" integer not null,

  -- spawn date
  "spawn_DateDay" integer not null,
  "spawn_DateMonth" integer not null,
  "spawn_DateYear" integer not null,
  "spawn_Hour" integer not null,

  -- traits
  "trait_jobField" text not null,
  "trait_jobFieldScore" integer not null,
  "trait_jobTitle" text not null,
  "trait_jobTitleScore" integer not null,
  "trait_name1" text not null,
  "trait_name2" text not null,
  "trait_personality1" text not null,
  "trait_personality2" text not null,
  "trait_personality3" text not null,

  updated_at timestamp with time zone null default now(),

  constraint moontotems_pkey primary key (token_id)
);

-- Common access patterns: rarity ranking and lunar-origin filtering.
create index if not exists moontotems_rarity_rank_idx on public.moontotems ("rarityRank");
create index if not exists moontotems_lunar_origin_id_idx on public.moontotems ("lunarOriginId");

-- Metadata is public NFT data: block writes through the Supabase API but
-- allow anyone to read. Direct Postgres connections (Drizzle) are unaffected.
alter table public.moontotems enable row level security;

create policy "Public read access" on public.moontotems
  for select using (true);
