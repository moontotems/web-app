import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'

import { Alert, Button } from 'antd'
//import {} from 'carbon-components-react'
import 'antd/dist/antd.css'
import 'carbon-components/css/carbon-components.min.css'

import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Web3Modal from 'web3modal'
import persistantStore from 'store'

import './App.less'
import './themes/config.js'
import './themes/antd-adjustments.css'

import Routes from './Routes'
import SidebarLeft from './SidebarLeft'
import Footer from './Footer'
import { Header } from './components'

import { INFURA_ID, NETWORK, NETWORKS } from './constants'

import { Transactor } from './helpers'
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserSigner
} from './hooks'

const { ethers } = require('ethers')

// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.localhost // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = false
const NETWORKCHECK = true

// 🛰 providers
if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum')
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet", INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
const scaffoldEthProvider =
  null && navigator.onLine
    ? new ethers.providers.StaticJsonRpcProvider(
        'https://rpc.scaffoldeth.io:48544'
      )
    : null
const poktMainnetProvider = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider(
      'https://eth-mainnet.gateway.pokt.network/v1/lb/611156b4a585a20035148406'
    )
  : null
const mainnetInfura = navigator.onLine
  ? new ethers.providers.StaticJsonRpcProvider(
      'https://mainnet.infura.io/v3/' + INFURA_ID
    )
  : null
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I )

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = targetNetwork.rpcUrl
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER
  ? process.env.REACT_APP_PROVIDER
  : localProviderUrl
if (DEBUG) console.log('🏠 Connecting to provider:', localProviderUrlFromEnv)
const localProvider = new ethers.providers.StaticJsonRpcProvider(
  localProviderUrlFromEnv
)

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer

// Coinbase walletLink init
const walletLink = new WalletLink({
  appName: 'coinbase'
})

// WalletLink provider
const walletLinkProvider = walletLink.makeWeb3Provider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`,
  1
)

// Web3 modal helps us "connect" external wallets:
const web3Modal = new Web3Modal({
  network: 'mainnet', // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
  cacheProvider: true, // optional
  theme: 'light', // optional. Change to "dark" for a dark theme.
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        bridge: 'https://polygon.bridge.walletconnect.org',
        infuraId: INFURA_ID,
        rpc: {
          1: `https://mainnet.infura.io/v3/${INFURA_ID}`, // mainnet // For more WalletConnect providers: https://docs.walletconnect.org/quick-start/dapps/web3-provider#required
          100: 'https://dai.poa.network' // xDai
        }
      }
    },
    /*
    torus: {
      package: Torus,
    },
    */
    'custom-walletlink': {
      display: {
        logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
        name: 'Coinbase',
        description: 'Connect to Coinbase Wallet (not Coinbase App)'
      },
      package: walletLinkProvider,
      connector: async (provider, options) => {
        await provider.enable()
        return provider
      }
    }
  }
})

