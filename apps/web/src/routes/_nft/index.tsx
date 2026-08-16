import { cn } from '@moontotems/ui'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { FOOTER_HEIGHT } from '~/lib/constants'
import { TotemMoveCanvas } from '~/lib/sharedComponents/totem-canvas/TotemMoveCanvas'

export const Route = createFileRoute('/_nft/')({
  component: ExplorePage,
})

const footerLinkClass = cn(
  'flex h-full flex-1 items-center justify-center px-4',
  'text-xs font-normal tracking-[0.16px] whitespace-nowrap',
  'text-white hover:bg-[#262626]',
)

/** Offset from the layout bottom to the visible viewport (Safari chrome). */
function useVisualViewportBottom() {
  const [bottom, setBottom] = useState(0)

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const update = () => {
      setBottom(Math.max(0, window.innerHeight - vv.height - vv.offsetTop))
    }

    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return bottom
}

/** Header Project Overview / OpenAI links, pinned to the bottom on mobile. */
function IndexMobileFooter() {
  const { setSidebarLeftOpen } = useMoonTotems()
  const close = () => setSidebarLeftOpen(false)
  const bottom = useVisualViewportBottom()

  return (
    <nav
      aria-label="Project links"
      className="fixed right-0 left-0 z-1000 flex w-full border-t border-[#393939] bg-black md:hidden"
      style={{ bottom, height: FOOTER_HEIGHT }}
    >
      <Link className={footerLinkClass} onClick={close} to="/project-overview">
        Project Overview
      </Link>
      <Link
        className={cn(footerLinkClass, 'border-l border-[#393939]')}
        onClick={close}
        to="/open-ai"
      >
        OpenAI
      </Link>
    </nav>
  )
}

/** Home: full-bleed infinite 2D totem canvas. */
function ExplorePage() {
  const { setHeaderTitle } = useMoonTotems()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  return (
    <>
      <TotemMoveCanvas />
      <IndexMobileFooter />
    </>
  )
}
