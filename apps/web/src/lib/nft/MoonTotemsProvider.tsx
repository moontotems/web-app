import {
  MAX_TOKEN_ID,
  MINT_PRICE_ETH,
  getMoonTotemsAddress,
  moonTotemsAbi,
} from '@moontotems/contracts'
import { useRouterState } from '@tanstack/react-router'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { toast } from 'sonner'
import { parseEther } from 'viem'
import { useAccount, useChainId, usePublicClient, useWriteContract } from 'wagmi'

import { ETHERSCAN_BASE } from '~/lib/constants'
import { getImageUrl } from '~/lib/nft/image-url'
import { targetChainId } from '~/lib/web3/config'

import { FILTERS, type FilterId } from './filters'
import { setFreshMintFlag } from './fresh-mint'
import { shuffle } from './shuffle'
import type { MoonTotem } from './types'
import { useFavorites } from './use-favorites'
import { useIsMobile } from './use-is-mobile'
import { useMintEvents } from './use-mint-events'
import { useUserTotems } from './use-moon-totems'

const INITIAL_VISIBLE_COUNT = 28
const VISIBLE_INCREMENT = 48

export type FeaturePanelId = 'metaData' | 'chat' | 'story' | 'actions' | 'download' | 'mintTo'

export type MoonTotemsContextValue = {
  isMobile: boolean
  route: string

  headerTitle: string
  setHeaderTitle: (title: string) => void
  sidebarLeftOpen: boolean
  setSidebarLeftOpen: (open: boolean) => void

  showGridView: boolean
  setShowGridView: (grid: boolean) => void

  filters: {
    activeFilters: FilterId[]
    setActiveFilters: (filters: FilterId[]) => void
    addFilter: (filter: FilterId) => void
    removeFilter: (filter: FilterId) => void
    toggleFilter: (filter: FilterId) => void
    filterIsActive: (filter: FilterId) => boolean
  }

  favorites: {
    favoritedIds: number[]
    isFavorite: (tokenId: number) => boolean
    toggleFavorite: (tokenId: number) => void
  }

  shuffledIds: number[]
  shuffleIds: () => void

  mintedIds: Set<number>
  /** Token ids from Mint events, most recent first. */
  mintEventTokenIds: number[]
  usersTokenIds: number[]
  refetchUserTotems: () => Promise<void>

  assembleMoonTotem: (tokenId: number) => MoonTotem
  filteredMoonTotems: MoonTotem[]
  visibleMoonTotems: MoonTotem[]
  infiniteScroll: {
    visibleEnd: number
    next: () => void
    hasMore: boolean
    reset: () => void
  }

  mint: (tokenId: number, to?: `0x${string}`) => Promise<boolean>
  transfer: (tokenId: number, to: `0x${string}`) => Promise<boolean>
  isTransacting: boolean

  featurePanels: Record<FeaturePanelId, boolean>
  toggleFeaturePanel: (panel: FeaturePanelId) => void
  closeFeaturePanels: () => void

  address: `0x${string}` | undefined
  isConnected: boolean
  contractAddress: `0x${string}` | undefined
  blockExplorer: string
}

const MoonTotemsContext = createContext<MoonTotemsContextValue | null>(null)

const ALL_TOKEN_IDS = Array.from({ length: MAX_TOKEN_ID + 1 }, (_, i) => i)

const INITIAL_FEATURE_PANELS: Record<FeaturePanelId, boolean> = {
  metaData: false,
  chat: false,
  story: false,
  actions: false,
  download: false,
  mintTo: false,
}

