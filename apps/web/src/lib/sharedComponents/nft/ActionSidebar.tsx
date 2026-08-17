import { Link, useMatch } from '@tanstack/react-router'
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
  ZoomIn,
} from 'lucide-react'
import { type ReactNode, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { ASSETS, HEADER_HEIGHT, HEADER_ICON_WIDTH } from '~/lib/constants'
import { FILTERS } from '~/lib/nft/filters'
import {
  type GallerySearch,
  type GalleryView,
  toggleFavoriteFilter,
  toggleMintStatusFilters,
} from '~/lib/nft/gallery-search'
import { type TotemFilterState, createEmptyTotemFilterState } from '~/lib/nft/totem-filters'

type ViewState = 'hidden' | 'narrow' | 'wide'

const WIDTHS: Record<ViewState, number> = {
  hidden: 0,
  narrow: HEADER_ICON_WIDTH,
  wide: 250,
}

const MenuItem = ({
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
}) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: legacy parity menu rows
    <div
      className={`nft-menu-item flex w-full text-sm ${title ? 'nft-menu-title' : ''} ${
        wide
          ? 'items-start justify-between pt-3 pr-4 pb-1.5'
          : 'h-[40px] items-center justify-center p-0'
      } ${className}`}
      style={{
        paddingLeft: wide ? 35 : 0,
        // Inset shadow keeps collapsed icons centered (border-left would shift them).
        boxShadow: activeBorder ? `inset ${wide ? 5 : 2}px 0 0 #1062FE` : undefined,
      }}
      onClick={onClick}
    >
      {wide && <span className="-mt-[3px] text-left">{text}</span>}
      <span className={wide ? undefined : 'flex size-full items-center justify-center'}>
        {icon}
      </span>
    </div>
  )
}

function gallerySearch(
  view: GalleryView,
  filters: GallerySearch['filters'],
  facets: TotemFilterState = createEmptyTotemFilterState(),
): GallerySearch {
  return { view, filters, facets }
}

/**
 * Collapsible right panel (legacy ActionSidebar): view toggles, filters,
 * shuffle, and MoonTotem feature toggles. Cycles hidden -> narrow -> wide.
 */
export const ActionSidebar = () => {
  const {
    route,
    showGridView,
    shuffleIds,
    filters: { activeFilters, setActiveFilters, filterIsActive },
    filteredMoonTotems,
    usersTokenIds,
    toggleFeaturePanel,
  } = useMoonTotems()

  const allMatch = useMatch({ from: '/_nft/all/', shouldThrow: false })
  const facets = allMatch?.search.facets ?? createEmptyTotemFilterState()

  const [view, setView] = useState<ViewState>('hidden')

  const toggleView = () => {
    setView((current) => {
      if (current === 'hidden') return 'narrow'
      if (current === 'narrow') return 'wide'
      return 'hidden'
    })
  }

  // Show MoonTotem feature toggles when viewing a totem the user owns
  const routeTokenId = Number.parseInt(route.replace(/^\/(moontotem\/)?/, ''), 10)
  const showMoonTotemFeatures =
    Number.isInteger(routeTokenId) && usersTokenIds.includes(routeTokenId)

  const wide = view === 'wide'
  const width = WIDTHS[view]
  const firstTokenId = filteredMoonTotems[0]?.tokenId ?? 0
  const iconClass = 'size-4'
  const currentView: GalleryView = showGridView ? 'grid' : 'list'
  const galleryFilters = activeFilters.filter((f) => f !== FILTERS.myMoonTotems)

  return (
    <div
      id="actionSidebar"
      className={`fixed right-0 z-1000 text-white ${wide ? 'overflow-y-auto' : 'overflow-hidden'}`}
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
            <Link to="/all" search={gallerySearch('grid', galleryFilters, facets)}>
              <MenuItem
                wide={wide}
                text="Grid View"
                activeBorder={route.includes('/all') && showGridView}
                icon={<LayoutGrid className={iconClass} aria-label="Switch to area view" />}
              />
            </Link>
            <Link to="/all" search={gallerySearch('list', galleryFilters, facets)}>
              <MenuItem
                wide={wide}
                text="List View"
                activeBorder={route.includes('/all') && !showGridView}
                icon={<List className={iconClass} aria-label="Switch to list view" />}
              />
            </Link>
            <Link to="/infinit-zoom-scroll">
              <MenuItem
                wide={wide}
                text="Zoom Scroll"
                activeBorder={route.includes('/infinit-zoom-scroll')}
                icon={<ZoomIn className={iconClass} aria-label="Switch to infinite zoom" />}
              />
            </Link>

            <MenuItem
              wide={wide}
              title
              text="Filter"
              icon={<Filter className={iconClass} aria-label="Filter" />}
            />
            <Link to="/all" search={gallerySearch(currentView, [], facets)}>
              <MenuItem
                wide={wide}
                text="All Moon Totems"
                activeBorder={route.includes('/all') && galleryFilters.length === 0}
                icon={<img src={ASSETS.logos.svg} width={17} alt="All Totems" />}
              />
            </Link>
            <Link
              to="/all"
              search={gallerySearch(
                currentView,
                toggleMintStatusFilters(galleryFilters, FILTERS.notMinted),
                facets,
              )}
            >
              <MenuItem
                wide={wide}
                text="Available Totems"
                activeBorder={filterIsActive(FILTERS.notMinted)}
                icon={<Moon className={iconClass} aria-label="Available Totems" />}
              />
            </Link>
            <Link
              to="/all"
              search={gallerySearch(
                currentView,
                toggleMintStatusFilters(galleryFilters, FILTERS.minted),
                facets,
              )}
            >
              <MenuItem
                wide={wide}
                text="Minted Totems"
                activeBorder={filterIsActive(FILTERS.minted)}
                icon={<Lock className={iconClass} aria-label="Minted Totems" />}
              />
            </Link>
            <Link
              to="/all"
              search={gallerySearch(currentView, toggleFavoriteFilter(galleryFilters), facets)}
            >
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
            <Link
              to="/all"
              search={gallerySearch(currentView, galleryFilters, facets)}
              onClick={shuffleIds}
            >
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
                text="Show metadata"
                icon={<Info className={iconClass} aria-label="Meta Data" />}
                onClick={() => toggleFeaturePanel('metaData')}
              />
            )}
            {showMoonTotemFeatures && (
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
