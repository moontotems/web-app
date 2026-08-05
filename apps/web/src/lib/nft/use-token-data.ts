import type { Moontotem } from '@moontotems/db-drizzle'
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

import { getSupabaseBrowserClient } from '~/lib/utils/supabase/client'

import type { TokenMetaData } from './types'

/**
 * Totem metadata lives in the read-only `moontotems` Supabase table (one typed
 * column per Houdini field) and is fetched on demand instead of shipping the
 * 15 MB hashmap to the client. The data is static, so every query uses
 * `staleTime: Infinity` and is fetched at most once per session.
 */

export type TotemCardData = Pick<
  Moontotem,
  'token_id' | 'trait_name1' | 'trait_name2' | 'trait_jobField' | 'trait_jobTitle'
>

const CARD_COLUMNS = 'token_id,trait_name1,trait_name2,trait_jobField,trait_jobTitle'

/** Columns rendered by the /all list view (TotemTable). */
const TABLE_COLUMNS = [
  'token_id',
  'id',
  'trait_name1',
  'trait_name2',
  'trait_jobField',
  'trait_jobTitle',
  'trait_personality1',
  'trait_personality2',
  'trait_personality3',
  'lunarOriginName',
  'lunarOriginNameLatin',
  'lunarOriginQuantity',
  'lunarOriginScore',
  'moonMonth',
  'moonMonthScore',
  'moonPhase',
  'moonPhaseScore',
  'Material',
  'materialScore',
  'mat_patterBumpName',
  'mat_patterPerfName',
  'complexityScore',
  'complexityPieces',
  'complexityRank',
  'colorsTotal',
  'colorRank',
  'holesBlobby',
  'holesCut',
  'eyeShape',
  'eyeAsymmetrical',
  'eyeMulticolor',
  'age',
  'ageRank',
  'AgeScore',
  'birthYearStr',
] as const

export type TotemTableRow = Pick<Moontotem, (typeof TABLE_COLUMNS)[number]>

const CARD_CHUNK_SIZE = 100

const staticQueryOptions = {
  staleTime: Number.POSITIVE_INFINITY,
  gcTime: Number.POSITIVE_INFINITY,
} as const

async function fetchCards(tokenIds: number[]): Promise<TotemCardData[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('moontotems')
    .select(CARD_COLUMNS)
    .in('token_id', tokenIds)
  if (error) throw error
  return (data ?? []) as unknown as TotemCardData[]
}

/**
 * Card data (name + job line) for a list of token ids. Ids are fetched in
 * stable chunks so an infinite-scroll list that only appends ids never
 * refetches earlier pages.
 */
export function useTokenCards(tokenIds: number[]): Map<number, TotemCardData> {
  const chunks = useMemo(() => {
    const out: number[][] = []
    for (let i = 0; i < tokenIds.length; i += CARD_CHUNK_SIZE) {
      out.push(tokenIds.slice(i, i + CARD_CHUNK_SIZE))
    }
    return out
  }, [tokenIds])

  return useQueries({
    queries: chunks.map((chunk) => ({
      queryKey: ['totem-cards', chunk],
      queryFn: () => fetchCards(chunk),
      ...staticQueryOptions,
    })),
    combine: (results) => {
      const map = new Map<number, TotemCardData>()
      for (const result of results) {
        for (const card of result.data ?? []) {
          map.set(card.token_id, card)
        }
      }
      return map
    },
  })
}

async function fetchTokenMetadata(tokenId: number): Promise<TokenMetaData> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('moontotems')
    .select('*')
    .eq('token_id', tokenId)
    .single()
  if (error) throw error
  return data as TokenMetaData
}

function tokenMetadataQuery(tokenId: number) {
  return {
    queryKey: ['totem-metadata', tokenId],
    queryFn: () => fetchTokenMetadata(tokenId),
    ...staticQueryOptions,
  }
}

/** Full metadata record for a single totem (detail page). */
export function useTokenMetadata(tokenId: number): TokenMetaData | undefined {
  const { data } = useQuery(tokenMetadataQuery(tokenId))
  return data
}

/** Warms the metadata cache for neighbouring totems (arrow-key navigation). */
export function usePrefetchTokenMetadata() {
  const queryClient = useQueryClient()
  return useCallback(
    (tokenId: number) => {
      void queryClient.prefetchQuery(tokenMetadataQuery(tokenId))
    },
    [queryClient],
  )
}

async function fetchTableRows(): Promise<TotemTableRow[]> {
  const supabase = getSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('moontotems')
    .select(TABLE_COLUMNS.join(','))
    .order('token_id')
  if (error) throw error
  return (data ?? []) as unknown as TotemTableRow[]
}

/** All rows for the /all list view (one gzipped request, cached for the session). */
export function useTotemTableRows() {
  return useQuery({
    queryKey: ['totem-table-rows'],
    queryFn: fetchTableRows,
    ...staticQueryOptions,
  })
}
