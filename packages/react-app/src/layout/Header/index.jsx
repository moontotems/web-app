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
  userSigner,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
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
          userSigner={userSigner}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          blockExplorer={blockExplorer}
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
          userSigner={userSigner}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          blockExplorer={blockExplorer}
          networkDisplay={networkDisplay}
        />
      )}
    </>
  )
}
