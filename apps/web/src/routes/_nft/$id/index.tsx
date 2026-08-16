import { createFileRoute, redirect } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { Footer } from '~/lib/sharedComponents/layout'
import { ActionSidebar } from '~/lib/sharedComponents/nft/ActionSidebar'

import { MoonTotemDesktop } from './-components/MoonTotemDesktop'
import { MoonTotemMobile } from './-components/MoonTotemMobile'

/** MoonTotem detail page: desktop (zoom + keyboard nav) and mobile (swipe). */
export function MoonTotemPage({ tokenId }: { tokenId: number }) {
  const { isMobile } = useMoonTotems()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {isMobile ? (
        <MoonTotemMobile initialTokenId={tokenId} />
      ) : (
        <MoonTotemDesktop initialTokenId={tokenId} />
      )}

      <ActionSidebar />

      <div className="fixed bottom-0 left-0 z-1000 w-full">
        <Footer />
      </div>
    </>
  )
}

function MoonTotemRoute() {
  const { id } = Route.useParams()
  return <MoonTotemPage tokenId={Number.parseInt(id, 10)} />
}

export const Route = createFileRoute('/_nft/$id/')({
  beforeLoad: ({ params }) => {
    // Only treat pure numeric IDs as moonTotem shortcuts
    if (!/^\d+$/.test(params.id)) {
      throw redirect({ to: '/' })
    }
  },
  component: MoonTotemRoute,
})
