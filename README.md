# MoonTotems

Monorepo for the MoonTotems NFT project: the web app (TanStack Start + wagmi/RainbowKit), the MoonTotems smart contracts (hardhat), and shared packages.

The codebase favors **writing a feature top-to-bottom in one file** - the SQL query, the server function that runs it, and the React component that consumes it - without losing end-to-end type safety. Small full-stack features are easier to read, change, and let an LLM iterate on when they're colocated.

---

## Why this stack

| Concern | Choice | Why this one |
| --- | --- | --- |
| Server + router + RSC-style data fetching | **TanStack Start** (Vinxi) | File-based routes, typed `Link`s, and `createServerFn(...).handler(...)` so a single `.tsx` file can hold both the server query and the component that renders it. |
| DB access | **Drizzle ORM** (`postgres-js`) | Schema is hand-authored TypeScript → tables, columns, and query results are all typed end-to-end with zero codegen step. |
| Database + auth | **Supabase** (CLI for local dev) | One container brings up Postgres, GoTrue auth, Storage, Realtime, and Studio. Auth is consumed through `@supabase/ssr` so it works inside server functions. |
| Client state / caching | **TanStack Query** | Powers the `['user']` cache in `__root.tsx` and data fetching throughout the app. |
| UI | **shadcn/ui** + Tailwind v4 + lucide-react + sonner | Owned source code (vendored into `apps/web/src/lib/components/ui/`), no runtime UI dependency. |
| Monorepo | **Bun workspaces** + **Turborepo** | Fast installs, cached typecheck/lint, parallel `dev`. |
| Lint / format | **Biome** + **ESLint** | Biome is the fast default; ESLint adds React-specific plugins (react-compiler, eslint-react, query, router). |

The two opinions that drive the rest of the design:

1. **Drizzle, not generated Supabase types**, is the single source of truth for table shapes. We don't run `supabase gen types` - the Drizzle schema in [packages/db-drizzle/src/schema.ts](packages/db-drizzle/src/schema.ts) is authored by hand, and SQL migrations in `apps/supabase/migrations/` are kept in sync with it.
2. **Server functions live next to the component that uses them.** TanStack Start's `createServerFn` runs on the server but is imported and called from client code with full type inference - see the moontotems metadata example below.

---

## Repository layout

```text
moontotems/
├── apps/
│   ├── web/         TanStack Start app: MoonTotems UI, routes,
│   │                shadcn UI, auth, server functions, wagmi/RainbowKit.
│   ├── my-app/      Standalone tsx script. Demonstrates how to
│   │                reuse the Drizzle package from a non-web
│   │                entrypoint (e.g. background worker, cron).
│   └── supabase/    Local Supabase config (ports, auth providers,
│                    email templates) and SQL migrations.
├── packages/
│   ├── hardhat/         MoonTotems smart contracts, deploy scripts,
│   │                    and the local chain (`bun run chain`).
│   ├── contracts/       Exported ABI + addresses + constants,
│   │                    imported by the web app as `@moontotems/contracts`.
│   ├── ui/              Shared shadcn/ui primitives (`@moontotems/ui`).
│   ├── db-drizzle/      Drizzle schema, drizzle-kit config, and
│   │                    the `postgres_db` client. Imported by both
│   │                    apps as `@moontotems/db-drizzle`.
│   ├── tsconfig/        Shared `base.json` + `react.json` tsconfigs.
│   │                    Apps extend these via relative path.
│   └── biome-config/    Shared Biome rules. Apps extend via relative
│                        path so all packages format identically.
└── turbo.json, package.json, bun.lock
```

### The "one-file feature" pattern

Open [apps/web/src/lib/nft/metadata.server.ts](apps/web/src/lib/nft/metadata.server.ts) to see the pattern: MoonTotem metadata lives in the `moontotems` Postgres table (one typed column per Houdini field, seeded via `bun run db:seed:moontotems`) and is served through server functions:

