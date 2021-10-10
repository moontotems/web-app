import React from 'react'
import { Row, Col } from 'antd'

export default function Slide1({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <div
        style={{
          float: 'left',
          height: 'calc(100vh - 47px)',
          maxWidth: '50%',
          padding: '5%'
        }}
      >
        <img
          src='/home/lunarPhases/waxing_crescent.svg'
          style={{ float: 'left', height: '100%', width: '100%' }}
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
        Each Talismoon is born under a particular Lunar Phase.
      </div>
    </Row>
  )
}
