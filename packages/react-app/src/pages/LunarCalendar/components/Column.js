import React from 'react'
import { Row, Col } from 'antd'

export default function Column({ image, title, description }) {
  return (
    <>
      <Col xs={24} md={6}>
        <Col xs={24}>
          <img
            src={image}
            style={{
              width: '100%'
            }}
          />
        </Col>
        <div
          style={{
            borderLeft: '1px solid #888',
            marginTop: '20px',
            paddingLeft: '15px'
          }}
        >
          <Col xs={24}>
            <div style={{ fontSize: '22px', fontWeight: 400 }}>{title}</div>
          </Col>
          <Col xs={24}>
            <div
              style={{
                marginTop: '40px',
                marginBottom: '40px',
                fontSize: '17px'
              }}
            >
              {description}
            </div>
          </Col>
        </div>
      </Col>
    </>
  )
}
