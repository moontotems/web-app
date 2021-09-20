import React from 'react'
import { Row, Col, Divider } from 'antd'
import { getTokenPrefixZeros } from '../../helpers'
import { Creature } from '../../sharedComponents'
import creature_metadata_hashmap from '../../creature_metadata_hashmap.json'
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

              const prefixedTokenId = getTokenPrefixZeros(tokenId)
              const image = `https://talismoonstest.blob.core.windows.net/finalrenders/TALISMOONS_GEN01_2k${prefixedTokenId}.png`
              //const image = `/images/creatures/TALISMOONS_GEN01_2k/TALISMOONS_GEN01_2k${prefixedTokenId}.png`

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
