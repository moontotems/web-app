import React, { useEffect } from 'react'

import FILTERS from '../../sharedComponents/FilterDropdown/filters'
import { All as AllPage } from '../'

import './styles.less'

export default function Wallet({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const {
    filter: { setActiveFilters },
    setShowGridView
  } = nftAppProps

  useEffect(() => {
    setActiveFilters([FILTERS.myMoonTotems])
    setShowGridView(true)
  }, [])

  if (!address) {
    return (
      <div style={{ marginTop: '10%', textAlign: 'center', fontSize: '20px' }}>
        Please connect wallet.
      </div>
    )
  }

  return <AllPage ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
}
