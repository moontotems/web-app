import { useCallback, useEffect, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import type { MoonTotem } from '~/lib/nft/types'
import { usePrefetchTokenMetadata } from '~/lib/nft/use-token-data'

export function useMoonTotemNavigation(initialTokenId: number) {
  const { filteredMoonTotems, assembleMoonTotem } = useMoonTotems()

  const findIndex = useCallback(
    (tokenId: number) => filteredMoonTotems.findIndex((moonTotem) => moonTotem.tokenId === tokenId),
    [filteredMoonTotems],
  )

  const [index, setIndex] = useState(() => findIndex(initialTokenId))

  // If the current index no longer resolves (filters changed), re-resolve it
  useEffect(() => {
    if (!filteredMoonTotems[index]) {
      setIndex(findIndex(initialTokenId))
    }
  }, [filteredMoonTotems, index, findIndex, initialTokenId])

  const moonTotem: MoonTotem = filteredMoonTotems[index] ?? assembleMoonTotem(initialTokenId)

  // Warm the metadata cache for the neighbours so arrow-key navigation is instant.
  const prefetchMetadata = usePrefetchTokenMetadata()
  useEffect(() => {
    for (const neighbour of [filteredMoonTotems[index - 1], filteredMoonTotems[index + 1]]) {
      if (neighbour) prefetchMetadata(neighbour.tokenId)
    }
  }, [index, filteredMoonTotems, prefetchMetadata])

  const navigate = useCallback(
    (direction: 'left' | 'right') => {
      setIndex((current) => {
        if (direction === 'left' && current > 0) return current - 1
        if (direction === 'right' && current < filteredMoonTotems.length - 1) {
          return current + 1
        }
        return current
      })
    },
    [filteredMoonTotems.length],
  )

  // Keep the URL in sync without triggering a router navigation
  useEffect(() => {
    const tokenId = filteredMoonTotems[index]?.tokenId
    if (tokenId !== undefined) {
      window.history.replaceState(null, `Moon Totem ${tokenId}`, `/${tokenId}`)
    }
  }, [index, filteredMoonTotems])

  // Preload images +-10 in each direction
  useEffect(() => {
    const preloadSize = 10
    const start = Math.max(0, index - preloadSize)
    const end = Math.min(filteredMoonTotems.length - 1, index + preloadSize)
    for (let i = start; i <= end; i++) {
      const toPreload = filteredMoonTotems[i]
      if (!toPreload) continue
      const img = new Image()
      img.src = getImageUrl({ tokenId: toPreload.tokenId, size: 2048 })
    }
  }, [index, filteredMoonTotems])

  return { moonTotem, navigate }
}
