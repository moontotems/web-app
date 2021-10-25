import React from 'react'
import { Creature } from '../../../../../../sharedComponents'
import { getImageUrl } from '../../../../../../helpers'

export default function Slide({ ethereumProps, nftAppProps, creature }) {
  return (
    <div style={{ width: '100%' }}>
      <Creature
        ethereumProps={ethereumProps}
        nftAppProps={nftAppProps}
        creature={{
          ...creature,
          image: getImageUrl({ tokenId: creature.tokenId, size: 512 })
        }}
      />
    </div>
  )
}
