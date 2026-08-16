import { FILTERS, type FilterId } from './filters'
import {
  type TotemFilterState,
  createEmptyTotemFilterState,
  parseTotemFilterState,
  serializeTotemFilterState,
} from './totem-filters'

export type GalleryView = 'grid' | 'list'

export type GallerySearch = {
  view: GalleryView
  /** Gallery sidebar filters (excludes myMoonTotems, which lives on /wallet). */
  filters: FilterId[]
  /** TotemFilterBar facet state (list view). */
  facets: TotemFilterState
}

export const DEFAULT_GALLERY_SEARCH: GallerySearch = {
  view: 'grid',
  filters: [],
  facets: createEmptyTotemFilterState(),
}

const VALID_FILTERS = new Set<string>(Object.values(FILTERS))

function isFilterId(value: string): value is FilterId {
  return VALID_FILTERS.has(value)
}

/** Parse `filters` from a query string value (comma-separated or repeated). */
export function parseFiltersParam(raw: unknown): FilterId[] {
  const parts: string[] = []
  if (typeof raw === 'string') {
    parts.push(...raw.split(','))
  } else if (Array.isArray(raw)) {
    for (const item of raw) {
      if (typeof item === 'string') parts.push(...item.split(','))
    }
  }

  const seen = new Set<FilterId>()
  const out: FilterId[] = []
  for (const part of parts) {
    const id = part.trim()
    if (!isFilterId(id) || seen.has(id)) continue
    seen.add(id)
    out.push(id)
  }
  return out
}

/** Serialize filters for a search object (omit empty). */
export function serializeFilters(filters: FilterId[]): string | undefined {
  const cleaned = filters.filter((f) => f !== FILTERS.myMoonTotems)
  return cleaned.length > 0 ? cleaned.join(',') : undefined
}

/** Build a typed `/all` search payload from view + filters + facets. */
export function toGallerySearch(
  view: GalleryView,
  filters: FilterId[],
  facets: TotemFilterState = createEmptyTotemFilterState(),
): { view?: GalleryView; filters?: string; facets?: string } {
  return {
    view: view === 'grid' ? undefined : view,
    filters: serializeFilters(filters),
    facets: serializeTotemFilterState(facets),
  }
}

/** TanStack Router `validateSearch` for `/all`. */
export function validateGallerySearch(search: Record<string, unknown>): GallerySearch {
  const view: GalleryView = search.view === 'list' ? 'list' : 'grid'
  const filters = parseFiltersParam(search.filters).filter((f) => f !== FILTERS.myMoonTotems)
  const facets = parseTotemFilterState(search.facets)
  return { view, filters, facets }
}

/** Next filter list when toggling Available (notMinted) vs Minted (mutually exclusive). */
export function toggleMintStatusFilters(
  active: FilterId[],
  target: typeof FILTERS.minted | typeof FILTERS.notMinted,
): FilterId[] {
  const withoutMint = active.filter((f) => f !== FILTERS.minted && f !== FILTERS.notMinted)
  if (active.includes(target)) {
    const other = target === FILTERS.minted ? FILTERS.notMinted : FILTERS.minted
    return [...withoutMint, other]
  }
  return [...withoutMint, target]
}

/** Next filter list when toggling favorites. */
export function toggleFavoriteFilter(active: FilterId[]): FilterId[] {
  if (active.includes(FILTERS.favorites)) {
    return active.filter((f) => f !== FILTERS.favorites)
  }
  return [...active.filter((f) => f !== FILTERS.myMoonTotems), FILTERS.favorites]
}
