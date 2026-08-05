/**
 * After hardhat-deploy, copy MoonTotems ABI + addresses into packages/contracts.
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const deploymentsDir = path.join(root, 'deployments')
const outDir = path.join(root, '../../packages/contracts/src')
const abiOut = path.join(outDir, 'moon-totems-abi.json')
const constantsOut = path.join(outDir, 'constants.ts')

const NETWORK_TO_CHAIN_ID = {
  localhost: 31337,
  hardhat: 31337,
  mainnet: 1,
}

function findDeployments() {
  if (!fs.existsSync(deploymentsDir)) return []
  const networks = fs.readdirSync(deploymentsDir)
  const found = []
  for (const network of networks) {
    const file = path.join(deploymentsDir, network, 'MoonTotems.json')
    if (fs.existsSync(file)) {
      found.push({ network, data: JSON.parse(fs.readFileSync(file, 'utf8')) })
    }
  }
  return found
}

function main() {
  const deployments = findDeployments()
  if (deployments.length === 0) {
    console.log('No MoonTotems deployments found under deployments/. Skipping export.')
    return
  }

  const preferred =
    deployments.find((d) => d.network === 'mainnet') || deployments[0]
  fs.writeFileSync(abiOut, JSON.stringify(preferred.data.abi, null, 2) + '\n')
  console.log('Wrote ABI →', abiOut)

  const addresses = {
    1: '0x8fE83f6f7f726A2C9E238B7E094c4Bf530bC9720',
    31337: '0x8fE83f6f7f726A2C9E238B7E094c4Bf530bC9720',
  }

  for (const { network, data } of deployments) {
    const chainId = NETWORK_TO_CHAIN_ID[network]
    if (chainId && data.address) {
      addresses[chainId] = data.address
    }
  }

  const constants = `export const MIN_TOKEN_ID = 0
export const MAX_TOKEN_ID = 9457
export const TOTAL_TOKENS = MAX_TOKEN_ID - MIN_TOKEN_ID + 1

/** Default mint price in ETH (matches contract TOTEM_MINT_PRICE unless owner changed it). */
export const MINT_PRICE_ETH = '0.1'

export const NFT_NAME = 'MoonTotems'
export const NFT_SYMBOL = 'TOTEM'
export const NFT_BASE_URI = 'https://api.moontotems.com/token/'

export const MOON_TOTEMS_ADDRESSES = {
  1: '${addresses[1]}' as const,
  31337: '${addresses[31337]}' as const,
} as const

export type SupportedChainId = keyof typeof MOON_TOTEMS_ADDRESSES

export function getMoonTotemsAddress(chainId: number): \`0x\${string}\` | undefined {
  return MOON_TOTEMS_ADDRESSES[chainId as SupportedChainId]
}
`

  fs.writeFileSync(constantsOut, constants)
  console.log('Wrote constants →', constantsOut)
  console.log('Addresses:', addresses)
}

main()
