import { Outlet, createFileRoute } from '@tanstack/react-router'

import { MoonTotemsProvider, useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { HEADER_HEIGHT } from '~/lib/constants'
import { Footer, Header } from '~/lib/sharedComponents/layout'

import { SidebarLeft } from './_nft/-components/SidebarLeft'

const NftShell = () => {
  const { route, setSidebarLeftOpen } = useMoonTotems()

  const hideGlobalFooter =
    route === '/' ||
    route.includes('moontotem') ||
    route.includes('/explore') ||
    route.includes('/orbit') ||
    route.includes('/infinit-zoom-scroll') ||
    route.includes('/story-discover') ||
    route.includes('/games/') ||
    route.includes('/3d') ||
    /\/\d+$/.test(route || '')

  return (
    <div id="App" className="min-h-screen overflow-x-hidden bg-black text-white">
      <SidebarLeft />
      <Header />

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: click-away for the drawer */}
      <div
        style={{
          marginTop: HEADER_HEIGHT,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
        onClick={() => setSidebarLeftOpen(false)}
      >
        <Outlet />
      </div>

      {!hideGlobalFooter && <Footer />}
    </div>
  )
}

const NftLayout = () => {
  return (
    <div className="nft-theme dark">
      <MoonTotemsProvider>
        <NftShell />
      </MoonTotemsProvider>
    </div>
  )
}

export const Route = createFileRoute('/_nft')({
  // The NFT state layer reads window/localStorage and on-chain state
  ssr: false,
  component: NftLayout,
})
