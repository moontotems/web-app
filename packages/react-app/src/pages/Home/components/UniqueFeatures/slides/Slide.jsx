import React from 'react'
import { Row, Col } from 'antd'
import Dots from './Dots'

export default function Slide({
  activeDotNumber,
  image,
  icon,
  title,
  subtitle,
  text1,
  text2
}) {
  return (
    <Row>
      <Col xs={24} md={11}>
        <img
          src={image}
          style={{ float: 'left', padding: '5%', width: '90%' }}
        />
      </Col>
      <Col xs={0} md={2} />
      <Col xs={24} md={11}>
        <div style={{ float: 'left', width: '100%', padding: '5%' }}>
          <img
            src={icon}
            style={{
              height: '40px',
              marginBottom: '15px'
            }}
          />
          <div
            style={{
              width: '350px',
              fontSize: '21px',
              fontWeight: '300',
              lineHeight: '35px'
            }}
          >
            <div
              style={{ width: '100%', marginBottom: '25px', fontSize: '20px' }}
            >
              {title}
            </div>
            <div
              style={{
                width: '100%',
                marginBottom: '15px',
                fontSize: '19px',
                fontWeight: 400
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                width: '100%',
                marginBottom: '25px',
                fontSize: '17px',
                lineHeight: '24px'
              }}
            >
              {text1}
            </div>
            <div
              style={{
                width: '100%',
                marginBottom: '25px',
                fontSize: '17px',
                lineHeight: '24px'
              }}
            >
              {text2}
            </div>
          </div>
          <div
            style={{
              width: '180px',
              padding: '15px'
            }}
          >
            <Dots activeDotNumber={activeDotNumber} />
          </div>
        </div>
      </Col>
    </Row>
  )
}
