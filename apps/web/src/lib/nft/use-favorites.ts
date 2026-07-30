import { useCallback, useEffect, useState } from 'react'

import { FAVORITES_STORAGE_KEY } from './types'

function readFavorites(): number[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as number[]
    return Array.isArray(parsed) ? parsed.map(Number) : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favoritedIds, setFavoritedIds] = useState<number[]>([])

  useEffect(() => {
    setFavoritedIds(readFavorites())
  }, [])

  const isFavorite = useCallback(
    (tokenId: number) => favoritedIds.includes(Number(tokenId)),
    [favoritedIds],
  )

  const toggleFavorite = useCallback((tokenId: number) => {
    const id = Number(tokenId)
    setFavoritedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { favoritedIds, isFavorite, toggleFavorite }
}
