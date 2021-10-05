import React from 'react'
import { Row, Col } from 'antd'
import Columns from './Columns'

export default function UniqueFeaturesSection({ ethereumProps, nftAppProps }) {
  return (
    <>
      <Row style={{ marginBottom: '80px' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>
            Unique Features
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
            Moon Totems is a next generation NFT project that aims to expand the
            features and possibilities exclusive to holders.
          </div>
        </Col>
      </Row>
      <Columns />
    </>
  )
}
