import React from 'react'
import { Row, Col, Divider } from 'antd'
import { getImageUrl } from '../../helpers'
import { Creature } from '../../sharedComponents'
import creature_metadata_hashmap from '../../assets/creature_metadata_hashmap.json'
import { Mint } from './components'

export default function Minted({ ethereumProps, nftAppProps }) {
  const { gasPrice, tx, writeContracts } = ethereumProps

  const { favorites, mintEvents, mintEventsMap } = nftAppProps

  const { checkIfIsFavorite } = favorites

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Row>
        <Col xs={24} md={4} />
        <Col xs={24} md={16}>
          <Row>
            {mintEvents.map(event => {
              const { blockNumber, sender, _from, _to, _tokenId } = event

              const tokenId = _tokenId.toString()

              const minted = !!mintEventsMap[tokenId]
              const metaData = creature_metadata_hashmap[tokenId]
              const isFavorite = checkIfIsFavorite()
              const image = getImageUrl(tokenId)

              const creature = {
                tokenId,
                metaData,
                image,
                isFavorite,
                minted
              }

              const key = `TALISMOON-${tokenId}-minted`

              return (
                <Col key={key} xs={24} sm={16} md={8} lg={6}>
                  <Creature
                    ethereumProps={ethereumProps}
                    nftAppProps={nftAppProps}
                    creature={creature}
                  />
                </Col>
              )
            })}
            <Col xs={24}>
              <Divider />
              <h3>Mint</h3>
              <Mint
                gasPric={gasPrice}
                tx={tx}
                writeContracts={writeContracts}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={4} />
      </Row>
    </div>
  )
}
