# Vibe Coding Boilerplate

## Start local supabase server

```bash
npx supabase start
```

## Create a new migration file

```bash
npx supabase migration new <migration_name>

# see https://supabase.com/docs/guides/local-development/overview
```

## Reset database

```bash
npx supabase db reset
```

## Apply migrations

```bash
supabase migration up
```

## Generate types

```bash
npm run gen:types
```

## After changing email templates

```bash
# run
npx supabase start
```

## Link to supabase project

```bash
# login to supabase
npx supabase login

# list all your projects  
npx supabase projects list

# select project id and link local environment to your project
npx supabase link --project-ref your-project-id

# pull changes from supabase
npx supabase pull

# apply migrations
npx supabase db reset
supabase migration up
```

## Upload assets to Supabase Storage

`scripts/upload-assets.ts` mirrors folders from the repo-root `assets/` directory
into the `moontotems` Storage bucket over the S3 protocol. Object keys match the
path relative to `assets/` (e.g. `website-assets/headercrops/x.jpg`).

Setup (one-time):

1. Copy `.env.example` to `.env` in this directory.
2. In the Supabase dashboard, open Storage settings, create S3 access keys, and
   fill in `SUPABASE_S3_ACCESS_KEY`, `SUPABASE_S3_SECRET_KEY`, and
   `SUPABASE_S3_REGION` (shown next to the S3 endpoint).

Usage (from repo root):

```bash
# upload the default set: website-assets/ + social-media/ (~700 MB)
bun run storage:upload

# preview what would be uploaded, without credentials or network calls
bun run storage:upload -- --dry-run

# upload a specific folder (paths are relative to assets/)
bun run storage:upload -- social-media
bun run storage:upload -- erc721/erc721   # the 9 GB token image set (needs Pro)

# re-upload even if a file with the same size already exists remotely
bun run storage:upload -- --force

# tune parallel uploads (default 6)
bun run storage:upload -- --concurrency=10
```

The script is resumable: files whose remote size matches the local size are
skipped, so an interrupted run can simply be re-run.

Plan limits: the Free plan caps storage at 1 GB and individual files at 50 MB.
If a file fails with "exceeded the maximum allowed size", raise the global
file size limit in the dashboard's Storage settings (large limits require
Pro). The largest files in scope are two videos, 319 MB and 117 MB.

Object keys may only contain `[\w/!-.*'() &$@=;:+,?]`; other characters
(e.g. `[`, `]`) are replaced with `_` and the rename is logged.

If the script has to create the bucket, it is created private; toggle
"Public bucket" in the dashboard if the assets should be publicly readable.
