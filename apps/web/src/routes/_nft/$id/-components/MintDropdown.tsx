import { MINT_PRICE_ETH } from '@moontotems/contracts'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@moontotems/ui'
import { ArrowLeftRight, UserRound } from 'lucide-react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { shortAddress } from '~/lib/nft/format'

export const MintDropdown = ({ tokenId }: { tokenId: number }) => {
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
          Mint Totem to {address ? shortAddress(address) : 'your wallet'}
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
