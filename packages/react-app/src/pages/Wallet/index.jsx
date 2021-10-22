import React, { useEffect } from 'react'

import { ActionSidebar } from '../../sharedComponents'
import AllPageDesktop from '../All/desktop'
import AllPageMobile from '../All/mobile'

import './styles.less'

export default function Wallet({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const {
    isMobile,
    creatures,
    filter: { setActiveFilters }
  } = nftAppProps

  useEffect(() => {
    setActiveFilters([])
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
      <ActionSidebar
        ethereumProps={ethereumProps}
        nftAppProps={nftAppProps}
        creatureList={creatures.users}
      />

      {!isMobile && (
        <AllPageDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatures.users}
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
