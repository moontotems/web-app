import { Link } from '@tanstack/react-router'
import { CircleUserRound, Heart, Lock, Moon } from 'lucide-react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import type { MoonTotem } from '~/lib/nft/types'
import type { TotemCardData } from '~/lib/nft/use-token-data'

/** Gallery card (legacy sharedComponents/MoonTotem). */
export function TotemCard({
  moonTotem,
  card,
  showButtons = true,
  imageOverride,
  imageLoading = 'lazy',
  imageFetchPriority = 'auto',
}: {
  moonTotem: MoonTotem
  /** Name/job strings from the moontotems table (see useTokenCards). */
  card?: TotemCardData
  showButtons?: boolean
  imageOverride?: string
  /** Prefer `eager` + `high` for above-the-fold grid cells. */
  imageLoading?: 'lazy' | 'eager'
  imageFetchPriority?: 'high' | 'low' | 'auto'
}) {
  const {
    favorites: { toggleFavorite },
  } = useMoonTotems()

  const { tokenId, image, minted, ownedByUser, isFavorite } = moonTotem
  const traitName1 = card?.trait_name1 ?? ''
  const traitName2 = card?.trait_name2 ?? ''
  const jobField = card?.trait_jobField ?? ''
  const jobTitle = card?.trait_jobTitle ?? ''

  const isAvailable = !minted
  const isTaken = minted && !ownedByUser

  return (
    <div className="min-h-[104px]">
      <Link to="/$id" params={{ id: String(tokenId) }}>
        <img
          alt={`Moon Totem ${tokenId}`}
          className="h-auto w-full"
          loading={imageLoading}
          fetchPriority={imageFetchPriority}
          src={imageOverride ?? image}
        />
      </Link>
      <div className="grid grid-cols-4 items-start pt-1 pb-4">
        <div className="flex justify-center pt-1">
          {showButtons && (
            <>
              {isAvailable && <Moon className="size-4" aria-label="Available" />}
              {isTaken && <Lock className="size-4" aria-label="Taken" />}
              {ownedByUser && <CircleUserRound className="size-4" aria-label="Owned by you" />}
            </>
          )}
        </div>
        <div className="col-span-2 text-center">
          <div className="mb-0.5 text-base font-normal">{`${traitName1} ${traitName2}`}</div>
          <div className="text-[13px] font-light">
            {jobField} {jobTitle}
          </div>
        </div>
        <div className="flex justify-center pt-1">
          {showButtons && (
            <button
              type="button"
              aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
              className="cursor-pointer"
              onClick={() => toggleFavorite(tokenId)}
            >
              <Heart
                className="size-4"
                fill={isFavorite ? '#DA1E28' : 'white'}
                stroke={isFavorite ? '#DA1E28' : 'white'}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
