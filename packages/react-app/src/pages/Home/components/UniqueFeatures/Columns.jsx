import React from 'react'
import { Row, Col } from 'antd'

export default function Columns({ ethereumProps, nftAppProps }) {
  return (
    <>
      <Row gutter={[8, 24]}>
        <Col xs={24} md={5} />
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/edit_totem_bio_photo_1.jpeg'
              alt='Talismoons Chat'
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
              <div style={{ fontSize: '22px', fontWeight: 400 }}>
                Its an Oracle
              </div>
            </Col>
            <Col xs={24} style={{ height: '160px' }}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Talismoons can answer questions and give advice on matters large
                and small.
              </div>
            </Col>
            <Col xs={24}>
              <img src='/home/icons/Icon-Chat.svg' alt='Talismoons Chat' />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/edit_totem_bio_photo_2.jpeg'
              alt='Talismoons Story'
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
              <div style={{ fontSize: '22px', fontWeight: 400 }}>
                Create a Story
              </div>
            </Col>
            <Col xs={24} style={{ height: '160px' }}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Holders can write a diary or bio of their Totem. The story will
                be permanently logged on the blockchain at each transaction.
              </div>
            </Col>
            <Col xs={24}>
              <img src='/home/icons/Icon-Edit.svg' alt='Talismoons Story' />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0003.jpeg'
              alt='Talismoons Zoom In'
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
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Zoom In</div>
            </Col>
            <Col xs={24} style={{ height: '160px' }}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Experience the full details and textures.
              </div>
            </Col>
            <Col xs={24}>
              <img src='/home/icons/Icon-Zoom.svg' alt='Talismoons Zoom In' />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={4} />
      </Row>
    </>
  )
}
