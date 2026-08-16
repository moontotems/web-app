import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { validateGallerySearch } from '~/lib/nft/gallery-search'
import { ActionSidebar, TotemGrid, TotemTable } from '~/lib/sharedComponents/nft'

export const Route = createFileRoute('/_nft/all/')({
  validateSearch: validateGallerySearch,
  component: AllPage,
})

function AllPage() {
  const search = Route.useSearch()
  const {
    showGridView,
    setShowGridView,
    setHeaderTitle,
    filters: { setActiveFilters },
  } = useMoonTotems()

  useEffect(() => {
    setHeaderTitle('')
  }, [setHeaderTitle])

  useEffect(() => {
    setShowGridView(search.view !== 'list')
    setActiveFilters(search.filters)
  }, [search.view, search.filters, setShowGridView, setActiveFilters])

  return (
    <>
      {showGridView ? <TotemGrid /> : <TotemTable />}
      <ActionSidebar />
    </>
  )
}
