import { cn } from '@moontotems/ui'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

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

/** Header Project Overview / OpenAI links, pinned to the bottom on mobile. */
function IndexMobileFooter() {
  const { setSidebarLeftOpen } = useMoonTotems()
  const close = () => setSidebarLeftOpen(false)

  return (
    <nav
      aria-label="Project links"
      className="fixed right-0 bottom-0 left-0 z-1000 flex w-full border-t border-[#393939] bg-black md:hidden"
      style={{ height: FOOTER_HEIGHT }}
    >
      <Link className={footerLinkClass} onClick={close} to="/project-overview">
        Project Overview
      </Link>
      <Link
        className={cn(footerLinkClass, 'border-l border-[#393939]/40')}
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
