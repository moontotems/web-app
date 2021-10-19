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
    isMobile
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
  if (!filterIsActive(FILTERS.favorites)) {
    console.log('now rendering shuffled')
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
  } else {
    creatureList = creatures.visible
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
