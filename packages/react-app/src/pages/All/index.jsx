import React from 'react'
import { Row, Col } from 'antd'
import { Creature } from '../../components'

export default function All({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts,
  creatures
}) {
  return (
    <div style={{ backgroundColor: '#000' }}>
      <h2>All Talismoons</h2>
      <Row>
        {creatures.map((creature, index) => {
          const {
            id,
            name1,
            name2,
            generation,
            characteristic1,
            characteristic2,
            characteristic3,
            element,
            family,
            minted,
            image
          } = creature

          const key = `TALISMOONS-${id}-all`

          return (
            <Col key={key} xs={24} sm={16} md={8} lg={6}>
              <Creature
                creature={creature}
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
  )
}
