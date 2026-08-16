import { Link } from '@tanstack/react-router'
import {
  ArrowLeftRight,
  Bot,
  CircleUserRound,
  Download,
  Eye,
  Filter,
  GalleryHorizontal,
  Heart,
  Info,
  LayoutGrid,
  List,
  Lock,
  Moon,
  Palette,
  PanelRight,
  Pencil,
  Shuffle,
} from 'lucide-react'
import { type ReactNode, useState } from 'react'

import { ASSETS } from '~/lib/constant'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { HEADER_HEIGHT } from '~/lib/nft/constants'
import { FILTERS } from '~/lib/nft/filters'

type ViewState = 'hidden' | 'narrow' | 'wide'

const WIDTHS: Record<ViewState, number> = {
  hidden: 0,
  narrow: 50,
  wide: 250,
}

function MenuItem({
  wide,
  text,
  icon,
  title = false,
  className = '',
  activeBorder = false,
  onClick,
}: {
  wide: boolean
  text: string
  icon?: ReactNode
  title?: boolean
  className?: string
  activeBorder?: boolean
  onClick?: () => void
}) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: legacy parity menu rows
    <div
      className={`nft-menu-item flex w-full items-start pt-3 pr-4 pb-1.5 text-sm ${
        title ? 'nft-menu-title' : ''
      } ${wide ? 'justify-between' : 'justify-center pr-0'} ${className}`}
      style={{
        paddingLeft: wide ? 35 : 0,
        borderLeft: activeBorder ? `${wide ? 5 : 2}px solid #1062FE` : undefined,
      }}
      onClick={onClick}
    >
      {wide && <span className="-mt-[3px] text-left">{text}</span>}
      <span>{icon}</span>
    </div>
  )
}

/**
 * Collapsible right panel (legacy ActionSidebar): view toggles, filters,
 * shuffle, and creature feature toggles. Cycles hidden -> narrow -> wide.
 */
