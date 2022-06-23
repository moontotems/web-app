import React, { useEffect } from 'react'
import FILTERS from '../../sharedComponents/FilterDropdown/filters'

import GridView from './Grid'
import ListView from './List'

export default function All({ ethereumProps, nftAppProps }) {
  const { showGridView } = nftAppProps

  const {
    filter: { removeFilter }
  } = nftAppProps

  useEffect(() => {
    removeFilter(FILTERS.myMoonTotems)
  }, [])

  return (
    <>
      {showGridView && (
        <GridView ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      )}
      {!showGridView && (
        <ListView ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      )}
    </>
  )
}
