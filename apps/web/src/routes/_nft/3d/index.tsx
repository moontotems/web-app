import { createFileRoute } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { useScrollToTop } from '~/lib/nft/use-scroll-to-top'

import { TotemViewer } from './-components/TotemViewer'
import { TOTEM_MODEL_IDS, getTotemModelUrl } from './-data'

function Totem3dPage() {
  const { setHeaderTitle } = useMoonTotems()
  const [index, setIndex] = useState(0)
  const modelId = TOTEM_MODEL_IDS[index] ?? TOTEM_MODEL_IDS[0]
  useScrollToTop()

  const navigate = useCallback((direction: -1 | 1) => {
    setIndex((current) => {
      const next = current + direction
      if (next < 0 || next >= TOTEM_MODEL_IDS.length) return current
      return next
    })
  }, [])

  useEffect(() => {
    setHeaderTitle(`3D TOTEM ${modelId}`)
    return () => setHeaderTitle('')
  }, [modelId, setHeaderTitle])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') navigate(-1)
      if (event.key === 'ArrowRight') navigate(1)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  return (
    <div className="relative">
      <TotemViewer modelUrl={getTotemModelUrl(modelId)} />

      <button
        type="button"
        aria-label="Previous totem"
        disabled={index === 0}
        className="absolute top-1/2 left-3 z-10 -translate-y-1/2 cursor-pointer text-neutral-700 disabled:cursor-default disabled:opacity-20"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="size-10" />
      </button>
      <button
        type="button"
        aria-label="Next totem"
        disabled={index === TOTEM_MODEL_IDS.length - 1}
        className="absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer text-neutral-700 disabled:cursor-default disabled:opacity-20"
        onClick={() => navigate(1)}
      >
        <ChevronRight className="size-10" />
      </button>

      <div className="pointer-events-none absolute right-0 bottom-6 left-0 text-center text-sm tracking-wide text-neutral-600">
        {index + 1} / {TOTEM_MODEL_IDS.length}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_nft/3d/')({
  component: Totem3dPage,
})
