import React from 'react'
// https://www.npmjs.com/package/videojs-react-enhanced
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'

export default function SlideNameAndTitle() {
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          float: 'left',
          height: 'calc(100vh - 47px)',
          //height: '100%',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%'
        }}
      >
        <img
          src={'/home/characteristics/moon_totem_name.jpg'}
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%'
          }}
        />
        {/*
        <div style={{ padding: '100% 0 0 0', position: 'relative' }}>
          <iframe
            src='https://player.vimeo.com/video/630649090?h=99fe8b91fb&amp;badge=0&amp;autoplay=1&amp;loop=1&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            title='Moon Totem Names'
          />
        </div>
          */}
      </div>
    </div>
  )
}
