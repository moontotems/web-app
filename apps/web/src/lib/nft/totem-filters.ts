import type { TotemTableRow } from './use-token-data'

export type MultiSelectFacetId =
  | 'lunarOriginName'
  | 'lunarOriginNameLatin'
  | 'moonMonth'
  | 'moonPhase'
  | 'Material'
  | 'mat_patterBumpName'
  | 'mat_patterPerfName'
  | 'trait_jobField'
  | 'trait_jobTitle'
  | 'eyeShape'
  | 'birthYearStr'
  | 'trait_name1'
  | 'trait_name2'
  | 'personality'

export type BooleanFacetId = 'holesBlobby' | 'holesCut' | 'eyeAsymmetrical' | 'eyeMulticolor'

export type RangeFacetId =
  | 'age'
  | 'AgeScore'
  | 'ageRank'
  | 'colorsTotal'
  | 'colorRank'
  | 'complexityScore'
  | 'complexityPieces'
  | 'complexityRank'
  | 'lunarOriginQuantity'
  | 'lunarOriginScore'
  | 'moonMonthScore'
  | 'moonPhaseScore'
  | 'materialScore'
  | 'rarityRank'
  | 'rarityScore'

export type FacetId = MultiSelectFacetId | BooleanFacetId | RangeFacetId

export type RangeValue = { min?: number; max?: number }

export type TotemFilterState = {
  multi: Partial<Record<MultiSelectFacetId, string[]>>
  boolean: Partial<Record<BooleanFacetId, boolean[]>>
  range: Partial<Record<RangeFacetId, RangeValue>>
}

export type MultiSelectFacetDef = {
  id: MultiSelectFacetId
  label: string
  kind: 'multi'
  /** Column to read for options / matching; personality uses a special path. */
  column?: keyof TotemTableRow & string
}

export type BooleanFacetDef = {
  id: BooleanFacetId
  label: string
  kind: 'boolean'
  column: BooleanFacetId
}

export type RangeFacetDef = {
  id: RangeFacetId
  label: string
  kind: 'range'
  column: RangeFacetId
}

export type FacetDef = MultiSelectFacetDef | BooleanFacetDef | RangeFacetDef

export const TOTEM_FACETS: FacetDef[] = [
  { id: 'lunarOriginName', label: 'Origin', kind: 'multi', column: 'lunarOriginName' },
  {
    id: 'lunarOriginNameLatin',
    label: 'Origin Latin',
    kind: 'multi',
    column: 'lunarOriginNameLatin',
  },
  { id: 'moonMonth', label: 'Lunar Month', kind: 'multi', column: 'moonMonth' },
  { id: 'moonPhase', label: 'Lunar Phase', kind: 'multi', column: 'moonPhase' },
  { id: 'Material', label: 'Material', kind: 'multi', column: 'Material' },
  { id: 'mat_patterBumpName', label: 'Bumps', kind: 'multi', column: 'mat_patterBumpName' },
  {
    id: 'mat_patterPerfName',
    label: 'Perforation',
    kind: 'multi',
    column: 'mat_patterPerfName',
  },
  { id: 'trait_jobField', label: 'Job Field', kind: 'multi', column: 'trait_jobField' },
  { id: 'trait_jobTitle', label: 'Job Title', kind: 'multi', column: 'trait_jobTitle' },
  { id: 'personality', label: 'Personality', kind: 'multi' },
  { id: 'eyeShape', label: 'Eye Shape', kind: 'multi', column: 'eyeShape' },
  { id: 'birthYearStr', label: 'Birth Year', kind: 'multi', column: 'birthYearStr' },
  { id: 'trait_name1', label: 'Name 1', kind: 'multi', column: 'trait_name1' },
  { id: 'trait_name2', label: 'Name 2', kind: 'multi', column: 'trait_name2' },
  { id: 'holesBlobby', label: 'Blobby Holes', kind: 'boolean', column: 'holesBlobby' },
  { id: 'holesCut', label: 'Cut Holes', kind: 'boolean', column: 'holesCut' },
  {
    id: 'eyeAsymmetrical',
    label: 'Asymmetrical Eye',
    kind: 'boolean',
    column: 'eyeAsymmetrical',
  },
  { id: 'eyeMulticolor', label: 'Multicolored Eyes', kind: 'boolean', column: 'eyeMulticolor' },
  { id: 'age', label: 'Age', kind: 'range', column: 'age' },
  { id: 'AgeScore', label: 'Age Score', kind: 'range', column: 'AgeScore' },
  { id: 'ageRank', label: 'Age Rank', kind: 'range', column: 'ageRank' },
  { id: 'colorsTotal', label: 'Color Count', kind: 'range', column: 'colorsTotal' },
  { id: 'colorRank', label: 'Color Rank', kind: 'range', column: 'colorRank' },
  { id: 'complexityScore', label: 'Complexity Score', kind: 'range', column: 'complexityScore' },
  { id: 'complexityPieces', label: 'Pieces Count', kind: 'range', column: 'complexityPieces' },
  { id: 'complexityRank', label: 'Complexity Rank', kind: 'range', column: 'complexityRank' },
  {
    id: 'lunarOriginQuantity',
    label: 'Origin Population',
    kind: 'range',
    column: 'lunarOriginQuantity',
  },
  { id: 'lunarOriginScore', label: 'Origin Score', kind: 'range', column: 'lunarOriginScore' },
  { id: 'moonMonthScore', label: 'Lunar Month Score', kind: 'range', column: 'moonMonthScore' },
  { id: 'moonPhaseScore', label: 'Lunar Phase Score', kind: 'range', column: 'moonPhaseScore' },
  { id: 'materialScore', label: 'Material Score', kind: 'range', column: 'materialScore' },
  { id: 'rarityRank', label: 'Rarity Rank', kind: 'range', column: 'rarityRank' },
  { id: 'rarityScore', label: 'Rarity Score', kind: 'range', column: 'rarityScore' },
]

