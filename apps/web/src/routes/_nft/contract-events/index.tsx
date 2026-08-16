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

type Tab = 'mint' | 'transfer'

function ContractEventsPage() {
  const chainId = useChainId() || targetChainId
  const contractAddress = getMoonTotemsAddress(chainId)
  const publicClient = usePublicClient()

  const [tab, setTab] = useState<Tab>('mint')
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

  if (!contractAddress) {
    return (
      <div className="mx-auto w-full max-w-3xl p-4">
        <div className="mt-[10%] text-center text-xl text-[#8d8d8d]">
          No Moon Totems address for this chain.
        </div>
      </div>
    )
  }

  const events = tab === 'mint' ? mintEvents : transferEvents

  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <h2 className="mb-2 text-2xl font-semibold">Contract Events</h2>
      <p className="mb-6 text-sm text-[#8d8d8d]">
        Moon Totems at <span className="font-mono text-[#4589FF]">{contractAddress}</span>
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-4 border-b border-[#393939]">
        <button
          type="button"
          className={`cursor-pointer border-b-2 px-1 pb-2 text-base ${
            tab === 'mint'
              ? 'border-[#4589FF] text-white'
              : 'border-transparent text-[#8d8d8d] hover:text-white'
          }`}
          onClick={() => setTab('mint')}
        >
          Mint Events
          {!loading && <span className="ml-2 text-sm text-[#8d8d8d]">({mintEvents.length})</span>}
        </button>
        <button
          type="button"
          className={`cursor-pointer border-b-2 px-1 pb-2 text-base ${
            tab === 'transfer'
              ? 'border-[#4589FF] text-white'
              : 'border-transparent text-[#8d8d8d] hover:text-white'
          }`}
          onClick={() => setTab('transfer')}
        >
          Transfer Events
          {!loading && (
            <span className="ml-2 text-sm text-[#8d8d8d]">({transferEvents.length})</span>
          )}
        </button>
      </div>

      {loading && <div className="mb-4 text-sm text-[#8d8d8d]">Loading events...</div>}

      {!loading && events.length === 0 && (
        <div className="border border-[#393939] bg-[#161616] px-3 py-4 text-sm text-[#8d8d8d]">
          No {tab === 'mint' ? 'mint' : 'transfer'} events found.
        </div>
      )}

      <div className="space-y-2">
        {tab === 'mint' &&
          mintEvents.map((event, index) => (
            <div
              key={`mint_${event.blockNumber}_${event.tokenId}_${index}`}
              className="border border-[#393939] bg-[#161616] px-3 py-3 text-sm hover:bg-[#262626]"
            >
              <div className="mb-1 font-semibold">
                {index + 1}. Mint{' '}
                <span className="font-normal text-[#8d8d8d]">
                  · Block {String(event.blockNumber)}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#c6c6c6]">
                <span>
                  Token Id:{' '}
                  <Link
                    className="text-[#4589FF] hover:underline"
                    params={{ id: String(event.tokenId) }}
                    to="/$id"
                  >
                    {event.tokenId}
                  </Link>
                </span>
                <span>
                  To: <span className="font-mono text-white">{shortAddress(event.to)}</span>
                </span>
              </div>
            </div>
          ))}

        {tab === 'transfer' &&
          transferEvents.map((event, index) => (
            <div
              key={`transfer_${event.blockNumber}_${event.tokenId}_${event.from}_${index}`}
              className="border border-[#393939] bg-[#161616] px-3 py-3 text-sm hover:bg-[#262626]"
            >
              <div className="mb-1 font-semibold">
                {index + 1}. Transfer{' '}
                <span className="font-normal text-[#8d8d8d]">
                  · Block {String(event.blockNumber)}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#c6c6c6]">
                <span>
                  Token Id:{' '}
                  <Link
                    className="text-[#4589FF] hover:underline"
                    params={{ id: String(event.tokenId) }}
                    to="/$id"
                  >
                    {event.tokenId}
                  </Link>
                </span>
                <span>
                  From: <span className="font-mono text-white">{shortAddress(event.from)}</span>
                </span>
                <span>
                  To: <span className="font-mono text-white">{shortAddress(event.to)}</span>
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_nft/contract-events/')({
  component: ContractEventsPage,
  head: () => ({ meta: [{ title: 'Contract Events · Moon Totems' }] }),
})
