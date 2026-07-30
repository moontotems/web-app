import { useCallback, useEffect, useState } from 'react'

function storyKey(tokenId: number) {
  return `moontotems:story:${tokenId}`
}

export function useStory(tokenId: number) {
  const [story, setStory] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    setStory(localStorage.getItem(storyKey(tokenId)) ?? '')
  }, [tokenId])

  const saveStory = useCallback(
    (value: string) => {
      setStory(value)
      localStorage.setItem(storyKey(tokenId), value)
    },
    [tokenId],
  )

  return { story, saveStory }
}