export function ActionSidebar() {
  const {
    route,
    setShowGridView,
    shuffleIds,
    filters: { activeFilters, setActiveFilters, filterIsActive, toggleFilter },
    filteredCreatures,
    usersTokenIds,
    toggleFeaturePanel,
  } = useMoonTotems()

  const [view, setView] = useState<ViewState>('hidden')

  const toggleView = () => {
    setView((current) => {
      if (current === 'hidden') return 'narrow'
      if (current === 'narrow') return 'wide'
      return 'hidden'
    })
  }

  // Show creature feature toggles when viewing a totem the user owns
  const routeTokenId = Number.parseInt(route.replace(/^\/(moontotem\/)?/, ''), 10)
  const showCreatureFeatures =
    Number.isInteger(routeTokenId) && usersTokenIds.includes(routeTokenId)

  const wide = view === 'wide'
  const width = WIDTHS[view]
  const firstTokenId = filteredCreatures[0]?.tokenId ?? 0
  const iconClass = 'size-4'

  const toggleMintedFilter = () => {
    const withoutMintFilters = activeFilters.filter(
      (f) => f !== FILTERS.minted && f !== FILTERS.notMinted,
    )
    if (filterIsActive(FILTERS.minted)) {
      setActiveFilters([...withoutMintFilters, FILTERS.notMinted])
    } else {
      setActiveFilters([...withoutMintFilters, FILTERS.minted])
    }
  }

  const toggleNotMintedFilter = () => {
    const withoutMintFilters = activeFilters.filter(
      (f) => f !== FILTERS.minted && f !== FILTERS.notMinted,
    )
    if (filterIsActive(FILTERS.notMinted)) {
      setActiveFilters([...withoutMintFilters, FILTERS.minted])
    } else {
      setActiveFilters([...withoutMintFilters, FILTERS.notMinted])
    }
  }

  return (
    <div
      id="actionSidebar"
      className="fixed right-0 z-1000 overflow-y-auto text-white"
      style={{ top: HEADER_HEIGHT - 1, width }}
    >
      <button
        type="button"
        aria-label="Toggle menu"
        className="nft-menu-item fixed top-[119px] flex h-[39px] w-[44px] items-center justify-center border-b-0 bg-[#262626]"
        style={{ right: width }}
        onClick={toggleView}
      >
        <PanelRight className={iconClass} />
      </button>

      {view !== 'hidden' && (
        <div className="w-full border-t border-[#6F6F6F]">
          <div
            className="w-full bg-[#262626]"
            style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
          >
            <MenuItem
              wide={wide}
              title
              text="View"
              icon={<Eye className={iconClass} aria-label="View" />}
            />
            <Link to="/$id" params={{ id: String(firstTokenId) }}>
              <MenuItem
                wide={wide}
                text="Item View"
                icon={
                  <GalleryHorizontal className={iconClass} aria-label="Switch to carousel view" />
                }
              />
            </Link>
            <Link to="/all" onClick={() => setShowGridView(true)}>
              <MenuItem
                wide={wide}
                text="Grid View"
                icon={<LayoutGrid className={iconClass} aria-label="Switch to area view" />}
              />
            </Link>
            <Link to="/all" onClick={() => setShowGridView(false)}>
              <MenuItem
                wide={wide}
                text="List View"
                icon={<List className={iconClass} aria-label="Switch to list view" />}
              />
            </Link>

            <MenuItem
              wide={wide}
              title
              text="Filter"
              icon={<Filter className={iconClass} aria-label="Filter" />}
            />
            <Link to="/all" onClick={() => setActiveFilters([])}>
              <MenuItem
                wide={wide}
                text="All Moon Totems"
                activeBorder={activeFilters.length === 0}
                icon={<img src={ASSETS.logos.svg} width={17} alt="All Totems" />}
              />
            </Link>
            <Link to="/all" onClick={toggleNotMintedFilter}>
              <MenuItem
                wide={wide}
                text="Available Totems"
                activeBorder={filterIsActive(FILTERS.notMinted)}
                icon={<Moon className={iconClass} aria-label="Available Totems" />}
              />
            </Link>
            <Link to="/all" onClick={toggleMintedFilter}>
              <MenuItem
                wide={wide}
                text="Minted Totems"
                activeBorder={filterIsActive(FILTERS.minted)}
                icon={<Lock className={iconClass} aria-label="Minted Totems" />}
              />
            </Link>
            <Link to="/all" onClick={() => toggleFilter(FILTERS.favorites)}>
              <MenuItem
                wide={wide}
                text="Favorite Totems"
                activeBorder={filterIsActive(FILTERS.favorites)}
                icon={
                  <Heart
                    className={iconClass}
                    fill="#DA1E28"
                    stroke="#DA1E28"
                    aria-label="Favorite Totems"
                  />
                }
              />
            </Link>
            <Link to="/wallet" onClick={() => setActiveFilters([FILTERS.myMoonTotems])}>
              <MenuItem
                wide={wide}
                text="My Totems"
                className="border-b-[#24A148]"
                icon={<CircleUserRound className={iconClass} aria-label="My Totems" />}
              />
            </Link>
            <Link to="/all" onClick={shuffleIds}>
              <MenuItem
                wide={wide}
                text="Shuffle"
                className="nft-menu-shuffle border-b-[#24A148]"
                icon={<Shuffle className={iconClass} aria-label="Shuffle" />}
              />
            </Link>

            <MenuItem
              wide={wide}
              title
              text="Tools"
              icon={<Palette className={iconClass} aria-label="Tools" />}
            />
            {!route.includes('all') && (
              <MenuItem
                wide={wide}
                text="Show all Metadata"
                icon={<Info className={iconClass} aria-label="Meta Data" />}
                onClick={() => toggleFeaturePanel('metaData')}
              />
            )}
            {showCreatureFeatures && (
              <>
                <MenuItem
                  wide={wide}
                  text="Consult your Totem"
                  icon={<Bot className={iconClass} aria-label="Chat" />}
                  onClick={() => toggleFeaturePanel('chat')}
                />
                <MenuItem
                  wide={wide}
                  text="Write the Story"
                  icon={<Pencil className={iconClass} aria-label="Edit" />}
                  onClick={() => toggleFeaturePanel('story')}
                />
                <MenuItem
                  wide={wide}
                  text="Totem Transfer"
                  icon={<ArrowLeftRight className={iconClass} aria-label="Totem Transfer" />}
                  onClick={() => toggleFeaturePanel('actions')}
                />
                <MenuItem
                  wide={wide}
                  text="Download Files"
                  icon={<Download className={iconClass} aria-label="Download" />}
                  onClick={() => toggleFeaturePanel('download')}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
