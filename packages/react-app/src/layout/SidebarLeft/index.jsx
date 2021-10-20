import React from 'react'

import SidebarLeftDesktop from './desktop'
import SidebarLeftMobile from './mobile'

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
        <SidebarLeftDesktop
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps }}
          setSidebarLeftOpen={setSidebarLeftOpen}
        />
      )}

      {isMobile && sidebarLeftOpen && (
        <SidebarLeftMobile
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps }}
          setSidebarLeftOpen={setSidebarLeftOpen}
        />
      )}
    </>
  )
}
