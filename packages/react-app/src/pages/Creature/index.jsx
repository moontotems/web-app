import React, { useEffect } from 'react'

import { ActionSidebar } from '../../sharedComponents'
import CreaturePageDesktop from './desktop'
import CreaturePageMobile from './mobile'

export default function CreaturePage({ ethereumProps, nftAppProps }) {
  const { isMobile } = nftAppProps

  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ActionSidebar ethereumProps={ethereumProps} nftAppProps={nftAppProps} />

      {!isMobile && (
        <CreaturePageDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}
      {isMobile && (
        <CreaturePageMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}
    </>
  )
}
