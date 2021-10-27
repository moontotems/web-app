import React from 'react'

import ActionSidebarDesktop from './desktop'
import ActionSidebarMobile from './mobile'

export default function ActionSidebar({ ethereumProps, nftAppProps }) {
  const { isMobile, usersCreaturesTokenIds, route } = nftAppProps

  const checkIfShouldShowCreatureFeatures = () => {
    // const getNumberFromString = str =>  str.replace(/[^0-9]/g, '')
    const href = window.location.href
    let hrefWithoutPort = href.substring(href.indexOf('moontotem/') + 10)
    if (!hrefWithoutPort.length) hrefWithoutPort = href

    const currentCreatureToken = parseInt(hrefWithoutPort)
    const creatureIsOwnedByUser =
      usersCreaturesTokenIds.includes(currentCreatureToken)

    return href.includes('moontotem/') && creatureIsOwnedByUser
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
