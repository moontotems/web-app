import React from 'react'
// https://www.npmjs.com/package/videojs-react-enhanced
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'

export default function Slide0() {
  const playerOptions = {
    //src: 'https://moontotems.blob.core.windows.net/website-assets/videos/MoonTotems_MOONTURN_2K_VIMEO.mp4',
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
        {/*
        <VREPlayer
          playerOptions={playerOptions}
          videojsOptions={videojsOptions}
        />
        */}
        <img
          src={'/moontotems_origin_map_full.jpg'}
          style={{ float: 'left', width: '100%' }}
        />
      </div>
    </div>
  )
}
