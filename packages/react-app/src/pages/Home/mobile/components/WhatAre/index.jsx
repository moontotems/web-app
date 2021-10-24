import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'
// https://www.npmjs.com/package/videojs-react-enhanced
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'
import ExploreBox from './ExploreBox'

export default function Section({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  const playerOptions = {
    src: 'https://moontotems.blob.core.windows.net/website-assets/videos/MoonTotems_GEN01_BLINKYROTATE.COMP[0000-0832].mp4',
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
    <>
      <div style={{ height: '35vh', overflow: 'hidden' }}>
        <div style={{ float: 'right', width: '100%' }}>
          <div
            style={{
              float: 'left',
              height: '35vh',
              //height: '100%',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%'
            }}
          >
            {/*
            <VREPlayer
              playerOptions={playerOptions}
              videojsOptions={videojsOptions}
            />
            */}
            <img
              src={'/home/MOON_TOTEM_GEN01_BLINKYROTATE.jpg'}
              style={{ float: 'left', width: '100%' }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          height: '65vh',
          marginTop: '2%',
          padding: '5%',
          overflow: 'hidden'
        }}
      >
        <div style={{ paddingBottom: '5%', fontSize: '35px' }}>
          What are Moon Totems?
        </div>
        <div
          style={{
            fontSize: '50px',
            fontWeight: 300,
            lineHeight: '60px'
          }}
        >
          Moon Totems are digital talismans from the moon and discovered on the
          Ethereum blockchain.
        </div>

        <ExploreBox nftAppProps={nftAppProps} />
      </div>
    </>
  )
}
