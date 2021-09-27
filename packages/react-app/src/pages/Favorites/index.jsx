import React, { useEffect } from 'react'
import FILTERS from '../../sharedComponents/FilterDropdown/filters'
import PagesAll from '../All'

export default function Favorites({ ethereumProps, nftAppProps }) {
  const { setActiveFilter } = nftAppProps

  useEffect(() => {
    setActiveFilter(FILTERS.favorites)
  }, [])

  return <PagesAll ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
}
