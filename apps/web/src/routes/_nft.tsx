import { Outlet, createFileRoute } from '@tanstack/react-router'

import { NftFooter, NftHeader, SidebarLeft } from '~/lib/components/nft'
import { MoonTotemsProvider, useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { HEADER_HEIGHT } from '~/lib/nft/constants'

function NftShell() {
  const { route, setSidebarLeftOpen } = useMoonTotems()

  const hideGlobalFooter = route.includes('moontotem') || /\/\d+$/.test(route || '')

  return (
    <div id="App" className="min-h-screen overflow-x-hidden bg-black text-white">
      <SidebarLeft />
      <NftHeader />

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

      {!hideGlobalFooter && <NftFooter />}
    </div>
  )
}

function NftLayout() {
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
