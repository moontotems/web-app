import React, { useState } from 'react'
import ExploreBox from './ExploreBox'
import slideContents from './slideContents'
import Slider from './components/Slider'

export default function Section({ ethereumProps, nftAppProps }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [sliderRef, setSliderRef] = useState()

  return (
    <>
      <div style={{ height: 'auto' }}>
        <div style={{ float: 'right', width: '100%' }}>
          <div
            style={{
              float: 'left',
              //height: '35vh',
              width: '100%',
              height: 'auto',
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
        <div style={{ paddingBottom: '5%', fontSize: '25px' }}>
          What are Moon Totems?
        </div>
        <div
          style={{
            fontSize: '23px',
            fontWeight: 300,
            lineHeight: '34px'
          }}
        >
          Moon Totems are digital talismans from the moon and discovered on the
          Ethereum blockchain.
        </div>
      </div>

      <ExploreBox nftAppProps={nftAppProps} />
    </>
  )
}
