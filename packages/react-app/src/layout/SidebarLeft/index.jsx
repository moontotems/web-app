import React from 'react'

import ActionSidebarDesktop from './desktop'
import ActionSidebarMobile from './mobile'

export default function SidebarLeft({
  ethereumProps,
  nftAppProps,
  sidebarLeftOpen,
  setSidebarLeftOpen
}) {
  const { isMobile } = nftAppProps

  return (
    <>
      {!isMobile && sidebarLeftOpen && (
        <ActionSidebarDesktop
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps }}
          setSidebarLeftOpen={setSidebarLeftOpen}
        />
      )}

      {isMobile && sidebarLeftOpen && (
        <ActionSidebarMobile
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps }}
          setSidebarLeftOpen={setSidebarLeftOpen}
        />
      )}
    </>
  )
}
