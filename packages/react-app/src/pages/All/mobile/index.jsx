import React from 'react'

import GridView from './Grid'
import ListView from '../desktop/List'

export default function AllDesktopView({
  ethereumProps,
  nftAppProps,
  creatureList
}) {
  const { showGridView } = nftAppProps

  return (
    <>
      {showGridView && (
        <GridView
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList}
        />
      )}
      {!showGridView && (
        <ListView
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList}
        />
      )}
    </>
  )
}