export const EMPTY_TOTEM_FILTER_STATE: TotemFilterState = {
  multi: {},
  boolean: {},
  range: {},
}

export function createEmptyTotemFilterState(): TotemFilterState {
  return { multi: {}, boolean: {}, range: {} }
}

export type FacetOptions = {
  multi: Record<MultiSelectFacetId, string[]>
  range: Record<RangeFacetId, { min: number; max: number }>
}

const MULTI_FACET_IDS = TOTEM_FACETS.filter(
  (f): f is MultiSelectFacetDef => f.kind === 'multi',
).map((f) => f.id)

const RANGE_FACET_IDS = TOTEM_FACETS.filter((f): f is RangeFacetDef => f.kind === 'range').map(
  (f) => f.id,
)

function personalityValues(row: TotemTableRow): string[] {
  return [row.trait_personality1, row.trait_personality2, row.trait_personality3]
}

function multiValue(row: TotemTableRow, facet: MultiSelectFacetDef): string[] {
  if (facet.id === 'personality') return personalityValues(row)
  if (!facet.column) return []
  const value = row[facet.column]
  return value == null || value === '' ? [] : [String(value)]
}

export function buildFacetOptions(rows: TotemTableRow[]): FacetOptions {
  const multiSets = Object.fromEntries(
    MULTI_FACET_IDS.map((id) => [id, new Set<string>()]),
  ) as Record<MultiSelectFacetId, Set<string>>
  const rangeBounds = Object.fromEntries(
    RANGE_FACET_IDS.map((id) => [
      id,
      { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY },
    ]),
  ) as Record<RangeFacetId, { min: number; max: number }>

  const multiDefs = TOTEM_FACETS.filter((f): f is MultiSelectFacetDef => f.kind === 'multi')

  for (const row of rows) {
    for (const facet of multiDefs) {
      for (const value of multiValue(row, facet)) {
        multiSets[facet.id].add(value)
      }
    }
    for (const id of RANGE_FACET_IDS) {
      const value = row[id]
      if (typeof value !== 'number' || Number.isNaN(value)) continue
      const bounds = rangeBounds[id]
      if (value < bounds.min) bounds.min = value
      if (value > bounds.max) bounds.max = value
    }
  }

  const multi = Object.fromEntries(
    MULTI_FACET_IDS.map((id) => [id, [...multiSets[id]].sort((a, b) => a.localeCompare(b))]),
  ) as Record<MultiSelectFacetId, string[]>

  const range = Object.fromEntries(
    RANGE_FACET_IDS.map((id) => {
      const bounds = rangeBounds[id]
      if (!Number.isFinite(bounds.min) || !Number.isFinite(bounds.max)) {
        return [id, { min: 0, max: 0 }]
      }
      return [id, bounds]
    }),
  ) as Record<RangeFacetId, { min: number; max: number }>

  return { multi, range }
}

function rangeIsActive(value: RangeValue | undefined): boolean {
  if (!value) return false
  return value.min !== undefined || value.max !== undefined
}

export function facetIsActive(state: TotemFilterState, facet: FacetDef): boolean {
  if (facet.kind === 'multi') {
    return (state.multi[facet.id]?.length ?? 0) > 0
  }
  if (facet.kind === 'boolean') {
    return (state.boolean[facet.id]?.length ?? 0) > 0
  }
  return rangeIsActive(state.range[facet.id])
}

export function countActiveFilters(state: TotemFilterState): number {
  let count = 0
  for (const facet of TOTEM_FACETS) {
    if (facetIsActive(state, facet)) count += 1
  }
  return count
}

export function hasActiveFilters(state: TotemFilterState): boolean {
  return countActiveFilters(state) > 0
}

export type ActiveChip = {
  facetId: FacetId
  label: string
  valueLabel: string
  /** Key used to remove this chip. */
  removeKey: string
}

