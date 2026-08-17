import { createFileRoute } from '@tanstack/react-router'

import { TotemCard } from '~/lib/sharedComponents/nft'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { useTokenCards } from '~/lib/nft/use-token-data'

const MintedPage = () => {
  const { mintEventTokenIds, assembleMoonTotem } = useMoonTotems()
  const cards = useTokenCards(mintEventTokenIds)

  return (
    <div className="mx-auto w-full md:w-2/3">
      {mintEventTokenIds.length === 0 && (
        <div className="mt-[10%] text-center text-xl">No mints found.</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mintEventTokenIds.map((tokenId) => (
          <TotemCard
            key={`TOTEM-${tokenId}-minted`}
            moonTotem={assembleMoonTotem(tokenId)}
            card={cards.get(tokenId)}
            showButtons
          />
        ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_nft/minted/')({
  component: MintedPage,
})
