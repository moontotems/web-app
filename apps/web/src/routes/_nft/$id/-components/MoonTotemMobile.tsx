import { MINT_PRICE_ETH } from '@moontotems/contracts'
import { Info, Share2 } from 'lucide-react'
import { useMemo } from 'react'
import { useSwipeable } from 'react-swipeable'
import { toast } from 'sonner'

import { FOOTER_HEIGHT, HEADER_HEIGHT } from '~/lib/constants'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import { useTokenMetadata } from '~/lib/nft/use-token-data'

import { TotemCaption } from '~/lib/sharedComponents/nft/TotemCaption'

import { FavoriteButton } from './FavoriteButton'
import { FeaturePanels } from './FeaturePanels'
import { OpenSeaButton } from './OpenSeaButton'
import { StatusIcon } from './StatusIcon'
import { useMoonTotemNavigation } from './use-moon-totem-navigation'

export function MoonTotemMobile({ initialTokenId }: { initialTokenId: number }) {
  const { address, mint, featurePanels, toggleFeaturePanel } = useMoonTotems()
  const { moonTotem, navigate } = useMoonTotemNavigation(initialTokenId)

  const { tokenId, minted, ownedByUser } = moonTotem
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
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)` }}
    >
      {oneFeatureIsVisible && (
        <div className="fixed left-0 z-100 h-full w-full overflow-y-hidden">
          <FeaturePanels moonTotem={moonTotem} metaData={metaData} />
        </div>
      )}

      <div
        {...swipeHandlers}
        className="flex min-h-0 flex-1 items-center justify-center px-4"
      >
        <img
          src={getImageUrl({ tokenId, size: ownedByUser ? 2048 : 1024 })}
          alt={`Moon Totem #${tokenId}`}
          className="max-h-full max-w-full object-contain"
          draggable={false}
        />
      </div>

      <div className="shrink-0 px-2 pb-3">
        <div className="grid grid-cols-4 items-start">
          <div className="mt-[7px] flex flex-col items-center gap-4">
            <StatusIcon moonTotem={moonTotem} className="size-4" />
            <button type="button" aria-label="Share" onClick={shareTotem}>
              <Share2 className="size-4 cursor-pointer" />
            </button>
          </div>
          <div className="col-span-2">
            <TotemCaption
              name1={metaData?.trait_name1}
              name2={metaData?.trait_name2}
              jobField={metaData?.trait_jobField}
              jobTitle={metaData?.trait_jobTitle}
              nameClassName="text-3xl"
              jobClassName="text-xl"
            />
          </div>
          <div className="mt-[7px] flex flex-col items-center gap-4">
            <FavoriteButton moonTotem={moonTotem} className="size-4" />
            <button
              type="button"
              aria-label="Totem info"
              onClick={() => toggleFeaturePanel('metaData')}
            >
              <Info className="size-4 cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="mt-3 text-center">
          {minted && <OpenSeaButton tokenId={tokenId} />}
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
    </div>
  )
}
