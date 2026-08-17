import { cn, Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '@moontotems/ui'
import { Link } from '@tanstack/react-router'
import {
  BarChart3,
  BookOpen,
  CircleUserRound,
  Compass,
  FileCode2,
  Gamepad2,
  Instagram,
  Lightbulb,
  ListTree,
  MapPin,
  Moon,
  Smile,
  Sparkles,
  Twitter,
  ZoomIn,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { ASSETS, HEADER_HEIGHT, SIDEBAR_WIDTH, SOCIAL_LINKS } from '~/lib/constants'
import { DEFAULT_GALLERY_SEARCH } from '~/lib/nft/gallery-search'

const ICON = 'size-[18px] md:size-4'

const MenuItem = ({
  children,
  icon,
  heading = false,
}: {
  children: ReactNode
  icon?: ReactNode
  heading?: boolean
}) => {
  return (
    <div
      className={cn(
        'nft-menu-item flex w-full items-center justify-between py-2.5 pr-4 text-left text-[15px]',
        'md:items-start md:pt-3 md:pb-1.5 md:text-sm',
        '[&_svg]:stroke-[1.5]',
        heading ? 'nft-menu-title pl-4 md:pl-[15px]' : 'pl-5 md:pl-[35px]',
      )}
    >
      <span className="md:-mt-[3px]">{children}</span>
      {icon}
    </div>
  )
}

const BrandIcon = ({ src }: { src: string }) => {
  return <img alt="" className={ICON} src={src} />
}

// 250px left navigation drawer.
export const SidebarLeft = () => {
  const { sidebarLeftOpen, setSidebarLeftOpen } = useMoonTotems()
  const close = () => setSidebarLeftOpen(false)

  return (
    <Drawer open={sidebarLeftOpen} onOpenChange={setSidebarLeftOpen} direction="left">
      <DrawerContent
        id="sidebarLeft"
        className="nft-theme dark !fixed !left-0 z-2000 !block !w-[250px] overflow-y-auto rounded-none border-0 !border-[#393939] !bg-[#262626] p-0 shadow-none"
        style={{ top: HEADER_HEIGHT, bottom: 0, height: 'auto', width: SIDEBAR_WIDTH }}
      >
        <DrawerTitle className="sr-only">Navigation</DrawerTitle>
        <DrawerDescription className="sr-only">Moon Totems site menu</DrawerDescription>

        <nav className="h-max min-h-full bg-[#262626] pb-[env(safe-area-inset-bottom)] text-white">
          <Link to="/project-overview" onClick={close}>
            <MenuItem icon={<BookOpen className={ICON} />}>Project Overview</MenuItem>
          </Link>
          <Link to="/" onClick={close}>
            <MenuItem icon={<Compass className={ICON} />}>Explore all</MenuItem>
          </Link>
          <Link to="/orbit" onClick={close}>
            <MenuItem icon={<Moon className={ICON} />}>Orbit</MenuItem>
          </Link>
          <Link to="/infinit-zoom-scroll" onClick={close}>
            <MenuItem icon={<ZoomIn className={ICON} />}>Infinite Zoom</MenuItem>
          </Link>
          <Link to="/games/space-invader" onClick={close}>
            <MenuItem icon={<Gamepad2 className={ICON} />}>Space Invader</MenuItem>
          </Link>
          <Link to="/all" search={DEFAULT_GALLERY_SEARCH} onClick={close}>
            <MenuItem icon={<Smile className={ICON} />}>All Moon Totems</MenuItem>
          </Link>

          <MenuItem heading>About</MenuItem>
          <Link to="/project-overview" onClick={close}>
            <MenuItem icon={<Smile className={ICON} />}>What are Moon Totems?</MenuItem>
          </Link>
          <Link to="/attributes" onClick={close}>
            <MenuItem icon={<CircleUserRound className={ICON} />}>Unique Characters</MenuItem>
          </Link>
          <Link to="/features" onClick={close}>
            <MenuItem icon={<Lightbulb className={ICON} />}>Exclusive Features</MenuItem>
          </Link>
          <Link to="/open-ai" onClick={close}>
            <MenuItem icon={<Sparkles className={ICON} />}>OpenAI</MenuItem>
          </Link>
          <Link to="/lunar-origins" onClick={close}>
            <MenuItem icon={<MapPin className={ICON} />}>Lunar Origins</MenuItem>
          </Link>
          <Link to="/lunar-months" onClick={close}>
            <MenuItem icon={<BarChart3 className={ICON} />}>Lunar Months</MenuItem>
          </Link>
          <Link to="/lunar-phases" onClick={close}>
            <MenuItem icon={<Moon className={ICON} />}>Lunar Phases</MenuItem>
          </Link>

          <MenuItem heading>Latest News</MenuItem>
          <a href={SOCIAL_LINKS.instagram} rel="noreferrer" target="_blank">
            <MenuItem icon={<Instagram className={ICON} />}>Instagram</MenuItem>
          </a>
          <a href={SOCIAL_LINKS.twitter} rel="noreferrer" target="_blank">
            <MenuItem icon={<Twitter className={ICON} />}>Twitter</MenuItem>
          </a>
          <a href={SOCIAL_LINKS.discord} rel="noreferrer" target="_blank">
            <MenuItem icon={<BrandIcon src={ASSETS.icons.discord} />}>Discord</MenuItem>
          </a>

          <MenuItem heading>NFT Tracking</MenuItem>
          <Link to="/contract-interface" onClick={close}>
            <MenuItem icon={<FileCode2 className={ICON} />}>Contract Interface</MenuItem>
          </Link>
          <Link to="/contract-events" onClick={close}>
            <MenuItem icon={<ListTree className={ICON} />}>Contract Events</MenuItem>
          </Link>
          <a href={SOCIAL_LINKS.opensea} rel="noreferrer" target="_blank">
            <MenuItem icon={<BrandIcon src={ASSETS.icons.opensea} />}>Explore on OpenSea</MenuItem>
          </a>
          <a href={SOCIAL_LINKS.looksrare} rel="noreferrer" target="_blank">
            <MenuItem icon={<BrandIcon src={ASSETS.icons.opensea} />}>Explore on LooksRare</MenuItem>
          </a>
          <a href={SOCIAL_LINKS.etherscan} rel="noreferrer" target="_blank">
            <MenuItem icon={<BrandIcon src={ASSETS.icons.etherscan} />}>
              Explore on Etherscan
            </MenuItem>
          </a>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
