import React, { useEffect } from 'react'

import { ActionSidebar } from '../../sharedComponents'
import FILTERS from '../../sharedComponents/FilterDropdown/filters'
import AllPageDesktop from './desktop'
import AllPageMobile from './mobile'

export default function All({ ethereumProps, nftAppProps }) {
  const {
    creatureLists,
    filteredCreatures,
    visibleCreatures,

    shuffledCreatureIndexList,
    shuffleCreatureIndexList,
    filter: { activeFilters, filterIsActive },
    infiniteScroll,
    isMobile,
    showGridView,
    showListView
  } = nftAppProps

  return (
    <>
      <ActionSidebar ethereumProps={ethereumProps} nftAppProps={nftAppProps} />

      {!isMobile && (
        <AllPageDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}

      {isMobile && (
        <AllPageMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}
    </>
  )
}
