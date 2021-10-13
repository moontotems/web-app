import React from 'react'
// https://www.npmjs.com/package/videojs-react-enhanced
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'

export default function SlideNameAndTitle() {
  const playerOptions = {
    src: 'https://talismoonstest.blob.core.windows.net/creatures/TALISMOON_CARD_3D_VIMEO.mp4',
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
