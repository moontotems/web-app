import React, { useState } from 'react'

import GridView from './Grid'
import ListView from './List'

export default function AllDesktopView({ ethereumProps, nftAppProps }) {
  const { showGrid } = nftAppProps

  console.log({ showGrid })
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
