import React, { useState } from 'react'
import { Row, Col } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Creature } from '../../components'
import { useEventListener } from '../../hooks'
import creature_metadata_hashmap from '../../creature_metadata_hashmap.json'

export default function All({
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
  console.log('in All:')
  console.log({ favoritedIds })
  const [numberOfVisibleCreatures, setNumberOfVisibleCreatures] = useState(27)

  let creatures = []
  const INITIAL_TOKEN_ID = 0
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

  for (
    let tokenId = INITIAL_TOKEN_ID;
    tokenId < numberOfVisibleCreatures;
    tokenId++
  ) {
    const minted = !!mintEventsMap[tokenId]
    const isFavorite = checkIfIsFavorite(tokenId)
    const metaData = creature_metadata_hashmap[tokenId]

    creatures.push({
      tokenId,
      metaData,
      isFavorite,
      minted
    })
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <InfiniteScroll
        dataLength={numberOfVisibleCreatures}
        next={() => setNumberOfVisibleCreatures(numberOfVisibleCreatures + 51)}
        hasMore={numberOfVisibleCreatures < MAX_TOKEN_ID}
        loader={<h4>Loading...</h4>}
        //endMessage={}
      >
        <Row>
          <Col xs={24} md={4} />
          <Col xs={24} md={16}>
            <Row>
              {creatures.map(creature => {
                const { tokenId } = creature

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
      </InfiniteScroll>
    </div>
  )
}
