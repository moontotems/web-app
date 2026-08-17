import { getMoonTotemsAddress } from '@moontotems/contracts'
import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useAccount, useChainId } from 'wagmi'

import { targetChainId } from '~/lib/web3/config'

import { FunctionRow } from './-components/FunctionRow'
import { functionKey, listContractFunctions } from './-data'

type Tab = 'read' | 'write'

const ContractInterfacePage = () => {
  const { isConnected } = useAccount()
  const chainId = useChainId() || targetChainId
  const contractAddress = getMoonTotemsAddress(chainId)

  const [tab, setTab] = useState<Tab>('read')
  const [openKeys, setOpenKeys] = useState<Set<string>>(() => new Set())

  const functions = useMemo(() => listContractFunctions(tab), [tab])

  const expandAll = () => {
    setOpenKeys(new Set(functions.map((fn, i) => functionKey(fn, i))))
  }

  const collapseAll = () => {
    setOpenKeys(new Set())
  }

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  if (!contractAddress) {
    return (
      <div className="mx-auto w-full max-w-3xl p-4">
        <div className="mt-[10%] text-center text-xl text-[#8d8d8d]">
          No Moon Totems address for this chain.
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-4">
      <h2 className="mb-2 text-2xl font-semibold">Contract Interface</h2>
      <p className="mb-6 text-sm text-[#8d8d8d]">
        Moon Totems at <span className="font-mono text-[#4589FF]">{contractAddress}</span>
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-4 border-b border-[#393939]">
        <button
          type="button"
          className={`cursor-pointer border-b-2 px-1 pb-2 text-base ${
            tab === 'read'
              ? 'border-[#4589FF] text-white'
              : 'border-transparent text-[#8d8d8d] hover:text-white'
          }`}
          onClick={() => {
            setTab('read')
            setOpenKeys(new Set())
          }}
        >
          Read Contract
        </button>
        <button
          type="button"
          className={`cursor-pointer border-b-2 px-1 pb-2 text-base ${
            tab === 'write'
              ? 'border-[#4589FF] text-white'
              : 'border-transparent text-[#8d8d8d] hover:text-white'
          }`}
          onClick={() => {
            setTab('write')
            setOpenKeys(new Set())
          }}
        >
          Write Contract
        </button>
        <div className="ml-auto flex gap-3 pb-2 text-sm">
          <button
            type="button"
            className="cursor-pointer text-[#4589FF] hover:underline"
            onClick={expandAll}
          >
            [Expand All]
          </button>
          <button
            type="button"
            className="cursor-pointer text-[#4589FF] hover:underline"
            onClick={collapseAll}
          >
            [Reset]
          </button>
        </div>
      </div>

      {tab === 'write' && !isConnected && (
        <div className="mb-4 text-sm text-[#8d8d8d]">Connect wallet to write to the contract.</div>
      )}

      <div className="space-y-2">
        {functions.map((fn, index) => {
          const key = functionKey(fn, index)
          return (
            <FunctionRow
              key={key}
              fn={fn}
              index={index + 1}
              mode={tab}
              contractAddress={contractAddress}
              open={openKeys.has(key)}
              onToggle={() => toggle(key)}
            />
          )
        })}
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_nft/contract-interface/')({
  component: ContractInterfacePage,
  head: () => ({ meta: [{ title: 'Contract Interface · Moon Totems' }] }),
})
