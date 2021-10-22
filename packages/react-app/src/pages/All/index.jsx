import React, { useEffect } from 'react'

import { ActionSidebar } from '../../sharedComponents'
import FILTERS from '../../sharedComponents/FilterDropdown/filters'
import AllPageDesktop from './desktop'
import AllPageMobile from './mobile'

export default function All({ ethereumProps, nftAppProps }) {
  const {
    creatures,
    shuffledCreatureIndexList,
    shuffleCreatureIndexList,
    filter: { activeFilters, filterIsActive },
    infiniteScroll,
    isMobile,
    showGridView,
    showListView
  } = nftAppProps

  useEffect(() => {
    if (!filterIsActive(FILTERS.favorites)) {
      shuffleCreatureIndexList()
    }
  }, [])

  useEffect(() => {
    if (!filterIsActive(FILTERS.favorites)) {
      shuffleCreatureIndexList()
    }
  }, [activeFilters])

  let creatureList = []

  if (showListView) {
    if (filterIsActive(FILTERS.favorites)) {
      // dont shuffle favorites
      creatureList = creatures.filtered
    } else {
      // shuffle creatures
      let creaturesTemp = []
      creatureList = shuffledCreatureIndexList.map((randomIndex, index) =>
        creaturesTemp.push(creatures.all[randomIndex])
      )
      creatureList = creaturesTemp
    }
  } else if (showGridView) {
    if (filterIsActive(FILTERS.favorites)) {
      // always load all favorites
      // and dont shuffle them
      creatureList = creatures.visible
    } else {
      // shuffle creatures
      let creaturesTemp = []
      creatureList = shuffledCreatureIndexList.map((randomIndex, index) => {
        if (
          index > infiniteScroll.visibleCreaturesRangeStart &&
          index < infiniteScroll.visibleCreaturesRangeEnd
        ) {
          creaturesTemp.push(creatures.all[randomIndex])
        }
      })
      creatureList = creaturesTemp
    }
  }

  return (
    <>
      <ActionSidebar
        ethereumProps={ethereumProps}
        nftAppProps={nftAppProps}
        creatureList={creatureList}
      />

      {!isMobile && (
        <AllPageDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList}
        />
      )}

      {isMobile && (
        <AllPageMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList}
        />
      )}
    </>
  )
}
