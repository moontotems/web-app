import React, { useState } from 'react'
import ExploreBox from './ExploreBox'
import slideContents from './slideContents'
import Slider from './components/Slider'

export default function Section({ ethereumProps, nftAppProps }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [sliderRef, setSliderRef] = useState()

  return (
    <>
      <div style={{ height: '35vh', overflow: 'hidden' }}>
        <div style={{ float: 'right', width: '100%' }}>
          <div
            style={{
              float: 'left',
              height: '35vh',
              width: '100%',
              //height: '100%',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto'
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
        </div>
      </div>
      <div
        style={{
          height: 'auto',
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
