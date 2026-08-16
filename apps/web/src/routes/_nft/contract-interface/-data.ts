import type { Abi, AbiFunction, AbiParameter } from 'viem'
import { toFunctionSelector } from 'viem'

import { moonTotemsAbi } from '@moontotems/contracts'

export type ContractFn = AbiFunction & { type: 'function' }

export function listContractFunctions(kind: 'read' | 'write'): ContractFn[] {
  const abi = moonTotemsAbi as Abi
  return abi.filter((item): item is ContractFn => {
    if (item.type !== 'function' || !item.name) return false
    const isRead = item.stateMutability === 'view' || item.stateMutability === 'pure'
    return kind === 'read' ? isRead : !isRead
  })
}

export function functionKey(fn: ContractFn, index: number): string {
  return `${fn.name}-${toFunctionSelector(fn)}-${index}`
}

export function functionSelector(fn: ContractFn): string {
  return toFunctionSelector(fn)
}

export function formatAbiValue(value: unknown): string {
  if (value === null || value === undefined) return String(value)
  if (typeof value === 'bigint') return value.toString()
  if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
    return String(value)
  }
  if (Array.isArray(value)) {
    return `[${value.map((v) => formatAbiValue(v)).join(', ')}]`
  }
  try {
    return JSON.stringify(value, (_key, v) => (typeof v === 'bigint' ? v.toString() : v), 2)
  } catch {
    return String(value)
  }
}

export function parseAbiArg(param: AbiParameter, raw: string): unknown {
  const type = param.type
  const trimmed = raw.trim()

  if (type === 'bool') {
    if (trimmed === 'true' || trimmed === '1') return true
    if (trimmed === 'false' || trimmed === '0') return false
    throw new Error(`Invalid bool: ${raw}`)
  }

  if (type.startsWith('uint') || type.startsWith('int')) {
    if (!trimmed) throw new Error(`Missing ${param.name || type}`)
    return BigInt(trimmed)
  }

  if (type === 'address') {
    if (!/^0x[a-fA-F0-9]{40}$/.test(trimmed)) throw new Error(`Invalid address: ${raw}`)
    return trimmed as `0x${string}`
  }

  if (type === 'bytes' || type.startsWith('bytes')) {
    if (!trimmed.startsWith('0x')) throw new Error(`Expected hex for ${param.name || type}`)
    return trimmed as `0x${string}`
  }

  if (type === 'string') return raw

  if (type.endsWith('[]')) {
    const parsed = JSON.parse(trimmed || '[]') as unknown[]
    const inner = type.slice(0, -2)
    return parsed.map((item) => parseAbiArg({ type: inner, name: param.name }, String(item)))
  }

  return trimmed
}

export function parseAbiArgs(inputs: readonly AbiParameter[], values: string[]): unknown[] {
  return inputs.map((input, i) => parseAbiArg(input, values[i] ?? ''))
}

export function inputPlaceholder(param: AbiParameter): string {
  const name = param.name || param.type
  if (param.type === 'address') return `${name} (address)`
  if (param.type === 'bool') return `${name} (true/false)`
  if (param.type.startsWith('uint') || param.type.startsWith('int'))
    return `${name} (${param.type})`
  if (param.type === 'bytes' || param.type.startsWith('bytes')) return `${name} (0x...)`
  return `${name} (${param.type})`
}
