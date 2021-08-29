import React from 'react'
import { Row, Col, Divider } from 'antd'
import { Creature } from '../../components'
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
  writeContracts,
  creatures,
  mintEvents
}) {
  return (
    <div style={{ backgroundColor: '#000' }}>
      <div>
        <h2>Minted</h2>
        <Row>
          {mintEvents?.map((event, index) => {
            const { blockNumber, sender, _from, _to, _tokenId } = event

            const tokenId = _tokenId.toString()
            const creature = creatures[tokenId]
            const key = `TALISMOONS-${tokenId}-minted`

            return (
              <Col key={key} xs={24} sm={16} md={8} lg={6}>
                <Creature
                  creature={creature || {}}
                  address={address}
                  mainnetProvider={mainnetProvider}
                  localProvider={localProvider}
                  yourLocalBalance={localProvider}
                  price={price}
                  gasPrice={gasPrice}
                  tx={tx}
                  readContracts={readContracts}
                  writeContracts={writeContracts}
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
