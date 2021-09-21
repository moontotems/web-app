import React from 'react'

import SidebarLeftDesktop from './desktop'
import SidebarLeftMobile from './mobile'

export default function SidebarLeft({
  ethereumProps,
  nftAppProps,
  setSidebarLeftOpen,
  open
}) {
  const { isMobile } = nftAppProps
  return (
    <>
      {isMobile && (
        <SidebarLeftMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          setSidebarLeftOpen={setSidebarLeftOpen}
          open={open}
        />
      )}
      {!isMobile && (
        <SidebarLeftDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          setSidebarLeftOpen={setSidebarLeftOpen}
          open={open}
        />
      )}
    </>
  )
}
