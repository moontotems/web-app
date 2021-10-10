import React from 'react'

export default function Slide1({ ethereumProps, nftAppProps }) {
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
          src='/home/TALISMOON_CARD_SQUARE_03963.jpg'
          style={{ width: '100%', margin: 'auto' }}
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
        Each Talismoon is a one-of-a-kind.
      </div>
    </div>
  )
}
