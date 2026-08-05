import { MINT_PRICE_ETH } from '@moontotems/contracts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@moontotems/ui'
import {
  ArrowLeftRight,
  CircleUserRound,
  Heart,
  Info,
  Lock,
  Moon,
  Share2,
  UserRound,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { toast } from 'sonner'

import { ActionSidebar } from '~/lib/components/nft/ActionSidebar'
import { NftFooter } from '~/lib/components/nft/NftFooter'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '~/lib/nft/constants'
import { getImageUrl } from '~/lib/nft/image-url'
import type { Creature, TokenMetaData } from '~/lib/nft/types'
import { usePrefetchTokenMetadata, useTokenMetadata } from '~/lib/nft/use-token-data'

import { ActionsPanel } from './ActionsPanel'
import { ChatbotPanel } from './ChatbotPanel'
import { FeaturePanel } from './FeaturePanel'
import { FileDownloadsPanel } from './FileDownloadsPanel'
import { FreshMintMessage } from './FreshMintMessage'
import { MetaDataPanel } from './MetaDataPanel'
import { MintToPanel } from './MintToPanel'
import { WriteStoryPanel } from './WriteStoryPanel'
import { ZoomImage } from './ZoomImage'

const OPENSEA_ASSET_BASE = 'https://opensea.io/assets/0x8fe83f6f7f726a2c9e238b7e094c4bf530bc9720'

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function useCreatureNavigation(initialTokenId: number) {
  const { filteredCreatures, assembleCreature } = useMoonTotems()

  const findIndex = useCallback(
    (tokenId: number) => filteredCreatures.findIndex((creature) => creature.tokenId === tokenId),
    [filteredCreatures],
  )

  const [index, setIndex] = useState(() => findIndex(initialTokenId))

  // If the current index no longer resolves (filters changed), re-resolve it
  useEffect(() => {
    if (!filteredCreatures[index]) {
      setIndex(findIndex(initialTokenId))
    }
  }, [filteredCreatures, index, findIndex, initialTokenId])

  const creature: Creature = filteredCreatures[index] ?? assembleCreature(initialTokenId)

  // Warm the metadata cache for the neighbours so arrow-key navigation is instant.
  const prefetchMetadata = usePrefetchTokenMetadata()
  useEffect(() => {
    for (const neighbour of [filteredCreatures[index - 1], filteredCreatures[index + 1]]) {
      if (neighbour) prefetchMetadata(neighbour.tokenId)
    }
  }, [index, filteredCreatures, prefetchMetadata])

  const navigate = useCallback(
    (direction: 'left' | 'right') => {
      setIndex((current) => {
        if (direction === 'left' && current > 0) return current - 1
        if (direction === 'right' && current < filteredCreatures.length - 1) {
          return current + 1
        }
        return current
      })
    },
    [filteredCreatures.length],
  )

  // Keep the URL in sync without triggering a router navigation
  useEffect(() => {
    const tokenId = filteredCreatures[index]?.tokenId
    if (tokenId !== undefined) {
      window.history.replaceState(null, `Moon Totem ${tokenId}`, `/${tokenId}`)
    }
  }, [index, filteredCreatures])

  // Preload images +-10 in each direction
  useEffect(() => {
    const preloadSize = 10
    const start = Math.max(0, index - preloadSize)
    const end = Math.min(filteredCreatures.length - 1, index + preloadSize)
    for (let i = start; i <= end; i++) {
      const toPreload = filteredCreatures[i]
      if (!toPreload) continue
      const img = new Image()
      img.src = getImageUrl({ tokenId: toPreload.tokenId, size: 2048 })
    }
  }, [index, filteredCreatures])

  return { creature, navigate }
}

function FeaturePanels({
  creature,
  metaData,
}: {
  creature: Creature
  metaData: TokenMetaData | undefined
}) {
  const { featurePanels } = useMoonTotems()
  const { tokenId } = creature

  return (
    <>
      <FreshMintMessage tokenId={tokenId} />
      {featurePanels.metaData && metaData && <MetaDataPanel metaData={metaData} />}
      {featurePanels.download && <FileDownloadsPanel tokenId={tokenId} />}
      {featurePanels.chat && metaData && (
        <ChatbotPanel
          tokenId={tokenId}
          image={getImageUrl({ tokenId, size: 1024 })}
          metaData={metaData}
        />
      )}
      {featurePanels.story && <WriteStoryPanel tokenId={tokenId} />}
      {featurePanels.actions && <ActionsPanel tokenId={tokenId} />}
      {featurePanels.mintTo && <MintToPanel tokenId={tokenId} />}
    </>
  )
}

function MintDropdown({ tokenId }: { tokenId: number }) {
  const { address, mint, toggleFeaturePanel } = useMoonTotems()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="mb-3 h-[26px] min-w-[113px] cursor-pointer rounded-[15px] border border-white/40 bg-transparent px-[15px] text-xs leading-[25px] text-white hover:border-white"
        >
          Summon this Totem ({MINT_PRICE_ETH} Ξ)
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        align="center"
        className="nft-theme rounded-none border-[#393939] bg-[#262626] text-white"
      >
        <DropdownMenuItem
          className="cursor-pointer gap-2 rounded-none p-4 focus:bg-[#525252] focus:text-white"
          onClick={() => {
            if (address) mint(tokenId, address)
          }}
        >
          <UserRound className="size-4" />
          Mint Totem to {address ? shortenAddress(address) : 'your wallet'}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer gap-2 rounded-none p-4 focus:bg-[#525252] focus:text-white"
          onClick={() => toggleFeaturePanel('mintTo')}
        >
          <ArrowLeftRight className="size-4" />
          Mint Totem to different address
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function StatusIcon({
  creature,
  className,
}: {
  creature: Creature
  className?: string
}) {
  if (creature.ownedByUser) {
    return <CircleUserRound className={className} aria-label="Owned by you" />
  }
  if (creature.minted) {
    return <Lock className={className} aria-label="Taken" />
  }
  return <Moon className={className} aria-label="Available" />
}

function FavoriteButton({
  creature,
  className,
}: {
  creature: Creature
  className?: string
}) {
  const {
    favorites: { toggleFavorite },
  } = useMoonTotems()
  const { isFavorite, tokenId } = creature

  return (
    <button
      type="button"
      aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
      className="cursor-pointer"
      onClick={() => toggleFavorite(tokenId)}
    >
      <Heart
        className={className}
        fill={isFavorite ? '#DA1E28' : 'white'}
        stroke={isFavorite ? '#DA1E28' : 'white'}
      />
    </button>
  )
}

function CreatureDesktop({ initialTokenId }: { initialTokenId: number }) {
  const { address } = useMoonTotems()
  const { creature, navigate } = useCreatureNavigation(initialTokenId)

  const { tokenId, minted, ownedByUser } = creature
  const metaData = useTokenMetadata(tokenId)
  const isAvailable = !minted

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') navigate('left')
      if (event.key === 'ArrowRight') navigate('right')
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  return (
    <>
      {/* Feature panels overlay - fixed left 35% */}
      <div className="fixed left-0 z-1000 w-[35%]" style={{ top: HEADER_HEIGHT }}>
        <FeaturePanels creature={creature} metaData={metaData} />
      </div>

      <div
        className="fixed left-0 w-full overflow-y-hidden"
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
        }}
      >
        <ZoomImage
          src={getImageUrl({ tokenId, size: 2048 })}
          zoomSrc={getImageUrl({ tokenId, size: 2048, withSymbol: ownedByUser })}
          alt={`Moon Totem #${tokenId}`}
          height={`calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`}
        />

        <div className="absolute right-0 bottom-0 left-0 text-center">
          <div className="mb-[3px] flex items-center justify-center gap-10 text-3xl">
            <StatusIcon creature={creature} className="size-5" />
            <span>
              {metaData?.trait_name1} {metaData?.trait_name2}
            </span>
            <FavoriteButton creature={creature} className="size-5" />
          </div>
          <div className="text-[15px] font-semibold">
            {metaData?.trait_jobField} {metaData?.trait_jobTitle}
          </div>
          <div className="mt-5 text-[15px]">
            {minted && (
              <a href={`${OPENSEA_ASSET_BASE}/${tokenId}`} target="_blank" rel="noreferrer">
                <button
                  type="button"
                  className="mb-3 h-[26px] min-w-[113px] cursor-pointer rounded-[15px] bg-[#1062FE] px-[15px] text-xs leading-[25px] text-white hover:brightness-110"
                >
                  View on Opensea
                </button>
              </a>
            )}
            {address && isAvailable && <MintDropdown tokenId={tokenId} />}
          </div>
        </div>
      </div>
    </>
  )
}

function CreatureMobile({ initialTokenId }: { initialTokenId: number }) {
  const { address, mint, featurePanels, toggleFeaturePanel } = useMoonTotems()
  const { creature, navigate } = useCreatureNavigation(initialTokenId)

  const { tokenId, minted, ownedByUser } = creature
  const metaData = useTokenMetadata(tokenId)
  const isAvailable = !minted

  const oneFeatureIsVisible = useMemo(
    () => Object.values(featurePanels).some(Boolean),
    [featurePanels],
  )

  const swipeHandlers = useSwipeable({
    trackMouse: true,
    trackTouch: true,
    onSwipedLeft: () => navigate('right'),
    onSwipedRight: () => navigate('left'),
  })

  const shareTotem = () => {
    if (navigator?.share) {
      navigator
        .share({
          title: `Moon Totem #${tokenId}`,
          text: `Moon Totem #${tokenId}: ${metaData?.trait_name1} ${metaData?.trait_name2} - ${metaData?.trait_jobField} ${metaData?.trait_jobTitle}. ${metaData?.trait_personality1}, ${metaData?.trait_personality2} & ${metaData?.trait_personality3}. Lunar Origin: ${metaData?.lunarOriginName}`,
          url: window.location.href,
        })
        .catch(() => {})
    } else {
      toast.error('Share not supported on this browser, do it the old way.')
    }
  }

  return (
    <div>
      {oneFeatureIsVisible && (
        <div className="fixed left-0 z-100 h-full w-full overflow-y-hidden">
          <FeaturePanels creature={creature} metaData={metaData} />
        </div>
      )}

      <div {...swipeHandlers}>
        <img
          src={getImageUrl({ tokenId, size: ownedByUser ? 2048 : 1024 })}
          alt={`Moon Totem #${tokenId}`}
          className="w-full"
          draggable={false}
        />
      </div>

      <div className="grid grid-cols-4">
        <div className="mt-[15px] flex flex-col items-center gap-4">
          <StatusIcon creature={creature} className="size-4" />
          <button type="button" aria-label="Share" onClick={shareTotem}>
            <Share2 className="size-4 cursor-pointer" />
          </button>
        </div>
        <div className="col-span-2 text-center">
          <div className="text-3xl">
            {metaData?.trait_name1} {metaData?.trait_name2}
          </div>
          <div className="text-xl font-semibold">
            {metaData?.trait_jobField} {metaData?.trait_jobTitle}
          </div>
        </div>
        <div className="mt-[15px] flex flex-col items-center gap-4">
          <FavoriteButton creature={creature} className="size-4" />
          <button
            type="button"
            aria-label="Totem info"
            onClick={() => toggleFeaturePanel('metaData')}
          >
            <Info className="size-4 cursor-pointer" />
          </button>
        </div>
      </div>

      <div className="mt-[15px] pb-6 text-center">
        {minted && (
          <a href={`${OPENSEA_ASSET_BASE}/${tokenId}`} target="_blank" rel="noreferrer">
            <button
              type="button"
              className="mb-3 h-[26px] min-w-[113px] cursor-pointer rounded-[15px] bg-[#1062FE] px-[15px] text-xs leading-[25px] text-white"
            >
              View on Opensea
            </button>
          </a>
        )}
        {address && isAvailable && (
          <button
            type="button"
            className="mb-3 h-[26px] min-w-[113px] cursor-pointer rounded-[15px] border border-white/40 bg-transparent px-[15px] text-xs leading-[25px] text-white"
            onClick={() => mint(tokenId, address)}
          >
            Summon this Totem ({MINT_PRICE_ETH} Ξ)
          </button>
        )}
      </div>
    </div>
  )
}

/** Creature detail page: desktop (zoom + keyboard nav) and mobile (swipe). */
export function CreaturePage({ tokenId }: { tokenId: number }) {
  const { isMobile } = useMoonTotems()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {isMobile ? (
        <CreatureMobile initialTokenId={tokenId} />
      ) : (
        <CreatureDesktop initialTokenId={tokenId} />
      )}

      <ActionSidebar />

      <div className="fixed bottom-0 left-0 z-1000 w-full">
        <NftFooter />
      </div>
    </>
  )
}
