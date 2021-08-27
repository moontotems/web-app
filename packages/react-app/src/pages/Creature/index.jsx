import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button } from 'antd'

// TODO: fetch this from file server
console.log('fetching local json list of talismoon data')
import talismoon_data from './talismoon_data.json'
console.log('fetching local json list of talismoon data: OK')
console.log({ talismoon_data })

import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserSigner
} from '../../hooks'

export default function CreaturePage({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts,
  location
}) {
  let { id } = useParams()

  const {
    name1,
    name2,
    generation,
    characteristic1,
    characteristic2,
    characteristic3,
    element,
    family
  } = talismoon_data[id]

  const imagePath = `/images/creatures/JPG/TALISMOONS_G1.${id}.jpg`

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Row>
        <Col span={6} />
        <Col span={12}>
          <img src={imagePath} width='100%' />
          <Row>
            <Col span={24}>
              <h2
                style={{
                  //fontFamily: 'Univers LT Std',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '48px',
                  lineHeight: '58px',
                  textAlign: 'center'
                }}
              >
                {name1} {name2}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div
                style={{
                  padding: 10,
                  //fontFamily: 'Univers LT Std',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '24px',
                  lineHeight: '29px',
                  textAlign: 'right',
                  color: '#fff',
                  opacity: 0.5
                }}
              >
                <div>Family</div>
                <div>Occupation</div>
                <div>Fertility</div>
                <div>Sex</div>
                <div>Traits</div>
                <div>Timestamp</div>
                <div>Lunar Phase</div>
                <div>Current Value</div>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: 10,
                  //fontFamily: 'Univers LT Std',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '18px',
                  //lineHeight: '22px',
                  lineHeight: '29px',
                  textAlign: 'left',
                  color: '#fff'
                }}
              >
                <div>{family}</div>
                <div>---</div>
                <div>---</div>
                <div>---</div>
                <div>
                  {characteristic1}, {characteristic2}, {characteristic3}
                </div>
                <div>---</div>
                <div>---</div>
                <div>---</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={9} />
            <Col span={6}>
              <Button block type='primary' style={{ marginTop: '20px' }}>
                Offering
              </Button>
            </Col>
            <Col span={9} />
          </Row>
        </Col>
        <Col span={6} />
      </Row>
    </div>
  )
}
