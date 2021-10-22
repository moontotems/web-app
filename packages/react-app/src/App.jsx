import React, { useCallback, useEffect, useState } from 'react'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'

import { Alert, Button } from 'antd'
import { Loading } from 'carbon-components-react'

import { BrowserRouter } from 'react-router-dom'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import persistantStore from 'store'
import _ from 'underscore'

import Routes from './Routes'
import { Header, SidebarLeft, Footer } from './layout'
import FILTERS from './sharedComponents/FilterDropdown/filters'
import {
  INFURA_ID,
  NETWORK,
  NETWORKS,
  MIN_TOKEN_ID,
  MAX_TOKEN_ID,
  MOBILE_HEADER_HEIGHT,
  DESKTOP_HEADER_HEIGHT
} from './constants'
import { Transactor, getImageUrl, getRandomTokenIdsArray } from './helpers'
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useContractConfig,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserSigner
} from './hooks'

// contracts
//import deployedContracts from './contracts/hardhat_contracts.json'
//import externalContracts from './contracts/external_contracts'

import houdini_json_hashmap from './assets/houdini_json_hashmap.json'

import './themes/configs.js'

// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.localhost // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
//const targetNetwork = NETWORKS.rinkeby // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)

// 😬 Sorry for all the console logging
const DEBUG = false
const NETWORKCHECK = true

