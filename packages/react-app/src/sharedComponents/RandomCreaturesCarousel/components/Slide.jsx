import React from 'react'
import { Creature } from '../../../sharedComponents'
import { getImageUrl } from '../../../helpers'

export default function Slide({ ethereumProps, nftAppProps, creature }) {
  return (
    <Creature
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      creature={{
        ...creature,
        image: getImageUrl({ tokenId: creature.tokenId, size: 512 })
      }}
    />
  )
}