```tsx
// 1. A server function that talks directly to Postgres via Drizzle.
export const getTokenMetadata = createServerFn({ method: 'GET' })
  .inputValidator((data: { tokenId: number }) => data)
  .handler(async ({ data }) => {
    const rows = await postgres_db
      .select()
      .from(schema.moontotems)
      .where(inArray(schema.moontotems.token_id, [data.tokenId]))
    // ...
  })

// 2. A React component (in the same or a nearby file) calls it via React Query.
const { data } = useQuery({
  queryKey: ['totem', tokenId],
  queryFn: () => getTokenMetadata({ data: { tokenId } }),
})
```

`postgres_db` and `schema.moontotems` are inferred from the hand-written Drizzle schema, so the row type flows from Postgres column → Drizzle select → server fn return → `useQuery` → JSX without a single `as Foo` cast.

### Authentication

All auth server functions live in [apps/web/src/lib/auth/server.ts](apps/web/src/lib/auth/server.ts): `loginFn` (magic link), `verifyCodeFn` (OTP), `oauthFn` (GitHub), `logoutFn`, and `getCurrentUser`. The root route ([apps/web/src/routes/\_\_root.tsx](apps/web/src/routes/__root.tsx)) calls `getCurrentUser` once per navigation, caches it in React Query under `['user']` with a 30s stale window, and exposes `context.user` to every route. The `_authenticated` route segment ([apps/web/src/routes/\_authenticated.tsx](apps/web/src/routes/_authenticated.tsx)) redirects to `/auth/login` if `context.user` is null.

Login / verify / logout mutations all invalidate `['user']` on success so a fresh session is picked up immediately.

### Drizzle as source of truth

- Edit [packages/db-drizzle/src/schema.ts](packages/db-drizzle/src/schema.ts) to add or change tables.
- Write the matching SQL change in `apps/supabase/migrations/<timestamp>_<name>.sql` (Supabase applies it via `supabase migration up`).
- Re-export anything you need in [packages/db-drizzle/src/types.ts](packages/db-drizzle/src/types.ts) (`InferSelectModel`, `InferInsertModel`).

If you'd rather have drizzle-kit produce the SQL for you, run `npx drizzle-kit generate` from `packages/db-drizzle` after editing the schema; it'll write into `packages/db-drizzle/drizzle/`.

---

## Running locally

### Prerequisites

- **Node 20.18.0** - pinned in [.nvmrc](.nvmrc). `nvm use` will switch you.
- **Bun ≥ 1.2** - `curl -fsSL https://bun.sh/install | bash`
- **Supabase CLI** - `brew install supabase/tap/supabase` (the CLI is also installed as a dev dependency in this repo for the `npx supabase` invocations).
- **Docker Desktop** running - Supabase's local stack runs in containers.

### First-time setup

```bash
# 1. Pin Node and install deps
nvm use
bun install

# 2. That's it. `bun run dev` is the one-shot bootstrap (and reload) command.
bun run dev
```

`bun run dev` runs five idempotent steps in order, each individually scriptable:

