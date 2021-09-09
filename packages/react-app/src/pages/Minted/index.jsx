import React from 'react'
import { Row, Col, Divider } from 'antd'
import { useEventListener } from '../../hooks'
import { Creature } from '../../components'
import creature_meta_data_hashmap from '../../creature_meta_data_hashmap.json'
import { Mint } from './components'

export default function Minted({
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
      <div>
        <h2>Minted</h2>
        <Row>
          {mintEvents?.map((event, index) => {
            const { blockNumber, sender, _from, _to, _tokenId } = event

            const tokenId = _tokenId.toString()
            const metaData = creature_meta_data_hashmap[tokenId]
            const key = `TALISMOON-${tokenId}-minted`

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
                  creature={{ tokenId, metaData, minted: true }}
                />
              </Col>
            )
          })}
        </Row>
      </div>

      <Divider />

      <div>
        <Row>
          <Col span={8} />
          <Col span={8}>
            <h3>Mint</h3>
            <Mint gasPric={gasPrice} tx={tx} writeContracts={writeContracts} />
          </Col>
          <Col span={8} />
        </Row>
      </div>
    </div>
  )
}
