import React from 'react'
import { Row, Col } from 'antd'
import Columns from './Columns'

export default function MoonOriginsSection({ ethereumProps, nftAppProps }) {
  return (
    <>
      <Row style={{ marginBottom: '100px' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>Moon Origins</div>
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
            Talismoons come from the Moon
          </div>
        </Col>
      </Row>
      <Columns ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
    </>
  )
}
