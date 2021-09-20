import React from 'react'
import { CreaturesGrid } from '../../../sharedComponents'

export default function AllMobileView({ ethereumProps, nftAppProps }) {
  return (
    <>
      <CreaturesGrid ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
    </>
  )
}
