import { getMoonTotemsAddress } from '@moontotems/contracts'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useChainId, usePublicClient } from 'wagmi'

import { shortAddress } from '~/lib/nft/format'
import { targetChainId } from '~/lib/web3/config'

type MintEvent = {
  blockNumber: bigint
  tokenId: number
  to: string
}

type TransferEvent = {
  blockNumber: bigint
  tokenId: number
  from: string
  to: string
}

function EventList({ children }: { children: React.ReactNode }) {
  return <div className="divide-y divide-[#393939] border border-[#393939]">{children}</div>
}

function ContractEventsPage() {
  const chainId = useChainId() || targetChainId
  const contractAddress = getMoonTotemsAddress(chainId)
  const publicClient = usePublicClient()

  const [mintEvents, setMintEvents] = useState<MintEvent[]>([])
  const [transferEvents, setTransferEvents] = useState<TransferEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function loadEvents() {
      if (!publicClient || !contractAddress) {
        setLoading(false)
        return
      }
      try {
        const latest = await publicClient.getBlockNumber()
        const fromBlock = latest > 50000n ? latest - 50000n : 0n

        const [mintLogs, transferLogs] = await Promise.all([
          publicClient.getLogs({
            address: contractAddress,
            event: {
              type: 'event',
              name: 'Mint',
              inputs: [
                { indexed: true, name: '_to', type: 'address' },
                { indexed: true, name: '_tokenId', type: 'uint256' },
              ],
            },
            fromBlock,
            toBlock: 'latest',
          }),
          publicClient.getLogs({
            address: contractAddress,
            event: {
              type: 'event',
              name: 'Transfer',
              inputs: [
                { indexed: true, name: '_from', type: 'address' },
                { indexed: true, name: '_to', type: 'address' },
                { indexed: true, name: '_tokenId', type: 'uint256' },
              ],
            },
            fromBlock,
            toBlock: 'latest',
          }),
        ])
        if (cancelled) return

        setMintEvents(
          mintLogs
            .map((log) => ({
              blockNumber: log.blockNumber,
              tokenId: Number(log.args._tokenId),
              to: String(log.args._to),
            }))
            .reverse(),
        )
        setTransferEvents(
          transferLogs
            .map((log) => ({
              blockNumber: log.blockNumber,
              tokenId: Number(log.args._tokenId),
              from: String(log.args._from),
              to: String(log.args._to),
            }))
            .reverse(),
        )
      } catch (e) {
        console.warn('contract events unavailable', e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    loadEvents()
    return () => {
      cancelled = true
    }
  }, [publicClient, contractAddress])

  return (
    <div className="w-full p-4">
      <h2 className="mb-4 text-2xl font-semibold">Contract Events</h2>
      {loading && <div className="p-4 text-[#8d8d8d]">Loading events...</div>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Mint Events</h3>
          <EventList>
            {!loading && mintEvents.length === 0 && (
              <div className="p-3 text-[#8d8d8d]">No mint events found.</div>
            )}
            {mintEvents.map((event) => (
              <div className="p-3 text-sm" key={`mint_${event.blockNumber}_${event.tokenId}`}>
                Block {String(event.blockNumber)} – Token Id:{' '}
                <Link
                  className="text-[#4589FF] hover:underline"
                  params={{ id: String(event.tokenId) }}
                  to="/$id"
                >
                  {event.tokenId}
                </Link>{' '}
                To: <span className="font-mono">{shortAddress(event.to)}</span>
              </div>
            ))}
          </EventList>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Transfer Events</h3>
          <EventList>
            {!loading && transferEvents.length === 0 && (
              <div className="p-3 text-[#8d8d8d]">No transfer events found.</div>
            )}
            {transferEvents.map((event) => (
              <div
                className="p-3 text-sm"
                key={`transfer_${event.blockNumber}_${event.tokenId}_${event.from}`}
              >
                Block {String(event.blockNumber)} – Token Id:{' '}
                <Link
                  className="text-[#4589FF] hover:underline"
                  params={{ id: String(event.tokenId) }}
                  to="/$id"
                >
                  {event.tokenId}
                </Link>{' '}
                – From: <span className="font-mono">{shortAddress(event.from)}</span> To:{' '}
                <span className="font-mono">{shortAddress(event.to)}</span>
              </div>
            ))}
          </EventList>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_nft/contract-events/')({
  component: ContractEventsPage,
})
