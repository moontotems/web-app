import { DataTable } from '@moontotems/ui'
import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'

import { TotemFilterBar } from '~/lib/components/nft/TotemFilterBar'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import {
  type TotemFilterState,
  applyTotemFilters,
  createEmptyTotemFilterState,
} from '~/lib/nft/totem-filters'
import { type TotemTableRow, useTotemTableRows } from '~/lib/nft/use-token-data'

type TotemRow = TotemTableRow

const yesNo = (value: unknown) => (value === 1 ? 'Yes' : 'No')

function textColumn(header: string, key: keyof TotemRow & string): ColumnDef<TotemRow> {
  return {
    id: key,
    header,
    accessorKey: key,
  }
}

const columns: ColumnDef<TotemRow>[] = [
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
  textColumn('Token ID', 'id'),
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
    header: 'Name',
    accessorFn: (row) => `${row.trait_name1} ${row.trait_name2}`,
  },
  textColumn('Job Field', 'trait_jobField'),
  textColumn('Job Title', 'trait_jobTitle'),
  {
    id: 'personality',
    header: 'Personality',
    accessorFn: (row) =>
      `${row.trait_personality1}, ${row.trait_personality2} & ${row.trait_personality3}`,
  },
  textColumn('Origin', 'lunarOriginName'),
  textColumn('Lunar Month', 'moonMonth'),
  textColumn('Lunar Phase', 'moonPhase'),
  textColumn('Material', 'Material'),
  textColumn('Bumps', 'mat_patterBumpName'),
  textColumn('Perforation', 'mat_patterPerfName'),
  textColumn('Complexity Score', 'complexityScore'),
  textColumn('Color Count', 'colorsTotal'),
  textColumn('Pieces Count', 'complexityPieces'),
  {
    id: 'holesBlobby',
    header: 'Blobby Holes',
    accessorKey: 'holesBlobby',
    cell: ({ getValue }) => yesNo(getValue()),
  },
  {
    id: 'holesCut',
    header: 'Cut Holes',
    accessorKey: 'holesCut',
    cell: ({ getValue }) => yesNo(getValue()),
  },
  textColumn('Eye Shape', 'eyeShape'),
  {
    id: 'eyeAsymmetrical',
    header: 'Asymmetrical Eye',
    accessorKey: 'eyeAsymmetrical',
    cell: ({ getValue }) => yesNo(getValue()),
  },
  {
    id: 'eyeMulticolor',
    header: 'Multicolored Eyes',
    accessorKey: 'eyeMulticolor',
    cell: ({ getValue }) => yesNo(getValue()),
  },
  textColumn('Age', 'age'),
  textColumn('Birth Year', 'birthYearStr'),
  textColumn('Personality A', 'trait_personality1'),
  textColumn('Personality B', 'trait_personality2'),
  textColumn('Personality C', 'trait_personality3'),
  textColumn('Lunar Month Score', 'moonMonthScore'),
  textColumn('Lunar Phase Score', 'moonPhaseScore'),
  textColumn('Origin Score', 'lunarOriginScore'),
  textColumn('Origin Latin', 'lunarOriginNameLatin'),
  textColumn('Origin Population', 'lunarOriginQuantity'),
  textColumn('Color Quantity Rank', 'colorRank'),
  textColumn('Age Rank', 'ageRank'),
  textColumn('Complexity Rank', 'complexityRank'),
  textColumn('Age Score', 'AgeScore'),
  textColumn('Material Score', 'materialScore'),
  textColumn('Rarity Rank', 'rarityRank'),
  textColumn('Rarity Score', 'rarityScore'),
]

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
  const [filterState, setFilterState] = useState<TotemFilterState>(createEmptyTotemFilterState)

  // Preserve the provider's (shuffled, filtered) ordering.
  const joinedRows = useMemo(() => {
    if (!allRows) return []
    const byId = new Map(allRows.map((row) => [row.token_id, row]))
    return filteredCreatures
      .map((creature) => byId.get(creature.tokenId))
      .filter((row): row is TotemTableRow => Boolean(row))
  }, [allRows, filteredCreatures])

  const rows = useMemo(() => applyTotemFilters(joinedRows, filterState), [joinedRows, filterState])

  return (
    <div className="px-4 pb-8">
      <TotemFilterBar
        rows={joinedRows}
        filteredCount={rows.length}
        state={filterState}
        onChange={setFilterState}
      />
      <DataTable<TotemRow>
        data={rows}
        isLoading={isLoading}
        columns={columns}
        showSelectColumn={false}
        searchableColumns={SEARCHABLE_COLUMNS as unknown as Array<keyof TotemRow & string>}
        pageSize={50}
      />
    </div>
  )
}
