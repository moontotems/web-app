import React from 'react'
import { Row, Col } from 'antd'

export default function PhaseSlide({ image, title, description }) {
  return (
    <Row>
      <div
        style={{
          float: 'left',
          height: 'calc(100vh - 47px)',
          maxWidth: '50%',
          padding: '5%'
        }}
      >
        <img src={image} style={{ float: 'left', width: '100%' }} />
      </div>
      <div
        style={{
          width: '50%',
          flexFlow: 'wrap',
          fontSize: '55px',
          fontWeight: '300',
          paddingTop: '5%'
        }}
      >
        <div
          style={{
            fontSize: '35px',
            fontWeight: 'bold',
            width: '100%'
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
          {description}
        </div>
        <br />
      </div>
    </Row>
  )
}
