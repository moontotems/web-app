import React from 'react'

export default function Slide1({ ethereumProps, nftAppProps }) {
  return (
    <>
      <div style={{ height: '60vh', overflow: 'hidden' }}>
        <img
          src='/home/lunarOrigins/sea_of_rains.jpeg'
          style={{ float: 'left', width: '100%' }}
        />
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
          Talismoons is a next generation NFT project that aims to expand the
          features and possibilities exclusive to holders.
        </div>
      </div>
    </>
  )
}
