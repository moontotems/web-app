import React from 'react'
// https://www.npmjs.com/package/videojs-react-enhanced
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'

export default function Slide0() {
  const playerOptions = {
    src: 'https://talismoonstest.blob.core.windows.net/creatures/TALISMOON_OUTLINE_LOOP.mp4',
    preload: true,
    controls: false,
    autoplay: 'play',
    loop: true,
    muted: true
  }
  const videojsOptions = {
    fluid: true
  }

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
        <VREPlayer
          playerOptions={playerOptions}
          videojsOptions={videojsOptions}
        />
      </div>
    </div>
  )
}
