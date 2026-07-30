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
