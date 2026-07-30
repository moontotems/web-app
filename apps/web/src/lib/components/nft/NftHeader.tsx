import { Link } from '@tanstack/react-router'
import { AlignJustify, Grip } from 'lucide-react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { HEADER_HEIGHT } from '~/lib/nft/constants'

import { WalletButton } from './WalletButton'

/** Fixed 40px black top bar (legacy Carbon UIShell header). */
export function NftHeader() {
  const { headerTitle, sidebarLeftOpen, setSidebarLeftOpen } = useMoonTotems()

  return (
    <>
      {/* Centered dynamic title overlay */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-9000 flex w-full items-center justify-center text-xl font-normal"
        style={{ height: HEADER_HEIGHT }}
      >
        {headerTitle}
      </div>

      <header
        aria-label="Moon Totems"
        className="fixed top-0 left-0 z-8000 flex w-full items-center border-b border-[#393939] bg-black text-white"
        style={{ height: HEADER_HEIGHT }}
      >
        <button
          type="button"
          aria-label="Toggle menu"
          className="flex h-full w-[50px] cursor-pointer items-center justify-center hover:bg-[#262626]"
          onClick={() => setSidebarLeftOpen(!sidebarLeftOpen)}
        >
          <AlignJustify className="size-5" />
        </button>

        <Link
          to="/"
          className="px-4 pr-8 text-sm font-normal tracking-[0.16px] whitespace-nowrap text-white hover:text-white"
          onClick={() => setSidebarLeftOpen(false)}
        >
          MOON TOTEMS
        </Link>

        <div className="flex-1" />

        <WalletButton />

        <Link
          to="/all"
          aria-label="Show all Totems"
          className="flex h-full w-[50px] items-center justify-center border-b border-[#6F6F6F] bg-[#262626] text-white hover:bg-[#393939]"
          onClick={() => setSidebarLeftOpen(false)}
        >
          <Grip className="size-5" />
        </Link>
      </header>
    </>
  )
}
