import React from 'react'
import { Row, Col } from 'antd'
import PageIndicator from './PageIndicator'

export default function RegionSlide({
  image,
  icon,
  lunarOriginName,
  lunarOriginNameLatin,
  activePageNumber
}) {
  return (
    <>
      <Row>
        <Col xs={2} md={1} />
        <Col xs={24} md={23}>
          <div
            style={{
              float: 'right',
              height: 'calc(100vh - 60px)'
            }}
          >
            <div
              style={{
                float: 'right',
                height: '80vh'
              }}
            >
              <img
                src={image}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '90%'
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                top: 0,
                right: '10%',
                width: '400px',
                padding: '15px'
              }}
            >
              <img
                src={icon}
                style={{
                  width: '20%',
                  marginTop: '40px',
                  marginBottom: '10px'
                }}
              />
              <div
                style={{
                  fontSize: '33px',
                  fontWeight: 300,
                  lineHeight: '37px'
                }}
              >
                {lunarOriginName}
              </div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 300,
                  lineHeight: '37px',
                  fontStyle: 'italic'
                }}
              >
                {lunarOriginNameLatin}
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 'calc(30vh + 150px)',
                right: '10%',
                height: '150px',
                width: '180px',
                padding: '15px'
              }}
            >
              <PageIndicator activePageNumber={activePageNumber} />
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}
