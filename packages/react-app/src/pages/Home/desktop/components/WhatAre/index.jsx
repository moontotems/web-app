import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'
import slideContents from './slideContents'
import Slider from './components/Slider'

export default function Section({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [sliderRef, setSliderRef] = useState()

  return (
    <>
      <div style={{ height: '70vh', overflow: 'hidden' }}>
        <div style={{ float: 'right', width: '100%', height: '100%' }}>
          <div
            style={{
              float: 'left',
              width: '100%'
            }}
          >
            <Slider
              slideContents={slideContents}
              currentSlideIndex={currentSlideIndex}
              setCurrentSlideIndex={setCurrentSlideIndex}
              sliderRef={sliderRef}
              setSliderRef={setSliderRef}
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
