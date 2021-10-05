import React from 'react'
import { Row, Col } from 'antd'

export default function Columns({ ethereumProps, nftAppProps }) {
  return (
    <>
      <Row gutter={[8, 24]}>
        <Col xs={24} md={5} />
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Instagram</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For visual stories and explorations into the art.
              </div>
            </Col>
            <Col xs={24}>
              <img
                src='/home/icons/Logo-Instagram.svg'
                alt='Talismoons Instagram'
              />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Twitter</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For the latest announcements and updates.
              </div>
            </Col>
            <Col xs={24}>
              <img
                src='/home/icons/Logo-Twitter.svg'
                alt='Talismoons Twitter'
              />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Discord</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For connecting with the Totem Community.
              </div>
            </Col>
            <Col xs={24}>
              <img
                src='/home/icons/Logo-Discord.svg'
                alt='Talismoons Discord'
              />
            </Col>
          </div>
        </Col>
      </Row>
    </>
  )
}
