import React from 'react'

import ActionSidebarDesktop from './desktop'
import ActionSidebarMobile from './mobile'

export default function ActionSidebar({
  ethereumProps,
  nftAppProps,
  creatureList
}) {
  const { isMobile, creatures } = nftAppProps

  return (
    <>
      {!isMobile && (
        <ActionSidebarDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList ? creatureList : creatures.filtered}
        />
      )}

      {isMobile && (
        <ActionSidebarMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList ? creatureList : creatures.filtered}
        />
      )}
    </>
  )
}
