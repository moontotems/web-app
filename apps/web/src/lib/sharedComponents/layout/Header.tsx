import { cn } from '@moontotems/ui'
import { Link } from '@tanstack/react-router'
import { AlignJustify, Grip } from 'lucide-react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { HEADER_HEIGHT, HEADER_ICON_WIDTH } from '~/lib/constants'
import { DEFAULT_GALLERY_SEARCH } from '~/lib/nft/gallery-search'

import { WalletButton } from './WalletButton'

/** Fixed 40px black top bar (legacy Carbon UIShell header). */
export function Header() {
  const { headerTitle, sidebarLeftOpen, setSidebarLeftOpen } = useMoonTotems()

  return (
    <>
      {/* Centered dynamic title — desktop only; it collides with nav on phones. */}
      <div
        className={cn(
          'pointer-events-none fixed top-0 left-0 z-9000 hidden',
          'w-full items-center justify-center text-xl font-normal md:flex',
        )}
        style={{ height: HEADER_HEIGHT }}
      >
        {headerTitle}
      </div>

      <header
        aria-label="Moon Totems"
        className={cn(
          'fixed top-0 left-0 z-8000',
          'flex w-full items-center overflow-hidden',
          'border-b border-[#393939] bg-black text-white',
        )}
        style={{ height: HEADER_HEIGHT }}
      >
        <button
          type="button"
          aria-label="Toggle menu"
          className={cn(
            'flex aspect-square h-full w-10 shrink-0 cursor-pointer items-center justify-center',
            'hover:bg-[#262626]',
            'border-r border-[#393939]',
            'md:aspect-auto md:w-[50px]',
          )}
          onClick={() => setSidebarLeftOpen(!sidebarLeftOpen)}
        >
          <AlignJustify className="size-5" />
        </button>

        <Link
          to="/"
          className={cn(
            'flex h-full min-w-0 items-center px-2.5 md:px-4 md:pr-8',
            'text-xs font-normal tracking-[0.16px] whitespace-nowrap md:text-sm',
            'border-r border-[#393939]',
            'text-white hover:bg-[#262626]',
          )}
          onClick={() => setSidebarLeftOpen(false)}
        >
          MOON TOTEMS
        </Link>

        <Link
          to="/project-overview"
          className={cn(
            'hidden h-full items-center px-4 md:flex',
            'border-r border-[#393939]',
            'text-sm font-normal tracking-[0.16px] whitespace-nowrap',
            'text-white hover:bg-[#262626]',
          )}
          onClick={() => setSidebarLeftOpen(false)}
        >
          Project Overview
        </Link>

        <Link
          to="/open-ai"
          className={cn(
            'hidden h-full items-center px-4 md:flex',
            'border-r border-[#393939]',
            'text-sm font-normal tracking-[0.16px] whitespace-nowrap',
            'text-white hover:bg-[#262626]',
          )}
          onClick={() => setSidebarLeftOpen(false)}
        >
          OpenAI
        </Link>

        <div className="min-w-2 flex-1" />

        <WalletButton />

        <Link
          to="/all"
          search={DEFAULT_GALLERY_SEARCH}
          aria-label="Show all Totems"
          className={cn(
            'flex h-full shrink-0 items-center justify-center',
            'border-b border-[#6F6F6F] bg-[#262626]',
            'text-white hover:bg-[#393939]',
          )}
          style={{ width: HEADER_ICON_WIDTH }}
          onClick={() => setSidebarLeftOpen(false)}
        >
          <Grip className="size-5" />
        </Link>
      </header>
    </>
  )
}
