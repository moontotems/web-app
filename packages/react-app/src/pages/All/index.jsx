import React from 'react'
import { Row, Col } from 'antd'
import { Creature } from '../../components'

// TODO: fetch this from file server
console.log('fetching local json list of talismoon data')
import talismoon_data from './talismoon_data.json'
console.log('fetching local json list of talismoon data: OK')
console.log({ talismoon_data })

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
  const CREATURE_IMAGES = []
  for (let i = 0; i < 100; i++) {
    CREATURE_IMAGES[i] = `TALISMOONS_G1.${i}`
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <h2>All Crypto Moons</h2>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {CREATURE_IMAGES.map((CREATURE_IMAGE, index) => {
          const {
            id,
            name1,
            name2,
            generation,
            characteristic1,
            characteristic2,
            characteristic3,
            element,
            family
          } = talismoon_data[index]

          const key = `TALISMOONS-${id}-all`

          return (
            <Col key={key} span={4}>
              <Creature
                imagePath={`./images/creatures/JPG/TALISMOONS_G1.${id}.jpg`}
                id={id}
                name1={name1}
                name2={name2}
                generation={generation}
                characteristic1={characteristic1}
                characteristic2={characteristic2}
                characteristic3={characteristic3}
                element={element}
                family={family}
                showAdoptButton={false}
              />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
