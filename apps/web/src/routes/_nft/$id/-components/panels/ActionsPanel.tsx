import { ArrowLeftRight } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { isAddress } from 'viem'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'

import { FeaturePanel } from './FeaturePanel'

/** TOTEM ACTIONS panel — transfer (legacy MoonTotem features/Actions). */
export function ActionsPanel({ tokenId }: { tokenId: number }) {
  const { transfer, isTransacting } = useMoonTotems()
  const [toAddress, setToAddress] = useState('')

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!toAddress) return
    if (!isAddress(toAddress)) {
      toast.error('Invalid address')
      return
    }
    await transfer(tokenId, toAddress)
  }

  return (
    <FeaturePanel icon={<ArrowLeftRight className="size-4" />} title="TOTEM ACTIONS">
      <form className="flex items-center gap-3 pr-5" onSubmit={onSubmit}>
        <span className="whitespace-nowrap">Transfer To</span>
        <input
          value={toAddress}
          onChange={(event) => setToAddress(event.target.value)}
          placeholder="0x..."
          autoComplete="off"
          className="w-full border border-[#1062FE] bg-transparent px-3 py-1 text-left text-base leading-7 tracking-[0.16px] text-white outline-none"
        />
        <button
          type="submit"
          disabled={isTransacting}
          className="h-[38px] w-[113px] cursor-pointer bg-[#1062FE] px-[15px] text-base text-white hover:brightness-110 disabled:opacity-50"
        >
          Transfer
        </button>
      </form>
    </FeaturePanel>
  )
}
