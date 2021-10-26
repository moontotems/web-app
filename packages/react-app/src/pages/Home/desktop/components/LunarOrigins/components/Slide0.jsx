import React from 'react'
// https://www.npmjs.com/package/videojs-react-enhanced
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'

export default function Slide0() {
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
        <div style={{ padding: '100% 0 0 0', position: 'relative' }}>
          <iframe
            src='https://player.vimeo.com/video/617410607?h=48cb560830&amp;badge=0&amp;autoplay=1&amp;loop=1&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            title='Moon Totems Moon Rotate'
          />
        </div>
      </div>
    </div>
  )
}
