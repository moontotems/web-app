import React, { useEffect } from 'react'

import { ActionSidebar } from '../../sharedComponents'
import FILTERS from '../../sharedComponents/FilterDropdown/filters'
import AllPageDesktop from '../All/desktop'
import AllPageMobile from '../All/mobile'

import './styles.less'

export default function Wallet({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const {
    isMobile,
    creatures,
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
          creatureList={creatures.users}
        />
      )}
    </>
  )
}
