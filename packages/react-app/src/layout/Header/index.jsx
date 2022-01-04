import React from 'react'

import HeaderDesktop from './desktop'
import HeaderMobile from './mobile'

export default function Header({
  ethereumProps,
  nftAppProps,
  sidebarLeftOpen,
  setSidebarLeftOpen,
  headerTitle,
  setHeaderTitle,
  networkDisplay
}) {
  const { isMobile } = nftAppProps
  return (
    <>
      {!isMobile && (
        <HeaderDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          sidebarLeftOpen={sidebarLeftOpen}
          setSidebarLeftOpen={setSidebarLeftOpen}
          headerTitle={headerTitle}
          setHeaderTitle={setHeaderTitle}
          networkDisplay={networkDisplay}
        />
      )}

      {isMobile && (
        <HeaderMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          sidebarLeftOpen={sidebarLeftOpen}
          setSidebarLeftOpen={setSidebarLeftOpen}
          headerTitle={headerTitle}
          setHeaderTitle={setHeaderTitle}
          networkDisplay={networkDisplay}
        />
      )}
    </>
  )
}
