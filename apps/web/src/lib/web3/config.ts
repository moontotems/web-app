import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { hardhat, mainnet } from 'wagmi/chains'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'moontotems-local-dev'

const mainnetRpc = import.meta.env.VITE_RPC_URL || undefined
const localhostRpc = import.meta.env.VITE_LOCALHOST_RPC_URL || 'http://127.0.0.1:8545'

export const wagmiConfig = getDefaultConfig({
  appName: 'MoonTotems',
  projectId,
  chains: [hardhat, mainnet],
  transports: {
    [hardhat.id]: http(localhostRpc),
    [mainnet.id]: http(mainnetRpc),
  },
  ssr: true,
})

export const targetChainId = Number(import.meta.env.VITE_TARGET_CHAIN_ID || hardhat.id)
