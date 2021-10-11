import React from 'react'
import { Row, Col } from 'antd'

export default function SlideStart({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <div
        style={{
          float: 'left',
          height: 'calc(100vh - 47px)',
          maxWidth: '50%',
          padding: '10%'
        }}
      >
        <img
          src='/home/lunarMonths/1080/01_ghost_moon.jpg'
          style={{ float: 'left', width: '100%' }}
        />
      </div>
      <div
        style={{
          width: '50%',
          display: 'flex',
          flexFlow: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '55px',
          fontWeight: '300',
          lineHeight: '60px'
        }}
      >
        Each Talismoon is born under a particular Lunar Month.
      </div>
    </Row>
  )
}
