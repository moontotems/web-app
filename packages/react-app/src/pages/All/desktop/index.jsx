import React from 'react'

import GridView from './Grid'
import ListView from './List'

export default function AllDesktopView({ ethereumProps, nftAppProps }) {
  const { showGridView } = nftAppProps

  return (
    <>
      {showGridView && (
        <GridView ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      )}
      {!showGridView && (
        <ListView ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      )}
    </>
  )
}
