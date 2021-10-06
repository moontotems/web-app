import React from 'react'
import Dots from './Dots'

export default function Slide4({ ethereumProps, nftAppProps }) {
  return (
    <div>
      <img
        src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0003.jpeg'
        style={{ position: 'absolute', top: 0, left: 0, height: '80vh' }}
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
        Look closer and you can see that each Talismoon has a unique combination
        of textures, patterns and perforations.
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
        <Dots activeDotNumber={4} />
      </div>
    </div>
  )
}
