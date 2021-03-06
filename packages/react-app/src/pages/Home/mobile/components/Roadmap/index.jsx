import React from 'react'
import { Row, Col } from 'antd'
import roadmapContent from './roadmapContent'

export default function Section({ ethereumProps, nftAppProps }) {
  return (
    <div style={{ height: 'auto', overflow: 'hidden' }}>
      <div
        style={{
          padding: '5%',
          fontSize: '25px'
        }}
      >
        Roadmap
      </div>

      <Row>
        {roadmapContent.map(({ image, title, text }, index) => {
          return (
            <Col
              xs={12}
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
                  fontSize: '16px',
                  fontWeight: 600,
                  marginTop: '30px',
                  marginBottom: '13px'
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: '23px',
                  fontWeight: 400,
                  lineHeight: '33px'
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
