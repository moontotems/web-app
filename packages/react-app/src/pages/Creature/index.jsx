import React from 'react'

import CreaturePageDesktop from './desktop'
import CreaturePageMobile from './mobile'

export default function CreaturePage({ ethereumProps, nftAppProps }) {
  const { isMobile } = nftAppProps

  return (
    <>
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
