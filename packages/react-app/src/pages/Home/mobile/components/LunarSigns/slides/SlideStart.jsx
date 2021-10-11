import React from 'react'
import { Row, Col } from 'antd'

export default function SlideStart({ ethereumProps, nftAppProps }) {
  return (
    <>
      <div
        style={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <img src='/home/lunarMonths/512/01_ghost_moon.jpg' alt='Lunar Signs' />
      </div>

      <div style={{ height: '40vh', marginTop: '2%', overflow: 'hidden' }}>
        <div
          style={{
            padding: '5%',
            fontSize: '50px',
            fontWeight: 300,
            lineHeight: '60px'
          }}
        >
          Each Talismoon is born under a particular Lunar Sign defined by the
          Phase and Month of the Moon.
        </div>
      </div>
    </>
  )
}