export function getActiveChips(state: TotemFilterState): ActiveChip[] {
  const chips: ActiveChip[] = []

  for (const facet of TOTEM_FACETS) {
    if (facet.kind === 'multi') {
      for (const value of state.multi[facet.id] ?? []) {
        chips.push({
          facetId: facet.id,
          label: facet.label,
          valueLabel: value,
          removeKey: `multi:${facet.id}:${value}`,
        })
      }
    } else if (facet.kind === 'boolean') {
      for (const value of state.boolean[facet.id] ?? []) {
        chips.push({
          facetId: facet.id,
          label: facet.label,
          valueLabel: value ? 'Yes' : 'No',
          removeKey: `boolean:${facet.id}:${value ? '1' : '0'}`,
        })
      }
    } else {
      const range = state.range[facet.id]
      if (!rangeIsActive(range) || !range) continue
      const parts: string[] = []
      if (range.min !== undefined) parts.push(`≥ ${range.min}`)
      if (range.max !== undefined) parts.push(`≤ ${range.max}`)
      chips.push({
        facetId: facet.id,
        label: facet.label,
        valueLabel: parts.join(' · '),
        removeKey: `range:${facet.id}`,
      })
    }
  }

  return chips
}

export function removeChip(state: TotemFilterState, removeKey: string): TotemFilterState {
  const [kind, facetId, rawValue] = removeKey.split(':') as [string, string, string?]

  if (kind === 'multi' && facetId && rawValue !== undefined) {
    const id = facetId as MultiSelectFacetId
    const next = (state.multi[id] ?? []).filter((v) => v !== rawValue)
    return {
      ...state,
      multi: { ...state.multi, [id]: next },
    }
  }

  if (kind === 'boolean' && facetId && rawValue !== undefined) {
    const id = facetId as BooleanFacetId
    const boolValue = rawValue === '1'
    const next = (state.boolean[id] ?? []).filter((v) => v !== boolValue)
    return {
      ...state,
      boolean: { ...state.boolean, [id]: next },
    }
  }

  if (kind === 'range' && facetId) {
    const id = facetId as RangeFacetId
    const { [id]: _, ...rest } = state.range
    return { ...state, range: rest }
  }

  return state
}

function matchesMulti(row: TotemTableRow, facet: MultiSelectFacetDef, selected: string[]): boolean {
  if (selected.length === 0) return true
  const values = multiValue(row, facet)
  return selected.some((s) => values.includes(s))
}

function matchesBoolean(row: TotemTableRow, column: BooleanFacetId, selected: boolean[]): boolean {
  if (selected.length === 0) return true
  const isYes = row[column] === 1
  return selected.includes(isYes)
}

function matchesRange(
  row: TotemTableRow,
  column: RangeFacetId,
  range: RangeValue | undefined,
): boolean {
  if (!rangeIsActive(range) || !range) return true
  const value = row[column]
  if (typeof value !== 'number') return false
  if (range.min !== undefined && value < range.min) return false
  if (range.max !== undefined && value > range.max) return false
  return true
}

export function applyTotemFilters(rows: TotemTableRow[], state: TotemFilterState): TotemTableRow[] {
  if (!hasActiveFilters(state)) return rows

  const multiDefs = TOTEM_FACETS.filter((f): f is MultiSelectFacetDef => f.kind === 'multi')
  const booleanDefs = TOTEM_FACETS.filter((f): f is BooleanFacetDef => f.kind === 'boolean')
  const rangeDefs = TOTEM_FACETS.filter((f): f is RangeFacetDef => f.kind === 'range')

  return rows.filter((row) => {
    for (const facet of multiDefs) {
      if (!matchesMulti(row, facet, state.multi[facet.id] ?? [])) return false
    }
    for (const facet of booleanDefs) {
      if (!matchesBoolean(row, facet.column, state.boolean[facet.id] ?? [])) return false
    }
    for (const facet of rangeDefs) {
      if (!matchesRange(row, facet.column, state.range[facet.id])) return false
    }
    return true
  })
}

export function toggleMultiValue(
  state: TotemFilterState,
  facetId: MultiSelectFacetId,
  value: string,
): TotemFilterState {
  const current = state.multi[facetId] ?? []
  const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
  return { ...state, multi: { ...state.multi, [facetId]: next } }
}

export function toggleBooleanValue(
  state: TotemFilterState,
  facetId: BooleanFacetId,
  value: boolean,
): TotemFilterState {
  const current = state.boolean[facetId] ?? []
  const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
  return { ...state, boolean: { ...state.boolean, [facetId]: next } }
}

export function setRangeValue(
  state: TotemFilterState,
  facetId: RangeFacetId,
  range: RangeValue,
): TotemFilterState {
  const cleaned: RangeValue = {}
  if (range.min !== undefined && !Number.isNaN(range.min)) cleaned.min = range.min
  if (range.max !== undefined && !Number.isNaN(range.max)) cleaned.max = range.max
  if (!rangeIsActive(cleaned)) {
    const { [facetId]: _, ...rest } = state.range
    return { ...state, range: rest }
  }
  return { ...state, range: { ...state.range, [facetId]: cleaned } }
}
