import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { ActionSidebar, TotemGrid, TotemTable } from '~/lib/sharedComponents/nft'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { FILTERS } from '~/lib/nft/filters'

function WalletPage() {
  const {
    address,
    showGridView,
    setShowGridView,
    filters: { setActiveFilters },
  } = useMoonTotems()

  useEffect(() => {
    setActiveFilters([FILTERS.myMoonTotems])
    setShowGridView(true)
  }, [setActiveFilters, setShowGridView])

  if (!address) {
    return <div className="mt-[10%] text-center text-xl">Please connect wallet.</div>
  }

  return (
    <>
      {showGridView ? <TotemGrid /> : <TotemTable />}
      <ActionSidebar />
    </>
  )
}

export const Route = createFileRoute('/_nft/wallet/')({
  component: WalletPage,
})
