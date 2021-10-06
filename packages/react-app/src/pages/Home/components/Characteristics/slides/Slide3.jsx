import React from 'react'

export default function Slide3({ ethereumProps, nftAppProps }) {
  return (
    <div>
      <img
        src='/home/TALISMOON_CARDFLIP_FULL_03963_EYES.jpg'
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
        The Eyeys are the window to the soul. <br />
        <br />
        Talismoons eyes have different shapes, they can be asymmetrical or even
        prismatic.
      </div>
    </div>
  )
}
