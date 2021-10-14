import React from 'react'

import ActionSidebarDesktop from './desktop'
import ActionSidebarMobile from './mobile'

export default function ActionSidebar({ ethereumProps, nftAppProps }) {
  const { isMobile } = nftAppProps

  return (
    <>
      {!isMobile && (
        <ActionSidebarDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}

      {isMobile && (
        <ActionSidebarMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}
    </>
  )
}
