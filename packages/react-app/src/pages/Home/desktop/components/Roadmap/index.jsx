import React from 'react'
import { Row, Col } from 'antd'
import roadmapContent from './roadmapContent'

export default function Section({ ethereumProps, nftAppProps }) {
  return (
    <div style={{ height: 'auto', overflow: 'hidden' }}>
      <div
        style={{
          padding: '25px',
          fontSize: '20px'
        }}
      >
        Roadmap
      </div>

      <Row style={{ paddingLeft: '10%', paddingRight: '10%' }}>
        {roadmapContent.map(({ image, title, text }, index) => {
          return (
            <Col
              xs={8}
              key={`roadmap-${index}`}
              style={{
                marginBottom: '5%',
                paddingLeft: '5%',
                paddingRight: '5%'
              }}
            >
              <div>
                <img
                  src={image}
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%'
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: '19px',
                  fontWeight: 'bold',
                  marginTop: '30px',
                  marginBottom: '20px'
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: '17px',
                  lineHeight: '28px'
                }}
              >
                {text}
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
