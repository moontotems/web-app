import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink'
import { ethers } from 'ethers'

import persistantStore from 'store'
import _ from 'underscore'

import Routes from './Routes'
import { Header, SidebarLeft, Footer } from './layout'
import { NetworkDisplay } from './sharedComponents'
import FILTERS from './sharedComponents/FilterDropdown/filters'
import {
  INFURA_ID,
  NETWORK,
  NETWORKS,
  MIN_TOKEN_ID,
  MAX_TOKEN_ID,
  HEADER_HEIGHT
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

import houdini_json_hashmap from './assets/houdini_json_hashmap.json'

import './themes/configs.js'

// 📡 What chain are your contracts deployed to?
//const targetNetwork = NETWORKS.localhost // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
//const targetNetwork = NETWORKS.rinkeby
//const targetNetwork = NETWORKS.ropsten
const targetNetwork = NETWORKS.mainnet

// 😬 Sorry for all the console logging
const DEBUG = false
const NETWORKCHECK = true

// 🛰 providers
//if (DEBUG) console.log('📡 Connecting to Mainnet Ethereum')
//const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
//const mainnetProvider = new InfuraProvider("mainnet", INFURA_ID);

// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
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

  const mainnetContracts = useContractLoader(mainnetProvider)

  /*
  useOnBlock(mainnetProvider, () => {
    console.log(
      `⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`
    )
  })
  */

  // 🧫 DEBUG 👨🏻‍🔬
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
  const [usersCreaturesTokenIds, setUsersCreaturesTokenIds] = useState([])
  const [balanceOfUser, setBalanceOfUser] = useState(0)

  const fetchUsersCreatures = async () => {
    console.log('now fetching users creatures...')
    try {
      if (readContracts) {
        let balanceOf = await readContracts.MoonTotems.balanceOf(address)
        console.log({ address })
        balanceOf = parseInt(balanceOf.toString()) || 0
        console.log({ balanceOf })
        setBalanceOfUser(balanceOf)

        const usersCreaturesUpdate = []
        const usersCreaturesTokenIds = []
        for (let tokenIndex = 0; tokenIndex < balanceOf; tokenIndex++) {
          let tokenId = await readContracts.MoonTotems.tokenOfOwnerByIndex(
            address,
            tokenIndex
          )
          tokenId = parseInt(tokenId.toString())
          /*
            const tokenURI =  await readContracts.MoonTotems.tokenURI(tokenId)
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
          usersCreaturesTokenIds.push(tokenId)
        }

        setUsersCreatures(usersCreaturesUpdate)
        setUsersCreaturesTokenIds(usersCreaturesTokenIds)
      }
    } catch (e) {
      console.error(e)
    }
  }

  /*
  useEffect(() => {
    // reduce number of infura calls
    //if (route.includes('moontotem') || route.includes('wallet')) {
    console.log('now fetching users creatures...')
    fetchUsersCreatures()
    //}
  }, [])
  */

  useEffect(() => {
    console.log('in useEffect about to call fetchUsersCreatures()')
    fetchUsersCreatures()
  }, [address, readContracts])

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

  const removeFilter = _filter => {
    let _filters = activeFilters
    _filters = _filters.filter(filter => filter !== _filter)
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

  const [showGridView, setShowGridView] = useState(true)

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
    const image = getImageUrl({ tokenId, size: 512 })

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

  ///
  const creatureIndexList = Array.from(Array(MAX_TOKEN_ID + 1).keys())
  const [shuffledCreatureIndexList, setShuffledCreatureIndexList] = useState(
    _.shuffle(creatureIndexList)
  )

  const shuffleCreatureIndexList = () => {
    setShuffledCreatureIndexList(_.shuffle(creatureIndexList))
  }
  ///

  // assemble all creature objects
  const assembleAllCreatureLists = () => {
    const all = []
    const minted = []
    const notMinted = []
    const favorited = []
    const favoritedAndMinted = []
    const favoritedAndNotMinted = []
    const notFavorited = []
    const users = []
    const notUsers = []
    const usersAndFavorited = []

    shuffledCreatureIndexList.map((randomId, index) => {
      const creature = assembleCreature(randomId)

      all.push(creature)
      if (creature.minted) minted.push(creature)
      if (!creature.minted) notMinted.push(creature)
      if (creature.isFavorite) favorited.push(creature)
      if (!creature.isFavorite) notFavorited.push(creature)
      if (creature.ownedByUser) users.push(creature)
      if (!creature.ownedByUser) notUsers.push(creature)

      if (creature.isFavorite && creature.minted)
        favoritedAndMinted.push(creature)
      if (creature.isFavorite && !creature.minted)
        favoritedAndNotMinted.push(creature)
      if (creature.ownedByUser && creature.isFavorite)
        usersAndFavorited.push(creature)
    })

    return {
      all,
      minted,
      notMinted,
      favorited,
      favoritedAndMinted,
      favoritedAndNotMinted,
      notFavorited,
      users,
      notUsers,
      usersAndFavorited
    }
  }

  const removeMintedCreatures = ({ creatures }) =>
    _.filter([...creatures], creature => !creature.minted)

  const removeNotMintedCreatures = ({ creatures }) =>
    _.filter([...creatures], creature => creature.minted)

  const removeFavoritedCreatures = ({ creatures }) =>
    _.filter([...creatures], creature => !creature.isFavorite)

  const removeNotFavoritedCreatures = ({ creatures }) =>
    _.filter([...creatures], creature => creature.isFavorite)

  const applyFiltersToCreatures = creatureLists => {
    const {
      all,
      minted,
      notMinted,
      favorited,
      notFavorited,
      favoritedAndMinted,
      favoritedAndNotMinted,
      users,
      notUsers,
      usersAndFavorited
    } = creatureLists

    /*
      minted,
      notMinted,
      favorited,
      notFavorited,
      favoritedAndMinted,
      favoritedAndNotMinted,
      users,
      notUsers,
      usersAndFavorited,

      - all totems
      - not minted totems
      - minted totems
      - favorited totems
      - favorited totems + minted totems
      - favorited totems + not minted totems
      - my totems
      - my totems + favorited
     */

    let creatures = []

    // all totems
    if (activeFilters.length === 0) {
      creatures = all
    }
    // not minted totems
    if (filterIsActive(FILTERS.notMinted)) {
      creatures = notMinted
    }
    // minted totems
    if (filterIsActive(FILTERS.minted)) {
      creatures = minted
    }

    // favorited totems
    if (filterIsActive(FILTERS.favorites)) {
      creatures = favorited
    }

    // favorited totems + minted totems
    if (filterIsActive(FILTERS.favorites) && filterIsActive(FILTERS.minted)) {
      creatures = favoritedAndMinted
    }

    // favorited totems + not minted totems
    if (
      filterIsActive(FILTERS.favorites) &&
      filterIsActive(FILTERS.notMinted)
    ) {
      creatures = favoritedAndNotMinted
    }

    // my totems
    if (filterIsActive(FILTERS.myMoonTotems)) {
      creatures = users
    }

    // my totems + favorited
    if (
      filterIsActive(FILTERS.myMoonTotems) &&
      filterIsActive(FILTERS.favorites)
    ) {
      creatures = usersAndFavorited
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

  const creatureLists = assembleAllCreatureLists()
  const filteredCreatures = applyFiltersToCreatures(creatureLists)
  const visibleCreatures = getVisibleCreatures(filteredCreatures)

  const infiniteScroll = {
    visibleCreaturesRangeStart,
    setVisibleCreaturesRangeStart,
    visibleCreaturesRangeEnd,
    setVisibleCreaturesRangeEnd,
    next: () => {
      setVisibleCreaturesRangeEnd(visibleCreaturesRangeEnd + 48)
    },
    hasMore: () => {
      return filteredCreatures.length > visibleCreaturesRangeEnd
    }
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

  const activateMinting = async () => {
    console.log('activateMinting:')

    try {
      const result = await tx(writeContracts.MoonTotems.flipMintFlag())
      console.log({ result })
    } catch (e) {
      console.log(e)
    }
  }

  const mint = async (to, tokenId) => {
    const value = ethers.utils.parseEther('0.05')
    console.log('mint:')
    console.log({ to, tokenId, value })

    try {
      const mintResult = await tx(
        writeContracts.MoonTotems.mint(to, tokenId, {
          gasPrice,
          gasLimit: 170000,
          value
          // nonce:
        })
      )
      console.log({ mintResult })
      if (mintResult?.value?._isBigNumber) {
        persistantStore.set(`show-fresh-mint-message-${tokenId}`, true)
      }
      fetchUsersCreatures()
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
    userSigner,
    //yourLocalBalance,
    ethPriceDollar,
    gasPrice,
    tx,
    readContracts,
    writeContracts,
    web3Modal,
    loadWeb3Modal,
    logoutOfWeb3Modal,
    blockExplorer
  }

  const nftAppProps = {
    isMobile,
    route,
    setRoute,
    creatureLists,
    filteredCreatures,
    visibleCreatures,
    shuffledCreatureIndexList,
    shuffleCreatureIndexList,
    usersCreaturesTokenIds,
    assembleCreature,
    applyFiltersToCreatures,
    checkIfCreatureIsOwnedByUser,
    fetchUsersCreatures,
    updateFavorites,
    // TODO: remove this -> it is available in creatureLists
    favorites,
    infiniteScroll,
    mintEvents,
    mintEventsMap,
    mint,
    showGridView,
    showListView: !showGridView,
    setShowGridView,
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
    <div id='App' style={{ height: '100%', overflowY: 'hidden' }}>
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
        />

        <div
          style={{
            marginTop: HEADER_HEIGHT,
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`
          }}
          onClick={() => setSidebarLeftOpen(false)}
        >
          <Routes ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
        </div>

        {!route.includes('moontotem') && (
          <div style={{ float: 'left', width: '100%', zIndex: 1000 }}>
            <Footer ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
          </div>
        )}
      </BrowserRouter>

      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live='assertive'
        className='fixed inset-0 flex items-start px-4 pt-20 pb-6 pointer-events-none'
      >
        <div className='w-full flex flex-col items-end space-y-4'>
          {/* alert if wrong network is selected */}
          <NetworkDisplay
            NETWORKCHECK={NETWORKCHECK}
            localChainId={localChainId}
            selectedChainId={selectedChainId}
            targetNetwork={targetNetwork}
          />
        </div>
      </div>
    </div>
  )
}

export default App
