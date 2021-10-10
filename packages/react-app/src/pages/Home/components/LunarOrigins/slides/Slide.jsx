import React from 'react'
import { Row, Col } from 'antd'

export default function PhaseSlide({
  image,
  icon,
  title,
  subtitle,
  description
}) {
  return (
    <Row>
      <div
        style={{
          float: 'left',
          //height: 'calc(100vh - 47px)',
          maxWidth: '50%',
          padding: '5%'
        }}
      >
        <img
          src={image}
          style={{ float: 'left', height: '100%', width: '100%' }}
        />
      </div>
      <div
        style={{
          width: '50%',
          flexFlow: 'wrap',
          fontSize: '55px',
          fontWeight: '300',
          lineHeight: '55px',
          paddingTop: '5%'
        }}
      >
        <div
          style={{
            float: 'left',
            height: '100%',
            width: '70px',
            margin: '15px'
          }}
        >
          <img
            src={icon}
            style={{
              height: '70px',
              marginBottom: '15px'
            }}
          />
        </div>
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
            marginBottom: '25px',
            fontSize: '27px',
            fontStyle: 'italic'
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            width: '100%',
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
