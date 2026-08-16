import { DataTable } from '@moontotems/ui'
import { Link, useMatch, useNavigate } from '@tanstack/react-router'
import type { Column, ColumnDef } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, ExternalLink } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import {
  type FacetOptions,
  type TotemFilterState,
  applyTotemFilters,
  buildFacetOptions,
  createEmptyTotemFilterState,
  findFacetById,
} from '~/lib/nft/totem-filters'
import { type TotemTableRow, useTotemTableRows } from '~/lib/nft/use-token-data'
import { ColumnFacetFilter, TotemFilterBar } from '~/lib/sharedComponents/nft/TotemFilterBar'

type TotemRow = TotemTableRow

const yesNo = (value: unknown) => (value === 1 ? 'Yes' : 'No')

type FilterCtx = {
  options: FacetOptions
  state: TotemFilterState
  onChange: (state: TotemFilterState) => void
}

function SortIcon({ column }: { column: Column<TotemRow, unknown> }) {
  const sortState = column.getIsSorted()
  const Icon = sortState === 'asc' ? ArrowUp : sortState === 'desc' ? ArrowDown : ArrowUpDown
  return <Icon className={`size-3.5 shrink-0 ${sortState ? 'opacity-100' : 'opacity-40'}`} />
}

function FilterableHeader({
  label,
  facetId,
  column,
  filter,
  enableSorting = true,
}: {
  label: string
  facetId?: string
  column: Column<TotemRow, unknown>
  filter: FilterCtx
  enableSorting?: boolean
}) {
  const facet = facetId ? findFacetById(facetId) : undefined

  return (
    <div className="-mx-2 flex h-10 w-[calc(100%+1rem)] items-center gap-1 rounded-md px-2 hover:bg-accent hover:text-accent-foreground">
      {enableSorting ? (
        <button
          type="button"
          onClick={column.getToggleSortingHandler()}
          className="flex min-w-0 flex-1 items-center text-left text-sm font-medium"
          aria-label={`Sort by ${label}`}
        >
          <span className="truncate">{label}</span>
        </button>
      ) : (
        <span className="min-w-0 flex-1 truncate text-sm font-medium">{label}</span>
      )}
      <div className="ml-auto flex shrink-0 items-center gap-0.5">
        {enableSorting ? (
          <button
            type="button"
            onClick={column.getToggleSortingHandler()}
            className="inline-flex size-5 items-center justify-center"
            aria-label={`Sort by ${label}`}
          >
            <SortIcon column={column} />
          </button>
        ) : null}
        {facet ? (
          <ColumnFacetFilter
            facet={facet}
            options={filter.options}
            state={filter.state}
            onChange={filter.onChange}
          />
        ) : null}
      </div>
    </div>
  )
}

function textColumn(
  header: string,
  key: keyof TotemRow & string,
  filter: FilterCtx,
  facetId: string = key,
): ColumnDef<TotemRow> {
  return {
    id: key,
    accessorKey: key,
    header: ({ column }) => (
      <FilterableHeader label={header} facetId={facetId} column={column} filter={filter} />
    ),
  }
}

