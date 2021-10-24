import React from 'react'

import ActionSidebarDesktop from './desktop'
import ActionSidebarMobile from './mobile'

export default function ActionSidebar({
  ethereumProps,
  nftAppProps,
  creatureList
}) {
  const { isMobile, creatures, usersCreaturesTokenIds, route } = nftAppProps

  const getNumberFromString = str => {
    return str.replace(/[^0-9]/g, '')
  }

  const currentCreatureToken = parseInt(getNumberFromString(route))
  const creatureIsOwnedByUser =
    usersCreaturesTokenIds.includes(currentCreatureToken)

  const showCreatureFeatures =
    route.includes('moontotem') && creatureIsOwnedByUser

  return (
    <>
      {!isMobile && (
        <ActionSidebarDesktop
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps, showCreatureFeatures }}
          creatureList={creatureList ? creatureList : creatures.filtered}
        />
      )}

      {isMobile && (
        <ActionSidebarMobile
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps, showCreatureFeatures }}
          creatureList={creatureList ? creatureList : creatures.filtered}
        />
      )}
    </>
  )
}
