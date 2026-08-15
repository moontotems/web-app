import { Link } from '@tanstack/react-router'
import {
  BarChart3,
  CircleUserRound,
  Compass,
  Instagram,
  Lightbulb,
  MapPin,
  Moon,
  Smile,
  Twitter,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { HEADER_HEIGHT, SOCIAL_LINKS } from '~/lib/nft/constants'

function MenuItem({
  children,
  icon,
  title = false,
}: {
  children: ReactNode
  icon?: ReactNode
  title?: boolean
}) {
  return (
    <div
      className={`nft-menu-item flex w-full items-start justify-between pt-3 pr-4 pb-1.5 text-left text-sm ${
        title ? 'nft-menu-title pl-[15px]' : 'pl-[35px]'
      }`}
    >
      <span className="-mt-[3px]">{children}</span>
      <span>{icon}</span>
    </div>
  )
}

/** 250px slide-over navigation drawer (legacy SidebarLeft). */
export function SidebarLeft() {
  const { sidebarLeftOpen, setSidebarLeftOpen } = useMoonTotems()

  if (!sidebarLeftOpen) return null

  const close = () => setSidebarLeftOpen(false)
  const iconClass = 'size-4'

  return (
    <div
      id="sidebarLeft"
      className="fixed left-0 z-1000 w-[250px] overflow-y-auto border-t border-[#393939]"
      style={{ top: HEADER_HEIGHT - 1 }}
    >
      <div
        className="w-full bg-[#262626] text-white"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <Link to="/" onClick={close}>
          <MenuItem icon={<Compass className={iconClass} />}>Explore all</MenuItem>
        </Link>
        <Link to="/orbit" onClick={close}>
          <MenuItem icon={<Moon className={iconClass} />}>Orbit</MenuItem>
        </Link>
        <Link to="/all" onClick={close}>
          <MenuItem icon={<Smile className={iconClass} />}>All Moon Totems</MenuItem>
        </Link>

        <MenuItem title>About</MenuItem>
        <Link to="/project-overview" onClick={close}>
          <MenuItem icon={<Smile className={iconClass} />}>What are Moon Totems?</MenuItem>
        </Link>
        <Link to="/attributes" onClick={close}>
          <MenuItem icon={<CircleUserRound className={iconClass} />}>Unique Characters</MenuItem>
        </Link>
        <MenuItem icon={<Lightbulb className={iconClass} />}>Exclusive Features</MenuItem>
        <Link to="/lunar-origins" onClick={close}>
          <MenuItem icon={<MapPin className={iconClass} />}>Lunar Origins</MenuItem>
        </Link>
        <Link to="/lunar-calendar" onClick={close}>
          <MenuItem icon={<BarChart3 className={iconClass} />}>Lunar Months</MenuItem>
        </Link>
        <Link to="/lunar-calendar" onClick={close}>
          <MenuItem icon={<Moon className={iconClass} />}>Lunar Phases</MenuItem>
        </Link>

        <MenuItem title>Latest News</MenuItem>
        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">
          <MenuItem icon={<Instagram className={iconClass} />}>Instagram</MenuItem>
        </a>
        <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer">
          <MenuItem icon={<Twitter className={iconClass} />}>Twitter</MenuItem>
        </a>
        <a href={SOCIAL_LINKS.discord} target="_blank" rel="noreferrer">
          <MenuItem icon={<img src="/icons/Logo-Discord.svg" alt="" className="h-4 w-4" />}>
            Discord
          </MenuItem>
        </a>

        <MenuItem title>NFT Tracking</MenuItem>
        <a href={SOCIAL_LINKS.opensea} target="_blank" rel="noreferrer">
          <MenuItem icon={<img src="/icons/Logo-OpenSea.svg" alt="" className="h-4 w-4" />}>
            Explore on OpenSea
          </MenuItem>
        </a>
        <a href={SOCIAL_LINKS.looksrare} target="_blank" rel="noreferrer">
          <MenuItem icon={<img src="/icons/Logo-OpenSea.svg" alt="" className="h-4 w-4" />}>
            Explore on LooksRare
          </MenuItem>
        </a>
        <a href={SOCIAL_LINKS.etherscan} target="_blank" rel="noreferrer">
          <MenuItem icon={<img src="/icons/Logo-Etherscan.svg" alt="" className="h-4 w-4" />}>
            Explore on Etherscan
          </MenuItem>
        </a>
      </div>
    </div>
  )
}
