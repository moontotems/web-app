import {
  MINT_PRICE_ETH,
  getMoonTotemsAddress,
  moonTotemsAbi as moonTotemsAbiJson,
} from '@moontotems/contracts'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { toast } from 'sonner'
import type { Abi } from 'viem'
import { parseEther } from 'viem'

const moonTotemsAbi = moonTotemsAbiJson as Abi
import {
  useAccount,
  useChainId,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { targetChainId } from '~/lib/web3/config'

export function useMoonTotemsAddress() {
  const chainId = useChainId()
  const effectiveChainId = chainId || targetChainId
  return getMoonTotemsAddress(effectiveChainId)
}

export function useUserTotems() {
  const { address, isConnected } = useAccount()
  const contractAddress = useMoonTotemsAddress()

  const balanceQuery = useReadContract({
    address: contractAddress,
    abi: moonTotemsAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(isConnected && address && contractAddress),
    },
  })

  const balance = balanceQuery.data ? Number(balanceQuery.data) : 0

  const tokenIndexContracts = useMemo(() => {
    if (!contractAddress || !address || balance <= 0) return []
    return Array.from({ length: balance }, (_, index) => ({
      address: contractAddress,
      abi: moonTotemsAbi,
      functionName: 'tokenOfOwnerByIndex' as const,
      args: [address, BigInt(index)] as const,
    }))
  }, [address, balance, contractAddress])

  const tokensQuery = useReadContracts({
    contracts: tokenIndexContracts,
    query: {
      enabled: tokenIndexContracts.length > 0,
    },
  })

  const tokenIds = useMemo(() => {
    if (!tokensQuery.data) return [] as number[]
    return tokensQuery.data
      .map((result) => (result.status === 'success' ? Number(result.result) : null))
      .filter((id): id is number => id !== null)
  }, [tokensQuery.data])

  const refetch = useCallback(async () => {
    await balanceQuery.refetch()
    await tokensQuery.refetch()
  }, [balanceQuery, tokensQuery])

  return {
    balance,
    tokenIds,
    isLoading: balanceQuery.isLoading || tokensQuery.isLoading,
    refetch,
  }
}

export function useIsTokenMinted(tokenId: number | undefined) {
  const contractAddress = useMoonTotemsAddress()

  const ownerQuery = useReadContract({
    address: contractAddress,
    abi: moonTotemsAbi,
    functionName: 'ownerOf',
    args: tokenId !== undefined ? [BigInt(tokenId)] : undefined,
    query: {
      enabled: Boolean(contractAddress && tokenId !== undefined),
      retry: false,
    },
  })

  // ownerOf reverts for unminted tokens
  const minted = ownerQuery.isSuccess
  const owner =
    ownerQuery.isSuccess && typeof ownerQuery.data === 'string' ? ownerQuery.data : undefined

  return {
    minted,
    owner,
    isLoading: ownerQuery.isLoading,
    refetch: ownerQuery.refetch,
  }
}

export function useMintTotem() {
  const { address } = useAccount()
  const contractAddress = useMoonTotemsAddress()
  const queryClient = useQueryClient()
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })

  const mint = useCallback(
    async (tokenId: number, to?: `0x${string}`) => {
      if (!contractAddress) {
        toast.error('MoonTotems contract not configured for this network')
        return
      }
      const recipient = to ?? address
      if (!recipient) {
        toast.error('Connect a wallet to mint')
        return
      }

      try {
        const txHash = await writeContractAsync({
          address: contractAddress,
          abi: moonTotemsAbi,
          functionName: 'mint',
          args: [recipient, BigInt(tokenId)],
          value: parseEther(MINT_PRICE_ETH),
        })
        toast.success(`Mint submitted: ${txHash.slice(0, 10)}...`)
        await queryClient.invalidateQueries()
        return txHash
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Mint failed'
        toast.error(message)
        throw e
      }
    },
    [address, contractAddress, queryClient, writeContractAsync],
  )

  return {
    mint,
    hash,
    isPending: isPending || receipt.isLoading,
    isSuccess: receipt.isSuccess,
    error,
  }
}