function App() {
  const mainnetProvider =
    poktMainnetProvider && poktMainnetProvider._isProvider
      ? poktMainnetProvider
      : scaffoldEthProvider && scaffoldEthProvider._network
      ? scaffoldEthProvider
      : mainnetInfura

  const [injectedProvider, setInjectedProvider] = useState()
  const [address, setAddress] = useState()

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider()
    if (
      injectedProvider &&
      injectedProvider.provider &&
      typeof injectedProvider.provider.disconnect == 'function'
    ) {
      await injectedProvider.provider.disconnect()
    }
    setTimeout(() => {
      window.location.reload()
    }, 1)
  }

  // 💵 This hook will get the price of ETH from 🦄 Uniswap:
  const ethPriceDollar = useExchangePrice(targetNetwork, mainnetProvider)

  // 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation
  const gasPrice = useGasPrice(targetNetwork, 'fast')

  // Use your injected provider from 🦊 Metamask
  const userSigner = useUserSigner(injectedProvider)

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        const newAddress = await userSigner.getAddress()
        setAddress(newAddress)
      }
    }
    getAddress()
  }, [userSigner])

  // You can warn the user if you would like them to be on a specific network
  const localChainId =
    localProvider && localProvider._network && localProvider._network.chainId
  const selectedChainId =
    userSigner &&
    userSigner.provider &&
    userSigner.provider._network &&
    userSigner.provider._network.chainId

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice)

  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(localProvider, gasPrice)

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address)

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address)

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider)

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, {
    chainId: localChainId
  })

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  const mainnetContracts = useContractLoader(mainnetProvider)

  // If you want to call a function on a new block
  useOnBlock(mainnetProvider, () => {
    console.log(
      `⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`
    )
  })

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts &&
      mainnetContracts
    ) {
      console.log(
        '_____________________________________ 🏗 scaffold-eth _____________________________________'
      )
      console.log('🌎 mainnetProvider', mainnetProvider)
      console.log('🏠 localChainId', localChainId)
      console.log('👩‍💼 selected address:', address)
      console.log('🕵🏻‍♂️ selectedChainId:', selectedChainId)
      console.log(
        '💵 yourLocalBalance',
        yourLocalBalance ? ethers.utils.formatEther(yourLocalBalance) : '...'
      )
      console.log(
        '💵 yourMainnetBalance',
        yourMainnetBalance
          ? ethers.utils.formatEther(yourMainnetBalance)
          : '...'
      )
      console.log('📝 readContracts', readContracts)
      console.log('🌍 DAI contract on mainnet:', mainnetContracts)
      console.log('🔐 writeContracts', writeContracts)
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    yourLocalBalance,
    yourMainnetBalance,
    readContracts,
    writeContracts,
    mainnetContracts
  ])

  let networkDisplay = ''
  if (
    NETWORKCHECK &&
    localChainId &&
    selectedChainId &&
    localChainId !== selectedChainId
  ) {
    const networkSelected = NETWORK(selectedChainId)
    const networkLocal = NETWORK(localChainId)
    if (selectedChainId === 1337 && localChainId === 31337) {
      networkDisplay = (
        <div
          style={{
            zIndex: 2,
            position: 'absolute',
            right: 0,
            top: 60,
            padding: 16
          }}
        >
          <Alert
            message='⚠️ Wrong Network ID'
            description={
              <div>
                You have <b>chain id 1337</b> for localhost and you need to
                change it to <b>31337</b> to work with HardHat.
                <div>
                  (MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt;
                  31337)
                </div>
              </div>
            }
            type='error'
            closable={false}
          />
        </div>
      )
    } else {
      networkDisplay = (
        <>
          <Alert
            message='⚠️ Wrong Network'
            description={
              <div>
                You have <b>{networkSelected && networkSelected.name}</b>{' '}
                selected and you need to be on{' '}
                <Button
                  onClick={async () => {
                    const ethereum = window.ethereum
                    const data = [
                      {
                        chainId: '0x' + targetNetwork.chainId.toString(16),
                        chainName: targetNetwork.name,
                        nativeCurrency: targetNetwork.nativeCurrency,
                        rpcUrls: [targetNetwork.rpcUrl],
                        blockExplorerUrls: [targetNetwork.blockExplorer]
                      }
                    ]
                    console.log('data', data)
                    const tx = await ethereum
                      .request({
                        method: 'wallet_addEthereumChain',
                        params: data
                      })
                      .catch()
                    if (tx) {
                      console.log(tx)
                    }
                  }}
                >
                  <b>{networkLocal && networkLocal.name}</b>
                </Button>
                .
              </div>
            }
            type='error'
            closable={false}
          />
        </>
      )
    }
  } else {
    networkDisplay = (
      <div
        style={{
          color: targetNetwork.color
        }}
      >
        {targetNetwork.name}
      </div>
    )
  }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect()
    setInjectedProvider(new ethers.providers.Web3Provider(provider))

    provider.on('chainChanged', chainId => {
      console.log(`chain changed to ${chainId}! updating providers`)
      setInjectedProvider(new ethers.providers.Web3Provider(provider))
    })

    provider.on('accountsChanged', () => {
      console.log('account changed!')
      setInjectedProvider(new ethers.providers.Web3Provider(provider))
    })

    // Subscribe to session disconnection
    provider.on('disconnect', (code, reason) => {
      console.log(code, reason)
      logoutOfWeb3Modal()
    })
  }, [setInjectedProvider])

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal()
    }
  }, [loadWeb3Modal])

  const favoritedIdsStore = persistantStore.get('favoritedIds') || []

  const [favoritedIds, setFavoritedIds] = useState(favoritedIdsStore)

  const checkIfIsFavorite = _tokenId => {
    _tokenId = parseInt(_tokenId)
    const _favoritedIds = persistantStore.get('favoritedIds') || []
    return _favoritedIds.includes(_tokenId)
  }

  const updateFavorites = _tokenId => {
    _tokenId = parseInt(_tokenId)
    let _favoritedIds = persistantStore.get('favoritedIds') || []
    if (_favoritedIds.includes(_tokenId)) {
      _favoritedIds = _favoritedIds.filter(val => val !== _tokenId)
    } else {
      _favoritedIds.push(_tokenId)
    }
    persistantStore.set('favoritedIds', _favoritedIds)
    setFavoritedIds(_favoritedIds)
  }

  const [sidebarLeftOpen, setSidebarLeftOpen] = useState(false)

  console.log({ sidebarLeftOpen })

  return (
    <div id='App'>
      <BrowserRouter>
        <SidebarLeft open={sidebarLeftOpen} />

        <Header
          setSidebarLeftOpen={setSidebarLeftOpen}
          sidebarLeftOpen={sidebarLeftOpen}
          address={address}
          localProvider={localProvider}
          userSigner={userSigner}
          mainnetProvider={mainnetProvider}
          price={ethPriceDollar}
          blockExplorer={blockExplorer}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          networkDisplay={networkDisplay}
        />

        <div
          style={{
            marginTop: 48
          }}
        >
          <Routes
            address={address}
            userSigner={userSigner}
            mainnetProvider={mainnetProvider}
            localProvider={localProvider}
            yourLocalBalance={yourLocalBalance}
            favorites={{
              favoritedIds,
              checkIfIsFavorite,
              updateFavorites
            }}
            price={ethPriceDollar}
            gasPrice={gasPrice}
            tx={tx}
            writeContracts={writeContracts}
            readContracts={readContracts}
            blockExplorer={blockExplorer}
          />
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
