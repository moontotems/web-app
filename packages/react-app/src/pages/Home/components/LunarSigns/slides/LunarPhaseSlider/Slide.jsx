import React from 'react'
import { Row, Col } from 'antd'
import PageIndicator from '../PageIndicator'

export default function Slide({ image, title, description, activePageNumber }) {
  return (
    <Col xs={24}>
      <Row style={{ padding: '10%' }}>
        <Col xs={24}>
          <img src={image} style={{ width: '100%', marginBottom: '20px' }} />
        </Col>
      </Row>
      <Row style={{ paddingLeft: '20px', borderLeft: '1px solid white' }}>
        <Col xs={24}>
          <div style={{ fontSize: '25px', marginBottom: '5px' }}>{name}</div>
        </Col>
        <Col xs={24}>
          <div style={{ fontStyle: 'italic', marginBottom: '20px' }}>
            {'TODO'}
          </div>
        </Col>
        <Col xs={24}>
          <div>{description}</div>
        </Col>
      </Row>
    </Col>
  )
}
