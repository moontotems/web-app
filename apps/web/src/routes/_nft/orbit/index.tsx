import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { FloatingTotems } from '~/lib/sharedComponents/FloatingTotems'

import { FLOATING_TOTEM_COUNT, moonVideoUrl } from './-data'

export const Route = createFileRoute('/_nft/orbit/')({
  component: OrbitPage,
})

/** Full-bleed page: Mux moon at center, totems drifting with depth scale. */
function OrbitPage() {
  const { setHeaderTitle } = useMoonTotems()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  return (
    <div className="relative h-[calc(100vh-40px)] w-full overflow-hidden bg-black">
      <FloatingTotems count={FLOATING_TOTEM_COUNT} />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 z-[110] w-[min(40vmin,420px)] overflow-hidden rounded-full bg-black shadow-[0_0_40px_rgba(255,255,255,0.12)]"
        style={{ aspectRatio: '1', transform: 'translate(-50%, -50%)' }}
      >
        <iframe
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="pointer-events-none h-full w-full border-0"
          src={moonVideoUrl}
          title="Moon"
        />
      </div>
    </div>
  )
}
