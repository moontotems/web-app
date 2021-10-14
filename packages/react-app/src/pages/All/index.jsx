import React, { useEffect } from 'react'

import AllPageDesktop from './desktop'
import AllPageMobile from './mobile'

export default function All({ ethereumProps, nftAppProps }) {
  const { setActiveFilter, isMobile } = nftAppProps

  useEffect(() => {
    if (window.location.pathname === '/all') {
      setActiveFilter('')
    }
  }, [])

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
    </>
  )
}
