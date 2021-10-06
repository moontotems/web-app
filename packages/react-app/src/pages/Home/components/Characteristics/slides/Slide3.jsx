import React from 'react'
import Dots from './Dots'

export default function Slide3({ ethereumProps, nftAppProps }) {
  return (
    <div>
      <iframe
        src='https://player.vimeo.com/video/617410607?h=622663591&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
        frameBorder='0'
        allow='autoplay;'
        //allow='autoplay; fullscreen; picture-in-picture'
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '80vh'
        }}
        title='Talismoons Eyes'
      />
      {/*
      <img
        src='/home/TALISMOON_CARDFLIP_FULL_03963_EYES.jpg'
        style={{ position: 'absolute', top: 0, left: 0, height: '80vh' }}
      />
      */}

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
        The Eyes are the window to the soul. <br />
        <br />
        Talismoons eyes have different shapes, they can be asymmetrical or even
        prismatic.
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
        <Dots activeDotNumber={3} />
      </div>
    </div>
  )
}
