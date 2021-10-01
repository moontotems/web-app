import React from 'react'
import { Row, Col } from 'antd'

export default function Column({ image, title, description }) {
  return (
    <>
      <Col xs={24} md={6}>
        <Col xs={24}>
          <img src={image} style={{ width: '100%', marginBottom: '20px' }} />
        </Col>
        <Row
          style={{
            minHeight: '300px',
            paddingLeft: '20px',
            borderLeft: '1px solid white'
          }}
        >
          <Col xs={24}>
            <div style={{ fontSize: '25px', marginBottom: '5px' }}>{title}</div>
          </Col>
          <Col xs={24}>
            <div>{description}</div>
          </Col>
        </Row>
      </Col>
    </>
  )
}