// 🛰 providers
//if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum')
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
  //const ethPriceDollar = useExchangePrice(targetNetwork, mainnetProvider)

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
  //const yourLocalBalance = useBalance(localProvider, address)

  // Just plug in different 🛰 providers to get your balance on different chains:
  //const yourMainnetBalance = useBalance(mainnetProvider, address)

  //const contractConfig = useContractConfig()

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
  /*
  useOnBlock(mainnetProvider, () => {
    console.log(
      `⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`
    )
  })
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      //yourLocalBalance &&
      //yourMainnetBalance &&
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
      /*
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
      */
      console.log('📝 readContracts', readContracts)
      console.log('🌍 DAI contract on mainnet:', mainnetContracts)
      console.log('🔐 writeContracts', writeContracts)
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    //yourLocalBalance,
    //yourMainnetBalance,
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

  //////

  /*
  const totalSupply =
    useContractReader(
      readContracts,
      'MoonTotems',
      'totalSupply'
    ) || {}
  */

  const [width, setWidth] = useState(window.innerWidth)
  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])
  const isMobile = width <= 768

  ///
  const [usersCreatures, setUsersCreatures] = useState([])
  const [balanceOfUser, setBalanceOfUser] = useState(0)

  useEffect(() => {
    const getUsersCreatures = async () => {
      try {
        let balanceOf = await readContracts.MoonTotems.balanceOf(address)
        console.log({ address })
        balanceOf = parseInt(balanceOf.toString()) || 0
        console.log({ balanceOf })
        setBalanceOfUser(balanceOf)

        const usersCreaturesUpdate = []
        for (let tokenIndex = 0; tokenIndex < balanceOf; tokenIndex++) {
          console.log('now calling infura: tokenOfOwnerByIndex')
          let tokenId = await readContracts.MoonTotems.tokenOfOwnerByIndex(
            address,
            tokenIndex
          )
          tokenId = parseInt(tokenId.toString())
          console.log({ tokenId })
          /*
          const tokenURI =
            await readContracts.MoonTotems.tokenURI(tokenId)
          console.log('tokenURI', tokenURI)
          */

          //const ipfsHash = tokenURI.replace('https://ipfs.io/ipfs/', '')
          //console.log('ipfsHash', ipfsHash)

          //const jsonManifestBuffer = await getFromIPFS(ipfsHash)

          //const jsonManifest = JSON.parse(jsonManifestBuffer.toString())
          //console.log('jsonManifest', jsonManifest)
          const creature = assembleCreature(tokenId)
          usersCreaturesUpdate.push({
            ...creature,
            ownedByUser: true,
            minted: true
          })
        }

        setUsersCreatures(usersCreaturesUpdate)
      } catch (e) {
        console.error(e)
      }
    }
    // reduce number of infura calls
    if (route.includes('moontotem') || route.includes('wallet')) {
      getUsersCreatures()
    }
  }, [address])

  const usersCreaturesTokenIds = usersCreatures.map(
    creature => creature.tokenId
  )

  const checkIfCreatureIsOwnedByUser = _tokenId =>
    usersCreaturesTokenIds.includes(parseInt(_tokenId))
  ///

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
  const [activeFilters, setActiveFilters] = useState([])

  const addFilter = filter => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = filter => {
    let _filters = activeFilters
    _filters = _filters.filter(e => e !== filter)
    setActiveFilters([..._filters])
  }

  const toggleFilter = filter => {
    if (filterIsActive(filter)) {
      removeFilter(filter)
    } else {
      addFilter(filter)
    }
  }

  const filterIsActive = filter => activeFilters.includes(filter)

  const [showGrid, setShowGrid] = useState(true)

  // TODO: reduce number of calls
  const mintEvents = useEventListener(
    readContracts,
    'MoonTotems',
    'Mint',
    localProvider,
    1
  )

  const mintEventsMap = {}
  mintEvents.map(mintEvent => {
    mintEventsMap[mintEvent._tokenId] = mintEvent
    // convert _tokenId from bigNumber to string
    mintEventsMap[mintEvent._tokenId]['1'] =
      mintEventsMap[mintEvent._tokenId]['1'].toString()
  })

  let initialValue_visibleCreaturesRangeStart = 0

  let initialValue_visibleCreaturesRangeEnd =
    initialValue_visibleCreaturesRangeStart + 27 // TODO: test if result%3 === 0

  const [visibleCreaturesRangeStart, setVisibleCreaturesRangeStart] = useState(
    initialValue_visibleCreaturesRangeStart
  )
  const [visibleCreaturesRangeEnd, setVisibleCreaturesRangeEnd] = useState(
    initialValue_visibleCreaturesRangeEnd
  )

  const assembleCreature = tokenId => {
    const minted = !!mintEventsMap[tokenId]
    const ownedByUser = checkIfCreatureIsOwnedByUser(tokenId)
    const isFavorite = checkIfIsFavorite(tokenId)
    const metaData = houdini_json_hashmap[tokenId]
    const image = getImageUrl(tokenId)

    const creature = {
      tokenId,
      metaData,
      image,
      isFavorite,
      minted,
      ownedByUser
    }
    return creature
  }

  // assemble all creature objects
  const assembleAllCreatures = () => {
    const creatures = []
    for (let tokenId = MIN_TOKEN_ID; tokenId <= MAX_TOKEN_ID; tokenId++) {
      creatures.push(assembleCreature(tokenId))
    }
    return creatures
  }

  const removeMintedCreatures = ({ creatures }) =>
    _.filter([...creatures], creature => !creature.minted)

  const removeNotMintedCreatures = ({ creatures }) =>
    _.filter([...creatures], creature => creature.minted)

  const removeFavoritedCreatures = ({ creatures }) =>
    _.filter([...creatures], creature => !creature.isFavorite)

  const removeNotFavoritedCreatures = ({ creatures }) =>
    _.filter([...creatures], creature => creature.isFavorite)

  const applyFiltersToCreatures = creatures => {
    if (activeFilters.length === 0) {
      return creatures
    }

    if (filterIsActive(FILTERS.minted)) {
      creatures = removeNotMintedCreatures({ creatures })
    }

    if (filterIsActive(FILTERS.favorites)) {
      creatures = removeNotFavoritedCreatures({ creatures })
    }

    return creatures
  }

  const getVisibleCreatures = creatures => {
    let _creatures = [...creatures]
    return _creatures.splice(
      visibleCreaturesRangeStart,
      visibleCreaturesRangeEnd
    )
  }

  const allCreatures = assembleAllCreatures()
  const filteredCreatures = applyFiltersToCreatures(allCreatures)
  const visibleCreatures = getVisibleCreatures(filteredCreatures)

  ///
  const creatureIndexList = Array.from(Array(MAX_TOKEN_ID).keys())
  const [shuffledCreatureIndexList, setShuffledCreatureIndexList] = useState(
    _.shuffle(creatureIndexList)
  )

  const shuffleCreatureIndexList = () => {
    setShuffledCreatureIndexList(_.shuffle(creatureIndexList))
  }
  ///

  const infiniteScroll = {
    visibleCreaturesRangeStart,
    setVisibleCreaturesRangeStart,
    visibleCreaturesRangeEnd,
    setVisibleCreaturesRangeEnd,
    next: () => {
      setVisibleCreaturesRangeEnd(visibleCreaturesRangeEnd + 50)
    },
    hasMore: visibleCreaturesRangeEnd < filteredCreatures.length
    /*
    loader: (
      <div
        style={{
          margin: '3rem auto',
          border: '2px solid #000000',
          width: '1rem'
        }}
      >
        <Loading
          active={true}
          withOverlay={false}
          small={true}
          //description={''}
          //className={''}
        />
      </div>
    )
    */
  }

  const mint = async tokenId => {
    const to = address
    const value = ethers.utils.parseEther('0.1')
    console.log({ to, tokenId, value })

    try {
      const mintResult = await tx(
        writeContracts.MoonTotems.mint(to, tokenId, {
          gasPrice,
          // gasLimit: 1000000
          value
          // nonce:
        })
      )
      console.log({ mintResult })
      persistantStore.set(`show-fresh-mint-message-${tokenId}`, true)
    } catch (e) {
      console.log(e)
    }
  }

  const [headerTitle, setHeaderTitle] = useState('')

  const [route, setRoute] = useState(window.location.pathname)
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute])

  const favorites = {
    favoritedIds,
    checkIfIsFavorite,
    updateFavorites
  }

  const ethereumProps = {
    address,
    mainnetProvider,
    localProvider,
    //yourLocalBalance,
    //ethPriceDollar,
    gasPrice,
    tx,
    readContracts,
    writeContracts
  }

  const nftAppProps = {
    isMobile,
    route,
    setRoute,
    creatures: {
      all: allCreatures,
      filtered: filteredCreatures,
      visible: visibleCreatures,
      users: usersCreatures
    },
    shuffledCreatureIndexList,
    shuffleCreatureIndexList,
    assembleCreature,
    checkIfCreatureIsOwnedByUser,
    updateFavorites,
    // TODO: move this into creatures: {}
    favorites,
    infiniteScroll,
    mintEvents,
    mintEventsMap,
    mint,
    showGrid,
    setShowGrid,
    filter: {
      setActiveFilters,
      addFilter,
      removeFilter,
      toggleFilter,
      filterIsActive,
      activeFilters
    },
    setHeaderTitle
  }

  return (
    <div id='App'>
      <BrowserRouter>
        <SidebarLeft
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          setSidebarLeftOpen={setSidebarLeftOpen}
          sidebarLeftOpen={sidebarLeftOpen}
        />

        <Header
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          sidebarLeftOpen={sidebarLeftOpen}
          setSidebarLeftOpen={setSidebarLeftOpen}
          headerTitle={headerTitle}
          setHeaderTitle={setHeaderTitle}
          userSigner={userSigner}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          blockExplorer={blockExplorer}
          networkDisplay={networkDisplay}
        />

        <div
          style={{
            marginTop: isMobile ? MOBILE_HEADER_HEIGHT : DESKTOP_HEADER_HEIGHT,
            minHeight: `calc(100vh - ${
              isMobile ? MOBILE_HEADER_HEIGHT : DESKTOP_HEADER_HEIGHT
            }px)`
          }}
          onClick={() => setSidebarLeftOpen(false)}
        >
          <Routes ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
        </div>

        <div style={{ float: 'left', width: '100%' }}>
          <Footer ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
