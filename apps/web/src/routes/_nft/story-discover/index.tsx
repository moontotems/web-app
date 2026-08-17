import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

import { HEADER_HEIGHT } from '~/lib/constants'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'
import { ActionSidebar } from '~/lib/sharedComponents/nft/ActionSidebar'

import { StorySlide } from './-components/StorySlide'

const PAGE_SIZE = 12

// Full-screen snap slides: typewriter story on the left, totem image reveal on the right.
const StoryDiscoverPage = () => {
  const { shuffledIds, setHeaderTitle } = useMoonTotems()
  const [count, setCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  useScrollToTop()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setCount((n) => Math.min(n + PAGE_SIZE, shuffledIds.length))
      },
      { rootMargin: '800px' },
    )
    io.observe(sentinel)
    return () => io.disconnect()
  }, [shuffledIds.length])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
      event.preventDefault()
      const slideHeight = scroller.clientHeight
      const index = Math.round(scroller.scrollTop / slideHeight)
      const next = event.key === 'ArrowDown' ? index + 1 : index - 1
      scroller.scrollTo({ top: next * slideHeight, behavior: 'smooth' })
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const ids = shuffledIds.slice(0, count)

  return (
    <>
      <div
        ref={scrollerRef}
        className="snap-y snap-mandatory overflow-y-auto bg-black"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        {ids.map((tokenId, index) => (
          <StorySlide eager={index < 2} key={tokenId} tokenId={tokenId} />
        ))}
        {count < shuffledIds.length && <div className="h-px w-full" ref={sentinelRef} />}
      </div>
      <ActionSidebar />
    </>
  )
}

export const Route = createFileRoute('/_nft/story-discover/')({
  component: StoryDiscoverPage,
})
