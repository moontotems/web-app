import React from 'react'
import { Row, Col } from 'antd'
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
  let creatures = []
  const INITIAL_TOKEN_ID = 1
  // TODO:
  const MAX_TOKEN_ID = 500

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

    const metaData = creature_meta_data_hashmap[tokenId]

    creatures.push({
      tokenId,
      metaData,
      minted
    })
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <h2>All Talismoons</h2>
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
    </div>
  )
}
