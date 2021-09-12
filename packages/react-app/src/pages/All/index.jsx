import React, { useState } from 'react'
import { Row, Col } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Creature } from '../../components'
import { useEventListener } from '../../hooks'
import creature_meta_data_hashmap from '../../creature_meta_data_hashmap.json'

export default function All({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts
}) {
  const [numberOfVisibleCreatures, setNumberOfVisibleCreatures] = useState(200)

  let creatures = []
  // TODO: change this to 0
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

  for (
    let tokenId = INITIAL_TOKEN_ID;
    tokenId < numberOfVisibleCreatures;
    tokenId++
  ) {
    const minted = !!mintEventsMap[tokenId]

    const metaData = creature_meta_data_hashmap[tokenId]

    creatures.push({
      tokenId,
      metaData,
      minted
    })
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <InfiniteScroll
        dataLength={numberOfVisibleCreatures}
        next={() => setNumberOfVisibleCreatures(numberOfVisibleCreatures + 100)}
        hasMore={numberOfVisibleCreatures < MAX_TOKEN_ID}
        loader={<h4>Loading...</h4>}
        //endMessage={}
      >
        <Row>
          {creatures.map(creature => {
            const { tokenId, metaData, minted } = creature

            const key = `TALISMOON-${tokenId}`

            return (
              <Col key={key} xs={24} sm={16} md={8} lg={6}>
                <Creature
                  address={address}
                  mainnetProvider={mainnetProvider}
                  localProvider={localProvider}
                  yourLocalBalance={localProvider}
                  price={price}
                  gasPrice={gasPrice}
                  tx={tx}
                  readContracts={readContracts}
                  writeContracts={writeContracts}
                  creature={{ tokenId, metaData, minted }}
                />
              </Col>
            )
          })}
        </Row>
      </InfiniteScroll>
    </div>
  )
}
