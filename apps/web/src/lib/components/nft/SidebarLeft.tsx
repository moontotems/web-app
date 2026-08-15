import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@moontotems/ui'
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

/** 250px left navigation drawer (animated via @moontotems/ui Drawer / vaul). */
export function SidebarLeft() {
  const { sidebarLeftOpen, setSidebarLeftOpen } = useMoonTotems()

  const close = () => setSidebarLeftOpen(false)
  const iconClass = 'size-4'

  return (
    <Drawer open={sidebarLeftOpen} onOpenChange={setSidebarLeftOpen} direction="left">
      <DrawerContent
        id="sidebarLeft"
        className="nft-theme dark !fixed !top-[39px] !right-auto !bottom-0 !left-0 z-1000 !h-[calc(100vh-39px)] !w-[250px] !max-w-[250px] overflow-y-auto rounded-none border-0 !border-t !border-[#393939] bg-transparent p-0 shadow-none data-[vaul-drawer-direction=left]:!w-[250px] data-[vaul-drawer-direction=left]:!max-w-[250px] data-[vaul-drawer-direction=left]:!border-r-0 data-[vaul-drawer-direction=left]:sm:!max-w-[250px]"
      >
        <DrawerTitle className="sr-only">Navigation</DrawerTitle>
        <DrawerDescription className="sr-only">Moon Totems site menu</DrawerDescription>

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
      </DrawerContent>
    </Drawer>
  )
}
