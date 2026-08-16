import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { ActionSidebar, TotemGrid, TotemTable } from '~/lib/sharedComponents/nft'
import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { FILTERS } from '~/lib/nft/filters'

function AllPage() {
  const {
    showGridView,
    setHeaderTitle,
    filters: { removeFilter },
  } = useMoonTotems()

  useEffect(() => {
    setHeaderTitle('')
    removeFilter(FILTERS.myMoonTotems)
  }, [setHeaderTitle, removeFilter])

  return (
    <>
      {showGridView ? <TotemGrid /> : <TotemTable />}
      <ActionSidebar />
    </>
  )
}

export const Route = createFileRoute('/_nft/all/')({
  component: AllPage,
})
