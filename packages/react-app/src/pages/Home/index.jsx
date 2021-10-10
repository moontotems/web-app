import React from 'react'

import HomePageDesktop from './desktop'
import HomePageMobile from './mobile'

export default function HomePage({ ethereumProps, nftAppProps }) {
  const { isMobile } = nftAppProps

  return (
    <>
      {!isMobile && (
        <HomePageDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}
      {isMobile && (
        <HomePageMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}
    </>
  )
}
