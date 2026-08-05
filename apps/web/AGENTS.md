# MoonTotems web app — conventions

## File naming

- **PascalCase** for files whose primary export is a React component:
  `NftHeader.tsx`, `TotemCard.tsx`, `MoonTotemsProvider.tsx`, `routes/**/-components/ProfileForm.tsx`.
- **kebab-case** for everything else: hooks (`use-favorites.ts`), utilities
  (`image-url.ts`, `format.ts`), data modules (`slide-data.ts`,
  `lunar-origins-data.ts`), styles, and config.
- **Exceptions** (do not rename):
  - TanStack Router route files under `src/routes/` follow the router's
    path-based conventions (`index.tsx`, `$id.tsx`, `_nft.tsx`, `-components/`).
  - shadcn primitives in `packages/ui` stay kebab-case so the shadcn CLI can
    keep updating them.
- Enforced by Biome `style/useFilenamingConvention` (kebab-case or PascalCase;
  disabled for `src/routes/**`).

## Folder layout

- `src/routes/` — route files contain their page component plus
  `createFileRoute` wiring. Route-local static content lives in a colocated
  `-data.ts` module (the `-` prefix hides it from the router); route-local
  components go in `-components/`.
- `src/lib/components/nft/` — shared MoonTotems UI: shell (`NftHeader`,
  `SidebarLeft`, `NftFooter`, `ActionSidebar`), gallery
  (`TotemCard`/`TotemGrid`/`TotemTable`), `creature/` detail panels,
  `home/` landing sections.
- `src/lib/nft/` — non-visual NFT domain logic: `MoonTotemsProvider` context,
  hooks (`use-*.ts`), metadata lookup, formatting, constants.
- `src/lib/web3/` — wagmi/RainbowKit configuration (`Web3Providers`).

## Styling

- Tailwind v4 + shadcn. The NFT app is themed by the scoped `.nft-theme` class
  (`src/lib/styles/nft-theme.css`) applied on the `_nft` layout; boilerplate
  routes (auth, settings) use the default theme.
- Totem imagery comes from the Azure Blob CDN; build URLs with
  `getImageUrl()` / `CDN_BASE` from `src/lib/nft/` instead of hardcoding hosts.

## Checks

- `bun run typecheck` — TypeScript, no emit.
- `bun run biome:check` / `bun run biome:format` — lint + format (Biome).