1. `env:check` -- copies `.env.example` to `.env` for each app/package that doesn't already have one.
2. `dev:db` -- boots the Supabase containers (Postgres, GoTrue, Studio, Inbucket, ...).
3. `env:sync` -- reads `supabase status -o env` from the running stack and splices the freshly-generated `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, S3 keys, and JWT secret into every local `.env`. **Safety guard**: any `.env` whose `SUPABASE_API_URL` or `SUPABASE_DB_URL` points at a non-local host is skipped, so this can never clobber prod credentials.
4. `db:migrate` -- applies any new SQL migrations under `apps/supabase/migrations/`. No-op when nothing has changed.
5. `turbo run dev --parallel` -- boots all workspace `dev` scripts (web + my-app).

### Day-to-day

```bash
# Same five steps as the bootstrap above, all idempotent.
bun run dev
```

Or run individual services:

```bash
bun run dev:db        # Supabase stack only
bun run env:check     # Create any missing .env from its .env.example
bun run env:sync      # Pull anon/service-role/S3 keys from `supabase status` into the local .env files
bun run db:migrate    # Apply any new migrations (no-op when already applied)
bun run db:reset      # DESTRUCTIVE - drop the local DB and re-apply migrations
bun run dev:web       # TanStack Start app at http://127.0.0.1:3000
bun run dev:my-app    # tsx watcher for the standalone script
```

Useful local URLs while `dev:db` is running:

| Service | URL |
| --- | --- |
| Web app | <http://127.0.0.1:3000> |
| Supabase Studio (DB UI) | <http://127.0.0.1:54423/project/default> |
| Supabase API | <http://127.0.0.1:54421> |
| Inbucket (catches outgoing emails, including magic-link OTPs) | <http://127.0.0.1:54424> |

> The Supabase ports are defined in [apps/supabase/config.toml](apps/supabase/config.toml) (`54421` API, `54422` DB, `54423` Studio, `54424` Inbucket). If you have an older local `.env` referencing `543xx` ports, refresh it from the corresponding `.env.example`.

### Checks

```bash
bun run typecheck     # tsc --noEmit on every workspace
bun run lint          # biome check on every workspace
bun run format        # biome format --write on every workspace
```

ESLint also runs on `apps/web` if you call it directly (`cd apps/web && bunx eslint src`); the shadcn-vendored components under `apps/web/src/lib/components/ui/` are intentionally ignored by both Biome and ESLint.

---

## How to work in this repo

### Adding a screen + query

1. Create the file route under `apps/web/src/routes/...` (TanStack Router file conventions: `index.tsx`, `_authenticated.tsx` for layout segments, `-components/` for route-private components).
2. In the same file, define a `createServerFn({ method: 'GET' }).handler(async () => …)` that uses `postgres_db` + `schema.*` from `@moontotems/db-drizzle`.
3. Call it from `useQuery` (or `useMutation` for writes). Errors thrown server-side surface in React Query's `error`.

### Adding a table

1. Add the `pgTable(...)` definition to [packages/db-drizzle/src/schema.ts](packages/db-drizzle/src/schema.ts).
2. Write the SQL in a new `apps/supabase/migrations/<UTC-timestamp>_<name>.sql`. The filename prefix (`YYYYMMDDHHMMSS_…`) is what Supabase orders by; copy the format of the existing migration. **Editing a migration after it's been applied won't re-run it** - always create a new file for changes.
3. `bun run db:migrate` (or just `bun run dev`, which chains migrate before starting the apps).
4. (Optional) `cd packages/db-drizzle && npx drizzle-kit generate` to have drizzle-kit produce the migration for you - but commit only one version.

If you ever get stuck because a local migration was applied with stale content, `bun run db:reset` will wipe the local DB and re-apply everything.

### Adding a shadcn component

```bash
cd apps/web
bun run ui add <component-name>
```

It writes into `apps/web/src/lib/components/ui/` and is automatically excluded from lint.

### Adding a new app or package

1. Create the folder under `apps/` or `packages/` with a `package.json` named `@moontotems/<name>` and `"private": true`.
2. `extends` the shared configs:

   ```jsonc
   // tsconfig.json
   { "extends": "../../packages/tsconfig/base.json" /* or react.json */ }
   ```

   ```jsonc
   // biome.json
   { "extends": ["../../packages/biome-config/biome.json"] }
   ```

3. Run `bun install` at the repo root to wire up the workspace symlinks.

### Auth flow

```text
visitor ──► /auth/login ──► loginFn (magic link emailed via Inbucket)
                       └─► verifyCodeFn (OTP) ──► invalidate ['user']
                                                └─► redirect to /
authenticated ──► /_authenticated/* (guarded by context.user)
                                  └─► getCurrentUser cached 30s in ['user']
logout ──► logoutFn ──► invalidate ['user'] ──► redirect to /auth/login
```

---

## Packages used

- [tanstack/start](https://tanstack.com/start/latest) · [tanstack/react-router](https://tanstack.com/router/latest) · [tanstack/react-query](https://tanstack.com/query/latest)
- [drizzle-orm](https://orm.drizzle.team) · [postgres-js](https://github.com/porsager/postgres)
- [supabase](https://supabase.com) (DB + auth via `@supabase/ssr`)
- [shadcn/ui](https://ui.shadcn.com/docs/components) · [tailwindcss v4](https://tailwindcss.com) · [lucide icons](https://lucide.dev) · [sonner](https://sonner.emilkowal.ski/)
- [biome](https://biomejs.dev) · [eslint](https://eslint.org) · [turborepo](https://turbo.build) · [bun](https://bun.sh)

## License

MIT - see [LICENSE](LICENSE).
