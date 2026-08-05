import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@moontotems/ui'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { LogOut } from 'lucide-react'
import Blockies from 'react-blockies'
import { useDisconnect } from 'wagmi'

import { HEADER_HEIGHT } from '~/lib/nft/constants'
import { shortAddress } from '~/lib/nft/format'

/**
 * Legacy MoonTotems wallet control:
 * red "connect wallet" button, blue address pill with blockies avatar
 * and a disconnect dropdown once connected.
 */
export function WalletButton() {
  const { disconnect } = useDisconnect()

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openChainModal, mounted }) => {
        const connected = mounted && account && chain

        if (!connected) {
          return (
            <button
              type="button"
              onClick={openConnectModal}
              className="cursor-pointer bg-[#DA1E28] px-6 text-sm text-white transition-[filter] hover:brightness-110"
              style={{ height: HEADER_HEIGHT }}
            >
              connect wallet
            </button>
          )
        }

        if (chain.unsupported) {
          return (
            <button
              type="button"
              onClick={openChainModal}
              className="cursor-pointer bg-[#DA1E28] px-6 text-sm text-white"
              style={{ height: HEADER_HEIGHT }}
            >
              wrong network
            </button>
          )
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-2 bg-[#1062FE] px-6 text-sm text-white"
                style={{ height: HEADER_HEIGHT }}
              >
                <Blockies seed={account.address.toLowerCase()} size={8} scale={2.5} />
                <span>{account.ensName ?? shortAddress(account.address)}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="nft-theme min-w-52 rounded-none border-[#393939] bg-[#262626] text-white"
            >
              <DropdownMenuItem
                className="flex cursor-pointer items-center justify-between rounded-none font-semibold text-[#C6C6C6] focus:bg-[#525252] focus:text-white"
                onClick={() => disconnect()}
              >
                Disconnect Wallet
                <LogOut className="size-4" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }}
    </ConnectButton.Custom>
  )
}
