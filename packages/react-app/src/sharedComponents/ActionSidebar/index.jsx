import React from 'react'
import { useLocation } from 'react-router-dom'

import ActionSidebarDesktop from './desktop'
import ActionSidebarMobile from './mobile'

export default function ActionSidebar({ ethereumProps, nftAppProps }) {
  const { isMobile, usersCreaturesTokenIds, route } = nftAppProps

  const checkIfShouldShowCreatureFeatures = () => {
    const removeFirstChar = str => str.substring(1)
    const location = useLocation()

    const possibleTokenId = removeFirstChar(location.pathname)
    if (!isNaN(possibleTokenId)) {
      const currentCreatureTokenId = parseInt(possibleTokenId)
      const creatureIsOwnedByUser = usersCreaturesTokenIds.includes(
        currentCreatureTokenId
      )
      return creatureIsOwnedByUser
    }
    return false
  }

  const showCreatureFeatures = checkIfShouldShowCreatureFeatures()

  return (
    <>
      {!isMobile && (
        <ActionSidebarDesktop
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps, showCreatureFeatures }}
        />
      )}

      {isMobile && (
        <ActionSidebarMobile
          ethereumProps={ethereumProps}
          nftAppProps={{ ...nftAppProps, showCreatureFeatures }}
        />
      )}
    </>
  )
}
