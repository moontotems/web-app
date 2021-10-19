import React from 'react'

import GridView from './Grid'
import ListView from './List'

export default function AllDesktopView({
  ethereumProps,
  nftAppProps,
  creatureList
}) {
  const { showGrid } = nftAppProps

  return (
    <>
      {showGrid && (
        <GridView
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList}
        />
      )}
      {!showGrid && (
        <ListView
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList}
        />
      )}
    </>
  )
}
