import { Heart } from 'lucide-react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import type { MoonTotem } from '~/lib/nft/types'

export function FavoriteButton({
  moonTotem,
  className,
}: {
  moonTotem: MoonTotem
  className?: string
}) {
  const {
    favorites: { toggleFavorite },
  } = useMoonTotems()
  const { isFavorite, tokenId } = moonTotem

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
