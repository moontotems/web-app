import React from 'react'
// https://www.npmjs.com/package/react-player
import ReactPlayer from 'react-player'

export default function Slide0() {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={
          {
            //float: 'left'
            //height: 'calc(100vh - 47px)',
            //height: '100%'
          }
        }
      >
        {/*
        <ReactPlayer
          url='https://player.vimeo.com/video/617410607'
          playing={true}
          loop={true}
          controls={false}
          style={{
            //float: 'left'
            height: '100vh'
            //width: '100%'
          }}
          // https://developer.vimeo.com/player/sdk/embed
          config={{
            vimeo: {
              responsive: true
            }
          }}
        />
        {/*
        <iframe
          preload
          // eslint-disable-next-line react/no-unknown-property
          autoplay
          src='https://player.vimeo.com/video/617410607?h=8893bbc9b4&amp;badge=0&amp;autopause=0&amp;autoplay=1&amp;loop=1&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay;'
          //allowFullScreen
          style={{
            float: 'left',
            height: '100%',
            width: '100%'
          }}
          title='Talismoons Moon Origin'
        />
        */}
        {/*
         <iframe
          preload
          loop
          // eslint-disable-next-line react/no-unknown-property
          autoPlay
          //autoplay=1&loop=1&autopause=0"
          src='https://player.vimeo.com/video/617410607?h=8893bbc9b4&amp;badge=0&amp;autopause=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479'
          frameBorder='0'
          allow='autoplay;'
          //allowFullScreen
          style={{
            float: 'left',
            height: '100%',
            width: '100%'
          }}
          title='Talismoons Moon Origin'
        />
        */}
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
