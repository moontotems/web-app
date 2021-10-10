import React from 'react'
import { Row, Col } from 'antd'

export default function Slide1({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <img
        src='/home/TALISMOON_CARD_SQUARE_03963.jpg'
        style={{ float: 'left', height: 'calc(100vh - 47px)' }}
      />
      <div style={{ float: 'left', width: '2%' }} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '55px',
          fontWeight: '300',
          lineHeight: '55px'
        }}
      >
        Each Talismoon is a <br /> one-of-a-kind.
      </div>
    </Row>
  )
}
