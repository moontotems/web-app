import React from 'react'
import { Row, Col } from 'antd'
import { Creature } from '../../components'
import { useEventListener } from '../../hooks'
import creature_metadata_hashmap from '../../creature_metadata_hashmap.json'

export default function Favorites({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  favorites,
  favorites: { favoritedIds, checkIfIsFavorite, updateFavorites },
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts
}) {
  const INITIAL_TOKEN_ID = 0

  const mintEvents = useEventListener(
    readContracts,
    'NFTokenMetadataEnumerableMock',
    'Mint',
    localProvider,
    1
  )

  const mintEventsMap = {}
  mintEvents.map(mintEvent => {
    mintEventsMap[mintEvent._tokenId] = mintEvent
    // convert _tokenId from bigNumber to string
    mintEventsMap[mintEvent._tokenId]['1'] =
      mintEventsMap[mintEvent._tokenId]['1'].toString()
  })

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Row>
        <Col xs={24} md={4} />
        <Col xs={24} md={16}>
          <Row>
            {favoritedIds.map(tokenId => {
              const minted = !!mintEventsMap[tokenId]
              const isFavorite = checkIfIsFavorite(tokenId)
              const metaData = creature_metadata_hashmap[tokenId]
              const creature = {
                tokenId,
                metaData,
                isFavorite,
                minted
              }

              const key = `TALISMOON-${tokenId}`

              return (
                <Col key={key} xs={24} sm={16} md={8} lg={8}>
                  <Creature
                    address={address}
                    mainnetProvider={mainnetProvider}
                    localProvider={localProvider}
                    yourLocalBalance={localProvider}
                    favorites={favorites}
                    price={price}
                    gasPrice={gasPrice}
                    tx={tx}
                    readContracts={readContracts}
                    writeContracts={writeContracts}
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
