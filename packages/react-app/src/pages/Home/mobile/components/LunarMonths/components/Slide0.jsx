import React from 'react'
// https://www.npmjs.com/package/videojs-react-enhanced
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'

export default function Slide0() {
  const playerOptions = {
    src: 'https://talismoonstest.blob.core.windows.net/creatures/MOONTURN_2K_VIMEO.mp4',
    preload: 'auto',
    controls: false,
    playsinline: true,
    autoplay: 'play',
    muted: true,
    loop: true
  }
  const videojsOptions = {
    fluid: true
  }

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          float: 'left',
          display: 'block',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto'
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
