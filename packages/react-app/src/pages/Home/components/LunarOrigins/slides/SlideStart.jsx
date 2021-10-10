import React from 'react'
import { Row, Col } from 'antd'

export default function Slide1({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <div
        style={{
          float: 'left',
          height: 'calc(100vh - 47px)',
          width: '50%'
        }}
      >
        <iframe
          src='https://player.vimeo.com/video/617410607?h=8893bbc9b4&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; picture-in-picture'
          //allowFullScreen
          style={{
            float: 'left',
            height: '100%',
            width: '100%'
          }}
          title='Talismoons Moon Origin'
        />
        {/*
        <img
          src='/home/lunarPhases/waxing_crescent.svg'
          style={{ float: 'left', height: '100%', width: '100%' }}
        />
        */}
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
        Talismoons were first discovered on the Ethereum blockchain but they are
        believed to originate from the Moon.
      </div>
    </Row>
  )
}
