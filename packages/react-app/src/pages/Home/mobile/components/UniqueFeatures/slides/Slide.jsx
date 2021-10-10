import React from 'react'
import Dots from '../Dots'

export default function Slide({ image, icon, title, text }) {
  return (
    <>
      <div
        style={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src={image} alt={title} style={{ width: '100%' }} />
      </div>

      <div style={{ height: '40vh', marginTop: '2%', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center' }}>
          <Dots activeDotNumber={2} />
        </div>
        <div style={{ float: 'left', width: '100px' }}>
          <img
            src={'home/uniqueFeatures/icons/Icon-Chat.svg'}
            style={{ width: 'auto' }}
          />
        </div>
        <div style={{ float: 'left', width: 'calc(100% - 100px)' }}>
          <div
            style={{
              padding: '5%',
              paddingBottom: 0,
              fontSize: '35px'
            }}
          >
            {title}
          </div>
          <div
            style={{
              padding: '5%',
              fontSize: '50px',
              fontWeight: 300,
              lineHeight: '60px'
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </>
  )
}
