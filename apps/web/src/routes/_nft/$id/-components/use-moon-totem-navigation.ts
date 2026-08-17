import { useCallback, useEffect, useMemo, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import type { MoonTotem } from '~/lib/nft/types'
import { usePrefetchTokenMetadata } from '~/lib/nft/use-token-data'

export function useMoonTotemNavigation(initialTokenId: number) {
  const { filteredMoonTotems, assembleMoonTotem } = useMoonTotems()

  // Token id is the source of truth so a shuffle/filter re-order cannot
  // swap the totem under a stale list index (and rewrite the URL).
  const [tokenId, setTokenId] = useState(initialTokenId)

  useEffect(() => {
    setTokenId(initialTokenId)
  }, [initialTokenId])

  const index = useMemo(
    () => filteredMoonTotems.findIndex((moonTotem) => moonTotem.tokenId === tokenId),
    [filteredMoonTotems, tokenId],
  )

  const moonTotem: MoonTotem =
    (index >= 0 ? filteredMoonTotems[index] : undefined) ?? assembleMoonTotem(tokenId)

  // Warm the metadata cache for the neighbours so arrow-key navigation is instant.
  const prefetchMetadata = usePrefetchTokenMetadata()
  useEffect(() => {
    if (index < 0) return
    for (const neighbour of [filteredMoonTotems[index - 1], filteredMoonTotems[index + 1]]) {
      if (neighbour) prefetchMetadata(neighbour.tokenId)
    }
  }, [index, filteredMoonTotems, prefetchMetadata])

  const navigate = useCallback(
    (direction: 'left' | 'right') => {
      setTokenId((current) => {
        const currentIndex = filteredMoonTotems.findIndex(
          (moonTotem) => moonTotem.tokenId === current,
        )
        if (currentIndex < 0) return current
        const nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1
        return filteredMoonTotems[nextIndex]?.tokenId ?? current
      })
    },
    [filteredMoonTotems],
  )

  // Keep the URL in sync without triggering a router navigation
  useEffect(() => {
    window.history.replaceState(null, `Moon Totem ${tokenId}`, `/${tokenId}`)
  }, [tokenId])

  // Preload images +-10 in each direction
  useEffect(() => {
    if (index < 0) return
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
