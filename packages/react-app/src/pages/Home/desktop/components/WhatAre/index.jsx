import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'
// https://www.npmjs.com/package/videojs-react-enhanced
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'

export default function Section({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <>
      <div style={{ height: '70vh', overflow: 'hidden' }}>
        <div style={{ float: 'right', width: '80%', height: '100%' }}>
          <div style={{ float: 'right', width: '100%', height: '100%' }}>
            <iframe
              src='https://player.vimeo.com/video/620510465?h=8893bbc9b4&amp;badge=0&amp;autoplay=1&amp;loop=1&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
              frameBorder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              autoPlay
              style={{
                float: 'right',
                width: '100%',
                height: '100%'
              }}
              title='Moon Totems Blink'
            />
          </div>

          <Link
            className='explore-box'
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              top: 'calc(70vh - 100px)',
              right: 0,
              height: '150px',
              width: '300px',
              padding: '15px'
            }}
          >
            <div style={{ fontSize: '17px' }}>Get your MOON TOTEM</div>
            <ArrowRight32
              style={{
                position: 'absolute',
                bottom: 15,
                right: 15,
                color: '#00FF74'
              }}
            />
          </Link>
        </div>
      </div>
      <div
        style={{
          height: '30vh',
          marginTop: '2%',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            float: 'left',
            width: '25%',
            padding: '25px',
            fontSize: '20px'
          }}
        >
          What are Moon Totems?
        </div>
        <div
          style={{
            float: 'left',
            width: '40%',
            padding: '20px',
            fontSize: '27px',
            fontWeight: 300,
            lineHeight: '35px'
          }}
        >
          Moon Totems are beautiful crypto talismans from the moon and
          discovered on the Ethereum blockchain.
        </div>
      </div>
    </>
  )
}
