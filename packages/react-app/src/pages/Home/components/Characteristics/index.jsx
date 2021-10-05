import React from 'react'
import { Row, Col } from 'antd'
import Slider from './Slider'

export default function CharacteristicsSection({ ethereumProps, nftAppProps }) {
  return (
    <>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>
            Characteristics
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div
            style={{
              padding: '20px',
              fontSize: '27px',
              fontWeight: 300,
              lineHeight: '43px'
            }}
          >
            Each Talismoon is a one-of-a-kind.
          </div>
        </Col>

        <Slider ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </Row>
    </>
  )
}
