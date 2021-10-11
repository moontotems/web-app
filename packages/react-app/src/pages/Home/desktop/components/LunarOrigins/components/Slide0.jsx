import React from 'react'

export default function Slide0() {
  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          float: 'left',
          height: 'calc(100vh - 47px)',
          width: '50%'
        }}
      >
        <iframe
          src='https://player.vimeo.com/video/617410607?h=8893bbc9b4&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay; picture-in-picture'
          //allowFullScreen
          style={{
            float: 'left',
            height: '100%',
            width: '100%'
          }}
          title='Talismoons Moon Origin'
        />
        {/*
        <img
          src='/home/lunarPhases/waxing_crescent.svg'
          style={{ float: 'left', height: '100%', width: '100%' }}
        />
        */}
      </div>
    </div>
  )
}
