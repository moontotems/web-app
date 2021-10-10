import React from 'react'
import { Row, Col } from 'antd'

export default function Slide1({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <img
        src='home/uniqueFeatures/talismoon_chat.jpg'
        style={{ float: 'left', height: 'calc(100vh - 47px)' }}
      />
      <div style={{ float: 'left', width: '2%' }} />
      <div style={{ float: 'left', marginTop: '15px' }}>
        <div
          style={{
            position: 'absolute',
            fontWeight: '300'
          }}
        >
          <div
            style={{
              width: '100%',
              marginBottom: '55px',
              fontSize: '55px',
              fontWeight: '300',
              lineHeight: '60px'
            }}
          >
            Talismoons is a next
            <br /> generation NFT project that aims to <br /> expand the
            features and possibilities
            <br /> exclusive to holders.
          </div>
        </div>
      </div>
    </Row>
  )
}