function buildColumns(filter: FilterCtx): ColumnDef<TotemRow>[] {
  return [
    {
      id: 'image',
      header: 'Image',
      enableSorting: false,
      cell: ({ row }) => {
        const id = Number(row.original.id)
        return (
          <Link to="/$id" params={{ id: String(id) }} target="_blank">
            <img
              src={getImageUrl({ tokenId: id, size: 100 })}
              alt={`Moon Totem #${id}`}
              className="w-16 min-w-16"
              loading="lazy"
            />
          </Link>
        )
      },
    },
    {
      id: 'id',
      accessorKey: 'id',
      header: ({ column }) => <FilterableHeader label="Token ID" column={column} filter={filter} />,
    },
    {
      id: 'show',
      header: 'Show',
      enableSorting: false,
      cell: ({ row }) => (
        <Link
          to="/$id"
          params={{ id: String(row.original.id) }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="size-4" />
        </Link>
      ),
    },
    {
      id: 'name',
      accessorFn: (row) => `${row.trait_name1} ${row.trait_name2}`,
      header: ({ column }) => <FilterableHeader label="Name" column={column} filter={filter} />,
    },
    textColumn('Job Field', 'trait_jobField', filter),
    textColumn('Job Title', 'trait_jobTitle', filter),
    {
      id: 'personality',
      accessorFn: (row) =>
        `${row.trait_personality1}, ${row.trait_personality2} & ${row.trait_personality3}`,
      header: ({ column }) => (
        <FilterableHeader
          label="Personality"
          facetId="personality"
          column={column}
          filter={filter}
        />
      ),
    },
    textColumn('Origin', 'lunarOriginName', filter),
    textColumn('Lunar Month', 'moonMonth', filter),
    textColumn('Lunar Phase', 'moonPhase', filter),
    textColumn('Material', 'Material', filter),
    textColumn('Bumps', 'mat_patterBumpName', filter),
    textColumn('Perforation', 'mat_patterPerfName', filter),
    textColumn('Complexity Score', 'complexityScore', filter),
    textColumn('Color Count', 'colorsTotal', filter),
    textColumn('Pieces Count', 'complexityPieces', filter),
    {
      id: 'holesBlobby',
      accessorKey: 'holesBlobby',
      header: ({ column }) => (
        <FilterableHeader
          label="Blobby Holes"
          facetId="holesBlobby"
          column={column}
          filter={filter}
        />
      ),
      cell: ({ getValue }) => yesNo(getValue()),
    },
    {
      id: 'holesCut',
      accessorKey: 'holesCut',
      header: ({ column }) => (
        <FilterableHeader label="Cut Holes" facetId="holesCut" column={column} filter={filter} />
      ),
      cell: ({ getValue }) => yesNo(getValue()),
    },
    textColumn('Eye Shape', 'eyeShape', filter),
    {
      id: 'eyeAsymmetrical',
      accessorKey: 'eyeAsymmetrical',
      header: ({ column }) => (
        <FilterableHeader
          label="Asymmetrical Eye"
          facetId="eyeAsymmetrical"
          column={column}
          filter={filter}
        />
      ),
      cell: ({ getValue }) => yesNo(getValue()),
    },
    {
      id: 'eyeMulticolor',
      accessorKey: 'eyeMulticolor',
      header: ({ column }) => (
        <FilterableHeader
          label="Multicolored Eyes"
          facetId="eyeMulticolor"
          column={column}
          filter={filter}
        />
      ),
      cell: ({ getValue }) => yesNo(getValue()),
    },
    textColumn('Age', 'age', filter),
    textColumn('Birth Year', 'birthYearStr', filter),
    {
      id: 'trait_personality1',
      accessorKey: 'trait_personality1',
      header: ({ column }) => (
        <FilterableHeader label="Personality A" column={column} filter={filter} />
      ),
    },
    {
      id: 'trait_personality2',
      accessorKey: 'trait_personality2',
      header: ({ column }) => (
        <FilterableHeader label="Personality B" column={column} filter={filter} />
      ),
    },
    {
      id: 'trait_personality3',
      accessorKey: 'trait_personality3',
      header: ({ column }) => (
        <FilterableHeader label="Personality C" column={column} filter={filter} />
      ),
    },
    textColumn('Lunar Month Score', 'moonMonthScore', filter),
    textColumn('Lunar Phase Score', 'moonPhaseScore', filter),
    textColumn('Origin Score', 'lunarOriginScore', filter),
    textColumn('Origin Latin', 'lunarOriginNameLatin', filter),
    textColumn('Origin Population', 'lunarOriginQuantity', filter),
    textColumn('Color Quantity Rank', 'colorRank', filter),
    textColumn('Age Rank', 'ageRank', filter),
    textColumn('Complexity Rank', 'complexityRank', filter),
    textColumn('Age Score', 'AgeScore', filter),
    textColumn('Material Score', 'materialScore', filter),
    textColumn('Rarity Rank', 'rarityRank', filter),
    textColumn('Rarity Score', 'rarityScore', filter),
  ]
}

const SEARCHABLE_COLUMNS = [
  'id',
  'name',
  'trait_jobField',
  'trait_jobTitle',
  'personality',
  'lunarOriginName',
  'moonMonth',
  'moonPhase',
  'Material',
  'eyeShape',
  'birthYearStr',
]

/** Legacy /all list view: full metadata table with search, sort, pagination. */
export function TotemTable() {
  const { filteredCreatures } = useMoonTotems()
  const { data: allRows, isLoading } = useTotemTableRows()
  const allMatch = useMatch({ from: '/_nft/all/', shouldThrow: false })
  const navigate = useNavigate()
  const [localFacets, setLocalFacets] = useState<TotemFilterState>(createEmptyTotemFilterState)

  const filterState = allMatch?.search.facets ?? localFacets

  const setFilterState = useCallback(
    (next: TotemFilterState) => {
      if (allMatch) {
        void navigate({
          to: '/all',
          search: {
            view: allMatch.search.view,
            filters: allMatch.search.filters,
            facets: next,
          },
          replace: true,
        })
        return
      }
      setLocalFacets(next)
    },
    [allMatch, navigate],
  )

  // Preserve the provider's (shuffled, filtered) ordering.
  const joinedRows = useMemo(() => {
    if (!allRows) return []
    const byId = new Map(allRows.map((row) => [row.token_id, row]))
    return filteredCreatures
      .map((creature) => byId.get(creature.tokenId))
      .filter((row): row is TotemTableRow => Boolean(row))
  }, [allRows, filteredCreatures])

  const rows = useMemo(() => applyTotemFilters(joinedRows, filterState), [joinedRows, filterState])

  const facetOptions = useMemo(() => buildFacetOptions(joinedRows), [joinedRows])

  const columns = useMemo(
    () =>
      buildColumns({
        options: facetOptions,
        state: filterState,
        onChange: setFilterState,
      }),
    [facetOptions, filterState, setFilterState],
  )

  return (
    <div className="pb-8">
      <DataTable<TotemRow>
        data={rows}
        isLoading={isLoading}
        columns={columns}
        showSelectColumn={false}
        searchableColumns={SEARCHABLE_COLUMNS as unknown as Array<keyof TotemRow & string>}
        pageSize={50}
        toolbarStart={
          <TotemFilterBar
            rows={joinedRows}
            filteredCount={rows.length}
            state={filterState}
            onChange={setFilterState}
          />
        }
      />
    </div>
  )
}
