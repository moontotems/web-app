import React from 'react'

import GridView from './Grid'
import ListView from './List'

export default function AllDesktopView({ ethereumProps, nftAppProps }) {
  const { showGrid } = nftAppProps

  return (
    <>
      {showGrid && (
        <GridView ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      )}
      {!showGrid && (
        <ListView ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      )}
    </>
  )
}
