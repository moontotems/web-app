import React from 'react'
import Dots from '../Dots'

export default function Slide({ image, title, description }) {
  return (
    <>
      <div
        style={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <img src={image} alt={title} />
      </div>

      <div style={{ height: '40vh', marginTop: '2%', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center' }}>
          <Dots activeDotNumber={2} />
        </div>
        <div style={{ padding: '5%', paddingBottom: 0, fontSize: '35px' }}>
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
          {description}
        </div>
      </div>
    </>
  )
}
