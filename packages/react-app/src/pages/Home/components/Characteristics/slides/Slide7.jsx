import React from 'react'
import Dots from './Dots'

export default function Slide6({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <div>
      <img
        src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0002.jpeg'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '80vh',
          padding: '5%'
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '10vh',
          right: '5%',
          height: '150px',
          width: '350px',
          padding: '15px',
          fontSize: '25px',
          fontWeight: '300',
          lineHeight: '35px'
        }}
      >
        Every Talismoon has a Child Moon pendant.
      </div>
      <div
        style={{
          position: 'absolute',
          top: 'calc(30vh + 150px)',
          right: '10%',
          height: '150px',
          width: '180px',
          padding: '15px'
        }}
      >
        <Dots activeDotNumber={7} />
      </div>
    </div>
  )
}