export function MoonTotemsProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile()
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()

  const effectiveChainId = chainId || targetChainId
  const contractAddress = getMoonTotemsAddress(effectiveChainId)
  const blockExplorer = effectiveChainId === 1 ? `${ETHERSCAN_BASE}/` : ''

  const route = useRouterState({ select: (s) => s.location.pathname })

  const [sidebarLeftOpen, setSidebarLeftOpen] = useState(false)
  const [headerTitle, setHeaderTitle] = useState('')
  const [showGridView, setShowGridView] = useState(true)
  const [activeFilters, setActiveFilters] = useState<FilterId[]>([])
  const [isTransacting, setIsTransacting] = useState(false)
  const [featurePanels, setFeaturePanels] = useState(INITIAL_FEATURE_PANELS)

  const { favoritedIds, isFavorite, toggleFavorite } = useFavorites()
  const { tokenIds: usersTokenIds, refetch: refetchUserTotems } = useUserTotems()
  const { mintEventTokenIds, appendMintEvent } = useMintEvents(contractAddress)

  const [shuffledIds, setShuffledIds] = useState<number[]>(ALL_TOKEN_IDS)

  // Shuffle only on the client to keep SSR deterministic.
  useEffect(() => {
    setShuffledIds(shuffle(ALL_TOKEN_IDS))
  }, [])

  const shuffleIds = useCallback(() => {
    setShuffledIds(shuffle(ALL_TOKEN_IDS))
  }, [])

  const mintedIds = useMemo(() => {
    const set = new Set<number>(mintEventTokenIds)
    for (const id of usersTokenIds) set.add(id)
    return set
  }, [mintEventTokenIds, usersTokenIds])

  const addFilter = useCallback((filter: FilterId) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev : [...prev, filter]))
  }, [])

  const removeFilter = useCallback((filter: FilterId) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter))
  }, [])

  const filterIsActive = useCallback(
    (filter: FilterId) => activeFilters.includes(filter),
    [activeFilters],
  )

  const toggleFilter = useCallback(
    (filter: FilterId) => {
      if (filterIsActive(filter)) removeFilter(filter)
      else addFilter(filter)
    },
    [filterIsActive, removeFilter, addFilter],
  )

  const usersTokenIdSet = useMemo(() => new Set(usersTokenIds), [usersTokenIds])
  const favoritedIdSet = useMemo(() => new Set(favoritedIds), [favoritedIds])

  const assembleMoonTotem = useCallback(
    (tokenId: number): MoonTotem => {
      const id = Number(tokenId)
      return {
        tokenId: id,
        image: getImageUrl({ tokenId: id, size: 512 }),
        isFavorite: favoritedIdSet.has(id),
        minted: mintedIds.has(id),
        ownedByUser: usersTokenIdSet.has(id),
      }
    },
    [favoritedIdSet, mintedIds, usersTokenIdSet],
  )

  const filteredMoonTotems = useMemo(() => {
    const wantsMinted = activeFilters.includes(FILTERS.minted)
    const wantsNotMinted = activeFilters.includes(FILTERS.notMinted)
    const wantsFavorites = activeFilters.includes(FILTERS.favorites)
    const wantsUsers = activeFilters.includes(FILTERS.myMoonTotems)

    const result: MoonTotem[] = []
    for (const id of shuffledIds) {
      const moonTotem = assembleMoonTotem(id)
      if (wantsMinted && !moonTotem.minted) continue
      if (wantsNotMinted && moonTotem.minted) continue
      if (wantsFavorites && !moonTotem.isFavorite) continue
      if (wantsUsers && !moonTotem.ownedByUser) continue
      result.push(moonTotem)
    }
    return result
  }, [shuffledIds, assembleMoonTotem, activeFilters])

  const [visibleEnd, setVisibleEnd] = useState(INITIAL_VISIBLE_COUNT)

  const visibleMoonTotems = useMemo(
    () => filteredMoonTotems.slice(0, visibleEnd),
    [filteredMoonTotems, visibleEnd],
  )

  const infiniteScroll = useMemo(
    () => ({
      visibleEnd,
      next: () => setVisibleEnd((end) => end + VISIBLE_INCREMENT),
      hasMore: filteredMoonTotems.length > visibleEnd,
      reset: () => setVisibleEnd(INITIAL_VISIBLE_COUNT),
    }),
    [visibleEnd, filteredMoonTotems.length],
  )

  const mint = useCallback(
    async (tokenId: number, to?: `0x${string}`) => {
      if (!contractAddress) {
        toast.error('MoonTotems contract not configured for this network')
        return false
      }
      const recipient = to ?? address
      if (!recipient) {
        toast.error('Connect a wallet to mint')
        return false
      }
      setIsTransacting(true)
      try {
        const hash = await writeContractAsync({
          address: contractAddress,
          abi: moonTotemsAbi,
          functionName: 'mint',
          args: [recipient, BigInt(tokenId)],
          value: parseEther(MINT_PRICE_ETH),
        })
        toast.info(`Mint transaction sent: ${hash.slice(0, 14)}...`)
        await publicClient?.waitForTransactionReceipt({ hash })
        toast.success(`Totem #${tokenId} minted!`)
        setFreshMintFlag(tokenId)
        appendMintEvent(tokenId)
        await refetchUserTotems()
        return true
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Mint failed'
        toast.error(message.split('\n')[0]?.slice(0, 200) ?? 'Mint failed')
        return false
      } finally {
        setIsTransacting(false)
      }
    },
    [
      address,
      appendMintEvent,
      contractAddress,
      publicClient,
      refetchUserTotems,
      writeContractAsync,
    ],
  )

  const transfer = useCallback(
    async (tokenId: number, to: `0x${string}`) => {
      if (!contractAddress || !address) {
        toast.error('Connect a wallet to transfer')
        return false
      }
      setIsTransacting(true)
      try {
        const hash = await writeContractAsync({
          address: contractAddress,
          abi: moonTotemsAbi,
          functionName: 'transferFrom',
          args: [address, to, BigInt(tokenId)],
        })
        toast.info(`Transfer transaction sent: ${hash.slice(0, 14)}...`)
        await publicClient?.waitForTransactionReceipt({ hash })
        toast.success(`Totem #${tokenId} transferred`)
        await refetchUserTotems()
        return true
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Transfer failed'
        toast.error(message.split('\n')[0]?.slice(0, 200) ?? 'Transfer failed')
        return false
      } finally {
        setIsTransacting(false)
      }
    },
    [address, contractAddress, publicClient, refetchUserTotems, writeContractAsync],
  )

  // Opening a panel closes all others (legacy toggleFeature behavior)
  const toggleFeaturePanel = useCallback((panel: FeaturePanelId) => {
    setFeaturePanels((prev) => ({
      ...INITIAL_FEATURE_PANELS,
      [panel]: !prev[panel],
    }))
  }, [])

  const closeFeaturePanels = useCallback(() => {
    setFeaturePanels(INITIAL_FEATURE_PANELS)
  }, [])

  const value = useMemo<MoonTotemsContextValue>(
    () => ({
      isMobile,
      route,
      headerTitle,
      setHeaderTitle,
      sidebarLeftOpen,
      setSidebarLeftOpen,
      showGridView,
      setShowGridView,
      filters: {
        activeFilters,
        setActiveFilters,
        addFilter,
        removeFilter,
        toggleFilter,
        filterIsActive,
      },
      favorites: { favoritedIds, isFavorite, toggleFavorite },
      shuffledIds,
      shuffleIds,
      mintedIds,
      mintEventTokenIds,
      usersTokenIds,
      refetchUserTotems,
      assembleMoonTotem,
      filteredMoonTotems,
      visibleMoonTotems,
      infiniteScroll,
      mint,
      transfer,
      isTransacting,
      featurePanels,
      toggleFeaturePanel,
      closeFeaturePanels,
      address,
      isConnected,
      contractAddress,
      blockExplorer,
    }),
    [
      isMobile,
      route,
      headerTitle,
      sidebarLeftOpen,
      showGridView,
      activeFilters,
      addFilter,
      removeFilter,
      toggleFilter,
      filterIsActive,
      favoritedIds,
      isFavorite,
      toggleFavorite,
      shuffledIds,
      shuffleIds,
      mintedIds,
      mintEventTokenIds,
      usersTokenIds,
      refetchUserTotems,
      assembleMoonTotem,
      filteredMoonTotems,
      visibleMoonTotems,
      infiniteScroll,
      mint,
      transfer,
      isTransacting,
      featurePanels,
      toggleFeaturePanel,
      closeFeaturePanels,
      address,
      isConnected,
      contractAddress,
      blockExplorer,
    ],
  )

  return <MoonTotemsContext.Provider value={value}>{children}</MoonTotemsContext.Provider>
}

export function useMoonTotems(): MoonTotemsContextValue {
  const ctx = useContext(MoonTotemsContext)
  if (!ctx) {
    throw new Error('useMoonTotems must be used within MoonTotemsProvider')
  }
  return ctx
}
