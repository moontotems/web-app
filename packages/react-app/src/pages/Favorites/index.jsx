import React from 'react'
import { Row, Col } from 'antd'
import { Creature } from '../../sharedComponents'
import { getTokenPrefixZeros } from '../../helpers'
import creature_metadata_hashmap from '../../creature_metadata_hashmap.json'

export default function Favorites({ ethereumProps, nftAppProps }) {
  const { favorites, mintEventsMap } = nftAppProps
  const { favoritedIds } = favorites

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Row>
        <Col xs={24} md={4} />
        <Col xs={24} md={16}>
          <Row>
            {favoritedIds.map(tokenId => {
              const minted = !!mintEventsMap[tokenId]
              const metaData = creature_metadata_hashmap[tokenId]
              const prefixedTokenId = getTokenPrefixZeros(tokenId)
              const image = `https://talismoonstest.blob.core.windows.net/finalrenders/TALISMOONS_GEN01_2k${prefixedTokenId}.png`
              //const image = `/images/creatures/TALISMOONS_GEN01_2k/TALISMOONS_GEN01_2k${prefixedTokenId}.png`

              const creature = {
                tokenId,
                metaData,
                image,
                isFavorite: true,
                minted
              }

              const key = `TALISMOON-${tokenId}`

              return (
                <Col key={key} xs={24} sm={16} md={8} lg={8}>
                  <Creature
                    ethereumProps={ethereumProps}
                    nftAppProps={nftAppProps}
                    creature={creature}
                  />
                </Col>
              )
            })}
          </Row>
        </Col>
        <Col xs={24} md={4} />
      </Row>
    </div>
  )
}
