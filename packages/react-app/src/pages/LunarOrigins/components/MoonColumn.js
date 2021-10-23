import React from 'react'
import { Row, Col } from 'antd'

export default function MoonColumn({
  moon: { image, symbol, name, nameLatin, description }
}) {
  return (
    <>
      <Col xs={24} md={5} style={{ marginBottom: '80px' }}>
        <Col xs={24}>
          <img src={image} style={{ width: '100%', marginBottom: '20px' }} />
        </Col>
        <Row style={{ paddingLeft: '20px', borderLeft: '1px solid #393939' }}>
          <Col xs={24}>
            <div style={{ fontSize: '25px', marginBottom: '5px' }}>{name}</div>
          </Col>
          <Col xs={24}>
            <div style={{ fontStyle: 'italic', marginBottom: '20px' }}>
              {nameLatin}
            </div>
          </Col>
          <Col xs={24}>
            <div>{description}</div>
          </Col>
          <Col xs={24}>
            <img src={symbol} style={{ width: '20%', marginTop: '40px' }} />
          </Col>
        </Row>
      </Col>
    </>
  )
}
