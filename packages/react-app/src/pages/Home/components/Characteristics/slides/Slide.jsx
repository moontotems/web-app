import React from 'react'
import { Row, Col } from 'antd'

export default function Slide({ image, title, text }) {
  return (
    <Row>
      <img
        src={image}
        style={{ float: 'left', height: 'calc(100vh - 47px)' }}
      />
      <div
        style={{
          float: 'left',
          height: '100vh',
          marginLeft: '2%'
        }}
      >
        <div
          style={{
            position: 'absolute',
            fontSize: '27px',
            fontWeight: '300',
            lineHeight: '35px'
          }}
        >
          <div
            style={{
              width: '100%',
              fontSize: '35px',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}
          >
            {title}
          </div>
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              fontSize: '27px',
              fontWeight: 300,
              lineHeight: '35px'
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </Row>
  )
}
