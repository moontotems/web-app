require('dotenv').config()
require('@nomiclabs/hardhat-waffle')
require('hardhat-deploy')
require('@nomiclabs/hardhat-ethers')

const { utils } = require('ethers')
const fs = require('fs')
const chalk = require('chalk')

const { isAddress, getAddress, formatUnits, parseUnits } = utils

const defaultNetwork = process.env.HARDHAT_NETWORK || 'localhost'

function mnemonic() {
  if (process.env.MNEMONIC) return process.env.MNEMONIC.trim()
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim()
  } catch {
    if (defaultNetwork !== 'localhost' && defaultNetwork !== 'hardhat') {
      console.log(
        'WARNING: No MNEMONIC / mnemonic.txt for deploy account. Run `bun run generate`.',
      )
    }
  }
  return ''
}

const accountsFromMnemonic = () => {
  const phrase = mnemonic()
  return phrase ? { mnemonic: phrase } : undefined
}

module.exports = {
  defaultNetwork,
  solidity: {
    version: '0.8.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: process.env.LOCALHOST_RPC_URL || 'http://127.0.0.1:8545',
      chainId: 31337,
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL || '',
      accounts: accountsFromMnemonic(),
      chainId: 1,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
  },
}

const DEBUG = false

function debug(msg) {
  if (DEBUG) console.log(msg)
}

task('wallet', 'Create a wallet (pk) link', async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom()
  const privateKey = randomWallet._signingKey().privateKey
  console.log('🔐 WALLET Generated as ' + randomWallet.address)
  console.log('pk: ' + privateKey)
})

task('generate', 'Create a mnemonic for deployer account', async (_, { ethers }) => {
  const bip39 = require('bip39')
  const hdkey = require('ethereumjs-wallet/hdkey')
  const mnemonicPhrase = bip39.generateMnemonic()
  const seed = await bip39.mnemonicToSeed(mnemonicPhrase)
  const hdwallet = hdkey.fromMasterSeed(seed)
  const wallet_hdpath = "m/44'/60'/0'/0/"
  const account_index = 0
  const fullPath = wallet_hdpath + account_index
  const wallet = hdwallet.derivePath(fullPath).getWallet()
  const privateKey = '0x' + wallet.getPrivateKey().toString('hex')
  const EthUtil = require('ethereumjs-util')
  const address = '0x' + EthUtil.privateToAddress(wallet.getPrivateKey()).toString('hex')
  console.log('🔐 Account Generated as ' + address)
  fs.writeFileSync('./mnemonic.txt', mnemonicPhrase)
  fs.writeFileSync('./mnemonic.txt.address', address)
  console.log('✍️  Wrote mnemonic.txt')
})

task('account', 'Get balance for mnemonic account', async (_, { ethers }) => {
  const bip39 = require('bip39')
  const hdkey = require('ethereumjs-wallet/hdkey')
  const mnemonicPhrase = mnemonic()
  if (!mnemonicPhrase) {
    console.log('No mnemonic found')
    return
  }
  const seed = await bip39.mnemonicToSeed(mnemonicPhrase)
  const hdwallet = hdkey.fromMasterSeed(seed)
  const wallet_hdpath = "m/44'/60'/0'/0/"
  const account_index = 0
  const fullPath = wallet_hdpath + account_index
  const wallet = hdwallet.derivePath(fullPath).getWallet()
  const privateKey = '0x' + wallet.getPrivateKey().toString('hex')
  const EthUtil = require('ethereumjs-util')
  const address =
    '0x' + EthUtil.privateToAddress(wallet.getPrivateKey()).toString('hex')
  console.log('📡 Account: ' + address)
  for (const n in config.networks) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(config.networks[n].url)
      const balance = await provider.getBalance(address)
      console.log(' -- ' + n + ' --  -- -- 📡')
      console.log(' balance: ' + ethers.utils.formatEther(balance))
    } catch (e) {
      if (DEBUG) console.log(e)
    }
  }
})

task('accounts', 'Prints the list of accounts', async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts()
  accounts.forEach((account) => console.log(account))
})

task('blockNumber', 'Prints the block number', async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber()
  console.log(blockNumber)
})

task('balance', "Prints an account's balance")
  .addPositionalParam('account', "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(await addr(ethers, taskArgs.account))
    console.log(formatUnits(balance, 'ether'), 'ETH')
  })

async function addr(ethers, addr) {
  if (isAddress(addr)) {
    return getAddress(addr)
  }
  const accounts = await ethers.provider.listAccounts()
  if (accounts[addr] !== undefined) {
    return accounts[addr]
  }
  throw `Could not normalize address: ${addr}`
}

task('send', 'Send ETH')
  .addParam('from', 'From address or account index')
  .addOptionalParam('to', 'To address or account index')
  .addOptionalParam('amount', 'Amount of ETH to send', '0', types.string)
  .addOptionalParam('data', 'Data included in transaction', '', types.string)
  .addOptionalParam('gasPrice', 'Price you are willing to pay in gwei', '', types.string)
  .addOptionalParam('gasLimit', 'Limit of how much gas to spend', '', types.string)
  .setAction(async (taskArgs, { network, ethers }) => {
    const from = await addr(ethers, taskArgs.from)
    debug(`Normalized from address: ${from}`)
    const fromSigner = await ethers.provider.getSigner(from)

    let to
    if (taskArgs.to) {
      to = await addr(ethers, taskArgs.to)
      debug(`Normalized to address: ${to}`)
    }

    const txRequest = {
      from: await fromSigner.getAddress(),
      to,
      value: parseUnits(taskArgs.amount || '0', 'ether').toHexString(),
      nonce: await fromSigner.getTransactionCount(),
      gasPrice: taskArgs.gasPrice
        ? parseUnits(taskArgs.gasPrice, 'gwei')
        : undefined,
      gasLimit: taskArgs.gasLimit ? taskArgs.gasLimit : undefined,
      chainId: network.config.chainId,
      data: taskArgs.data || undefined,
    }

    debug(txRequest.gasPrice / 1000000000 + ' gwei')
    debug(JSON.stringify(txRequest, null, 2))

    return send(fromSigner, txRequest)
  })

function send(signer, txparams) {
  return signer.sendTransaction(txparams, (error, transactionHash) => {
    if (error) {
      debug(`Error: ${error}`)
    }
    debug(`transactionHash: ${transactionHash}`)
  })
}
