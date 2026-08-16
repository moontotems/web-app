import { ChevronDown, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { parseEther } from 'viem'
import { useAccount, usePublicClient, useWriteContract } from 'wagmi'

import {
  type ContractFn,
  formatAbiValue,
  functionSelector,
  inputPlaceholder,
  parseAbiArgs,
} from '../-data'

const fieldClass =
  'mb-2 w-full border border-[#393939] bg-black px-3 py-2 text-sm text-white outline-none placeholder:text-[#8d8d8d] focus:border-[#1062FE]'

const primaryBtnClass =
  'h-[34px] cursor-pointer bg-[#1062FE] px-4 text-sm text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50'

export function FunctionRow({
  fn,
  index,
  mode,
  contractAddress,
  open,
  onToggle,
}: {
  fn: ContractFn
  index: number
  mode: 'read' | 'write'
  contractAddress: `0x${string}`
  open: boolean
  onToggle: () => void
}) {
  const { isConnected } = useAccount()
  const publicClient = usePublicClient()
  const { writeContractAsync, isPending } = useWriteContract()

  const inputs = fn.inputs ?? []
  const [values, setValues] = useState<string[]>(() => inputs.map(() => ''))
  const [payableEth, setPayableEth] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const selector = functionSelector(fn)
  const visibleParams = inputs.slice(0, 2)
  const hiddenCount = Math.max(0, inputs.length - 2)

  const copySelector = async () => {
    try {
      await navigator.clipboard.writeText(selector)
      toast.success('Copied selector')
    } catch {
      toast.error('Copy failed')
    }
  }

  const onQuery = async () => {
    if (!publicClient) {
      toast.error('No RPC client')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const args = parseAbiArgs(inputs, values)
      const data = await publicClient.readContract({
        address: contractAddress,
        abi: [fn],
        functionName: fn.name,
        args: args as never[],
      })
      setResult(formatAbiValue(data))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Query failed')
    } finally {
      setLoading(false)
    }
  }

  const onWrite = async () => {
    if (!isConnected) {
      toast.error('Please connect wallet')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const args = parseAbiArgs(inputs, values)
      const hash = await writeContractAsync({
        address: contractAddress,
        abi: [fn],
        functionName: fn.name,
        args: args as never[],
        ...(fn.stateMutability === 'payable' && payableEth
          ? { value: parseEther(payableEth) }
          : fn.stateMutability === 'payable'
            ? { value: 0n }
            : {}),
      })
      setResult(hash)
      toast.success(`${fn.name}: ${hash.slice(0, 10)}...`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Write failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-[#393939] bg-[#161616]">
      <div className="flex w-full items-center gap-2 px-3 py-3 hover:bg-[#262626]">
        <button
          type="button"
          className="min-w-0 flex-1 cursor-pointer text-left text-sm"
          onClick={onToggle}
        >
          <span className="font-semibold">
            {index}. {fn.name}
          </span>{' '}
          <span className="text-[#8d8d8d]">({selector})</span>
          {open ? null : (
            <span className="ml-2 inline-flex flex-wrap gap-1 align-middle">
              {visibleParams.map((param) => (
                <span
                  key={`${fn.name}-${param.name || param.type}`}
                  className="inline-block border border-[#393939] bg-[#262626] px-1.5 py-0.5 text-xs text-[#c6c6c6]"
                >
                  {param.name || param.type}
                </span>
              ))}
              {hiddenCount > 0 && (
                <span className="inline-block border border-[#393939] bg-[#262626] px-1.5 py-0.5 text-xs text-[#c6c6c6]">
                  +{hiddenCount} More
                </span>
              )}
            </span>
          )}
        </button>
        <button
          type="button"
          className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center text-[#8d8d8d] hover:text-white"
          onClick={() => void copySelector()}
          title="Copy selector"
        >
          <Copy className="size-3.5" />
        </button>
        <button
          type="button"
          className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center text-[#8d8d8d] hover:text-white"
          onClick={onToggle}
          aria-label={open ? 'Collapse' : 'Expand'}
        >
          <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-[#393939] px-3 py-3">
          {inputs.length === 0 ? (
            <div className="mb-3 text-sm text-[#8d8d8d]">No parameters</div>
          ) : (
            inputs.map((param, i) => (
              <label key={`${param.name || param.type}-${i}`} className="mb-2 block">
                <span className="mb-1 block text-xs text-[#8d8d8d]">
                  {param.name || `arg${i}`} ({param.type})
                </span>
                <input
                  className={fieldClass}
                  value={values[i] ?? ''}
                  placeholder={inputPlaceholder(param)}
                  autoComplete="off"
                  onChange={(e) => {
                    const next = [...values]
                    next[i] = e.target.value
                    setValues(next)
                  }}
                />
              </label>
            ))
          )}

          {fn.stateMutability === 'payable' && (
            <label className="mb-2 block">
              <span className="mb-1 block text-xs text-[#8d8d8d]">payableAmount (ETH)</span>
              <input
                className={fieldClass}
                value={payableEth}
                placeholder="ETH value (e.g. 0.1)"
                autoComplete="off"
                onChange={(e) => setPayableEth(e.target.value)}
              />
            </label>
          )}

          <button
            type="button"
            className={primaryBtnClass}
            disabled={loading || isPending || (mode === 'write' && !isConnected)}
            onClick={() => void (mode === 'read' ? onQuery() : onWrite())}
          >
            {loading || isPending ? '...' : mode === 'read' ? 'Query' : 'Write'}
          </button>

          {error && <div className="mt-3 break-all text-sm text-[#da1e28]">{error}</div>}
          {result && (
            <div className="mt-3 border border-[#393939] bg-black p-3">
              <div className="mb-1 text-xs text-[#8d8d8d]">
                {mode === 'read' ? 'Response' : 'Transaction'}
              </div>
              <pre className="overflow-x-auto font-mono text-sm whitespace-pre-wrap text-[#4589FF]">
                {result}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
