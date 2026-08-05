import { useCallback, useEffect, useState } from 'react'
import { usePublicClient } from 'wagmi'

const MINT_EVENT = {
  type: 'event',
  name: 'Mint',
  inputs: [
    { indexed: true, name: '_to', type: 'address' },
    { indexed: true, name: '_tokenId', type: 'uint256' },
  ],
} as const

/**
 * Token ids from recent Mint events, most recent first
 * (drives mint status and the /minted page).
 */
export function useMintEvents(contractAddress: `0x${string}` | undefined) {
  const publicClient = usePublicClient()
  const [mintEventTokenIds, setMintEventTokenIds] = useState<number[]>([])

  useEffect(() => {
    let cancelled = false
    async function loadMints() {
      if (!publicClient || !contractAddress) {
        setMintEventTokenIds([])
        return
      }
      try {
        const latest = await publicClient.getBlockNumber()
        const fromBlock = latest > 50000n ? latest - 50000n : 0n
        const logs = await publicClient.getLogs({
          address: contractAddress,
          event: MINT_EVENT,
          fromBlock,
          toBlock: 'latest',
        })
        if (cancelled) return
        setMintEventTokenIds(
          logs
            .map((log) => Number(log.args?._tokenId))
            .filter((id) => Number.isInteger(id))
            .reverse(),
        )
      } catch (e) {
        console.warn('mint events unavailable', e)
        if (!cancelled) setMintEventTokenIds([])
      }
    }
    loadMints()
    return () => {
      cancelled = true
    }
  }, [publicClient, contractAddress])

  /** Optimistically record a mint we just submitted ourselves. */
  const appendMintEvent = useCallback((tokenId: number) => {
    setMintEventTokenIds((prev) => [tokenId, ...prev])
  }, [])

  return { mintEventTokenIds, appendMintEvent }
}
