import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { ActionSidebar, TotemGrid, TotemTable } from '~/lib/sharedComponents/nft'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { FILTERS } from '~/lib/nft/filters'

function FavoritesPage() {
  const {
    showGridView,
    filters: { setActiveFilters },
  } = useMoonTotems()

  useEffect(() => {
    setActiveFilters([FILTERS.favorites])
  }, [setActiveFilters])

  return (
    <>
      {showGridView ? <TotemGrid /> : <TotemTable />}
      <ActionSidebar />
    </>
  )
}

export const Route = createFileRoute('/_nft/favorites/')({
  component: FavoritesPage,
})
