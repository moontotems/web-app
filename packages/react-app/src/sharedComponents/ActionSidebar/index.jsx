import React from 'react'

import ActionSidebarDesktop from './desktop'
import ActionSidebarMobile from './mobile'

export default function ActionSidebar({
  ethereumProps,
  nftAppProps,
  creatureList
}) {
  const { isMobile, creatures, route } = nftAppProps
  const showTools = route.includes('moontotem')

  return (
    <>
      {!isMobile && (
        <ActionSidebarDesktop
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps, showTools }}
          creatureList={creatureList ? creatureList : creatures.filtered}
        />
      )}

      {isMobile && (
        <ActionSidebarMobile
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps, showTools }}
          creatureList={creatureList ? creatureList : creatures.filtered}
        />
      )}
    </>
  )
}
