import React from 'react'
import { Row, Col } from 'antd'

export default function Column({ image, title, description }) {
  return (
    <>
      <Col xs={24} md={6} style={{ paddingLeft: '2%', paddingRight: '2%' }}>
        <Row>
          <Col xs={24} style={{ paddingLeft: '10%', paddingRight: '10%' }}>
            <img
              src={image}
              style={{
                width: '100%'
              }}
            />
          </Col>
          <div
            style={{
              marginTop: '40px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '19px', fontWeight: 'bold' }}>
                {title}
              </div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '20px',
                  marginBottom: '40px',
                  fontSize: '17px',
                  lineHeight: '28px'
                }}
              >
                {description}
              </div>
            </Col>
          </div>
        </Row>
      </Col>
    </>
  )
}
