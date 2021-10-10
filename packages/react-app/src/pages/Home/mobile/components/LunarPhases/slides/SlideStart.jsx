import React from 'react'

export default function SlideStart({ ethereumProps, nftAppProps }) {
  return (
    <div>
      <div
        style={{
          float: 'left',
          height: '60vh',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <img
          src='/home/lunarPhases/waxing_crescent.svg'
          style={{ height: '100%', margin: 'auto' }}
        />
      </div>
      <div
        style={{
          padding: '5%',
          fontSize: '50px',
          fontWeight: 300,
          lineHeight: '60px'
        }}
      >
        Each Talismoon is born under a particular Lunar Phase.
      </div>
    </div>
  )
}
