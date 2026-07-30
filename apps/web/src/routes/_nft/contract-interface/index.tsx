import { getMoonTotemsAddress, moonTotemsAbi as moonTotemsAbiJson } from '@moontotems/contracts'
import { Button, Input } from '@moontotems/ui'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
import type { Abi } from 'viem'
import { parseEther } from 'viem'
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { targetChainId } from '~/lib/web3/config'

const moonTotemsAbi = moonTotemsAbiJson as Abi

function ContractInterfacePage() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId() || targetChainId
  const contractAddress = getMoonTotemsAddress(chainId)
  const { writeContractAsync, data: hash, isPending } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })

  const [mintTo, setMintTo] = useState('')
  const [mintTokenId, setMintTokenId] = useState('0')
  const [baseUri, setBaseUri] = useState('')
  const [mintPrice, setMintPrice] = useState('0.1')

  const ownerQuery = useReadContract({
    address: contractAddress,
    abi: moonTotemsAbi,
    functionName: 'owner',
    query: { enabled: Boolean(contractAddress) },
  })
  const supplyQuery = useReadContract({
    address: contractAddress,
    abi: moonTotemsAbi,
    functionName: 'totalSupply',
    query: { enabled: Boolean(contractAddress) },
  })
  const mintActiveQuery = useReadContract({
    address: contractAddress,
    abi: moonTotemsAbi,
    functionName: 'MINT_IS_ACTIVE',
    query: { enabled: Boolean(contractAddress) },
  })
  const priceQuery = useReadContract({
    address: contractAddress,
    abi: moonTotemsAbi,
    functionName: 'TOTEM_MINT_PRICE',
    query: { enabled: Boolean(contractAddress) },
  })

  const run = async (label: string, fn: () => Promise<`0x${string}`>) => {
    try {
      const txHash = await fn()
      toast.success(`${label}: ${txHash.slice(0, 10)}...`)
    } catch (e) {
      toast.error(e instanceof Error ? e.message : `${label} failed`)
    }
  }

  if (!contractAddress) {
    return <p className="text-sm text-destructive">No MoonTotems address for this chain.</p>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-[#f3e7d3]">Contract interface</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Admin / scaffold tooling for MoonTotems at{' '}
          <code className="text-xs">{contractAddress}</code>
        </p>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Owner', ownerQuery.data ? String(ownerQuery.data) : '...'],
          ['Total supply', supplyQuery.data != null ? String(supplyQuery.data) : '...'],
          ['Mint active', mintActiveQuery.data == null ? '...' : String(mintActiveQuery.data)],
          ['Mint price (wei)', priceQuery.data != null ? String(priceQuery.data) : '...'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/10 bg-black/20 p-3">
            <dt className="text-xs text-muted-foreground">{k}</dt>
            <dd className="mt-1 break-all text-sm">{v}</dd>
          </div>
        ))}
      </dl>

      <section className="space-y-3 rounded-lg border border-white/10 p-4">
        <h2 className="text-sm text-[#c4a574]">mint(to, tokenId)</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <Input
            placeholder="to"
            value={mintTo || address || ''}
            onChange={(e) => setMintTo(e.target.value)}
          />
          <Input
            placeholder="tokenId"
            value={mintTokenId}
            onChange={(e) => setMintTokenId(e.target.value)}
          />
        </div>
        <Button
          disabled={!isConnected || isPending || receipt.isLoading}
          onClick={() =>
            run('mint', () =>
              writeContractAsync({
                address: contractAddress,
                abi: moonTotemsAbi,
                functionName: 'mint',
                args: [(mintTo || address) as `0x${string}`, BigInt(mintTokenId)],
                value: (priceQuery.data as bigint | undefined) ?? parseEther(mintPrice),
              }),
            )
          }
        >
          Mint
        </Button>
      </section>

      <section className="space-y-3 rounded-lg border border-white/10 p-4">
        <h2 className="text-sm text-[#c4a574]">Owner actions</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            disabled={!isConnected || isPending}
            onClick={() =>
              run('flipMintFlag', () =>
                writeContractAsync({
                  address: contractAddress,
                  abi: moonTotemsAbi,
                  functionName: 'flipMintFlag',
                }),
              )
            }
          >
            flipMintFlag
          </Button>
          <Button
            variant="outline"
            disabled={!isConnected || isPending}
            onClick={() =>
              run('withdraw', () =>
                writeContractAsync({
                  address: contractAddress,
                  abi: moonTotemsAbi,
                  functionName: 'withdraw',
                }),
              )
            }
          >
            withdraw
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Input
            className="max-w-md"
            placeholder="base URI"
            value={baseUri}
            onChange={(e) => setBaseUri(e.target.value)}
          />
          <Button
            variant="outline"
            disabled={!isConnected || isPending || !baseUri}
            onClick={() =>
              run('setBaseUri', () =>
                writeContractAsync({
                  address: contractAddress,
                  abi: moonTotemsAbi,
                  functionName: 'setBaseUri',
                  args: [baseUri],
                }),
              )
            }
          >
            setBaseUri
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Input
            className="max-w-xs"
            placeholder="new mint price (ETH)"
            value={mintPrice}
            onChange={(e) => setMintPrice(e.target.value)}
          />
          <Button
            variant="outline"
            disabled={!isConnected || isPending}
            onClick={() =>
              run('setNewMintPrice', () =>
                writeContractAsync({
                  address: contractAddress,
                  abi: moonTotemsAbi,
                  functionName: 'setNewMintPrice',
                  args: [parseEther(mintPrice)],
                }),
              )
            }
          >
            setNewMintPrice
          </Button>
        </div>
      </section>
    </div>
  )
}

export const Route = createFileRoute('/_nft/contract-interface/')({
  component: ContractInterfacePage,
  head: () => ({ meta: [{ title: 'Contract interface · MoonTotems' }] }),
})
