-- The moontotems metadata is static, public, read-only data. The browser
-- reads it through the Supabase REST API with the anon key, so make writes
-- impossible on that path twice over:
--   1. Revoke every write privilege from the API roles (grants).
--   2. RLS stays enabled with only a select policy (no write policies exist).
-- Seeding happens through a direct connection as the `postgres` role and is
-- unaffected.
revoke insert, update, delete, truncate, references, trigger
  on table public.moontotems
  from anon, authenticated;

-- `select` remains granted to anon + authenticated (default Supabase grants),
-- and the "Public read access" policy from the create-table migration allows
-- the reads through RLS.
