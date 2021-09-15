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
  let creatures = {}
  const INITIAL_TOKEN_ID = 1
  const MAX_TOKEN_ID = 1000

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

  for (let tokenId = INITIAL_TOKEN_ID; tokenId < MAX_TOKEN_ID; tokenId++) {
    const minted = !!mintEventsMap[tokenId]
    const isFavorite = checkIfIsFavorite(tokenId)
    const metaData = creature_metadata_hashmap[tokenId]

    creatures[`${tokenId}`] = {
      tokenId,
      metaData,
      isFavorite,
      minted
    }
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Row>
        <Col xs={24} md={4} />
        <Col xs={24} md={16}>
          <Row>
            {favoritedIds.map(favoritedId => {
              console.log({ favoritedId })
              console.log({ creatures })
              const { tokenId } = creatures[favoritedId]
              console.log({ tokenId })

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
                    creature={creatures[favoritedId]}
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
