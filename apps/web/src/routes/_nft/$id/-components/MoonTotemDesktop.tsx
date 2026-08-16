import { useEffect } from 'react'

import { FOOTER_HEIGHT, HEADER_HEIGHT } from '~/lib/constants'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { getImageUrl } from '~/lib/nft/image-url'
import { useTokenMetadata } from '~/lib/nft/use-token-data'

import { TotemCaption } from '~/lib/sharedComponents/nft/TotemCaption'

import { FavoriteButton } from './FavoriteButton'
import { FeaturePanels } from './FeaturePanels'
import { MintDropdown } from './MintDropdown'
import { OpenSeaButton } from './OpenSeaButton'
import { StatusIcon } from './StatusIcon'
import { ZoomImage } from './ZoomImage'
import { useMoonTotemNavigation } from './use-moon-totem-navigation'

export function MoonTotemDesktop({ initialTokenId }: { initialTokenId: number }) {
  const { address } = useMoonTotems()
  const { moonTotem, navigate } = useMoonTotemNavigation(initialTokenId)

  const { tokenId, minted, ownedByUser } = moonTotem
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
      <div className="fixed left-0 z-1000 w-[35%]" style={{ top: HEADER_HEIGHT }}>
        <FeaturePanels moonTotem={moonTotem} metaData={metaData} />
      </div>

      <div
        className="fixed left-0 flex w-full flex-col overflow-hidden"
        style={{
          top: HEADER_HEIGHT,
          height: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
        }}
      >
        <div className="min-h-0 flex-1">
          <ZoomImage
            src={getImageUrl({ tokenId, size: 2048 })}
            zoomSrc={getImageUrl({ tokenId, size: 2048, withSymbol: ownedByUser })}
            alt={`Moon Totem #${tokenId}`}
            height="100%"
          />
        </div>

        <div className="shrink-0 text-center">
          <div className="mb-[3px] flex items-start justify-center gap-10">
            <StatusIcon moonTotem={moonTotem} className="mt-[7px] size-5" />
            <TotemCaption
              name1={metaData?.trait_name1}
              name2={metaData?.trait_name2}
              jobField={metaData?.trait_jobField}
              jobTitle={metaData?.trait_jobTitle}
              nameClassName="text-3xl"
              jobClassName="text-[15px]"
            />
            <FavoriteButton moonTotem={moonTotem} className="mt-[7px] size-5" />
          </div>
          <div className="mt-5 text-[15px]">
            {minted && <OpenSeaButton tokenId={tokenId} />}
            {address && isAvailable && <MintDropdown tokenId={tokenId} />}
          </div>
        </div>
      </div>
    </>
  )
}
