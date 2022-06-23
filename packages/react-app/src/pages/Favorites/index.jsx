import React, { useEffect } from 'react'
import FILTERS from '../../sharedComponents/FilterDropdown/filters'
import { All as AllPage } from '../'

export default function Favorites({ ethereumProps, nftAppProps }) {
  const {
    filter: { setActiveFilters }
  } = nftAppProps

  useEffect(() => {
    setActiveFilters([FILTERS.favorites])
  }, [])

  return <AllPage ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
}
