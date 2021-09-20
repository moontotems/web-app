import React from 'react'

import { ActionBar } from '../../sharedComponents'
import AllPageDesktop from './desktop'
import AllPageMobile from './mobile'

export default function All({ ethereumProps, nftAppProps }) {
  const { isMobile } = nftAppProps
  return (
    <>
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
        />
      )}
      <ActionBar ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
    </>
  )
}
