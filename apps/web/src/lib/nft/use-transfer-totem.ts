import { getMoonTotemsAddress, moonTotemsAbi as moonTotemsAbiJson } from '@moontotems/contracts'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { toast } from 'sonner'
import type { Abi, Address } from 'viem'
import { isAddress } from 'viem'
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

import { targetChainId } from '~/lib/web3/config'

const moonTotemsAbi = moonTotemsAbiJson as Abi

export function useTransferTotem() {
  const { address } = useAccount()
  const chainId = useChainId() || targetChainId
  const contractAddress = getMoonTotemsAddress(chainId)
  const queryClient = useQueryClient()
  const { writeContractAsync, data: hash, isPending } = useWriteContract()
  const receipt = useWaitForTransactionReceipt({ hash })

  const transfer = useCallback(
    async (tokenId: number, to: string) => {
      if (!contractAddress || !address) {
        toast.error('Connect a wallet first')
        return
      }
      if (!isAddress(to)) {
        toast.error('Invalid recipient address')
        return
      }

      try {
        const txHash = await writeContractAsync({
          address: contractAddress,
          abi: moonTotemsAbi,
          functionName: 'transferFrom',
          args: [address as Address, to as Address, BigInt(tokenId)],
        })
        toast.success(`Transfer submitted: ${txHash.slice(0, 10)}...`)
        await queryClient.invalidateQueries()
        return txHash
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Transfer failed')
        throw e
      }
    },
    [address, contractAddress, queryClient, writeContractAsync],
  )

  return {
    transfer,
    isPending: isPending || receipt.isLoading,
    isSuccess: receipt.isSuccess,
  }
}
