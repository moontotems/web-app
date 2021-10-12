import React, { useState } from 'react'
import Dots from './components/Dots'
import SlideText from './components/SlideText'
import Slider from './components/Slider'
import ExploreBox from './components/ExploreBox'
import slideContents from './slideContents'

export default function Section({ ethereumProps, nftAppProps }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [sliderRef, setSliderRef] = useState()

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          padding: '5%',
          fontSize: '35px'
        }}
      >
        Unique Features
      </div>
      <Slider
        slideContents={slideContents}
        setCurrentSlideIndex={setCurrentSlideIndex}
        sliderRef={sliderRef}
        setSliderRef={setSliderRef}
      />
      <div
        style={{
          float: 'left',
          height: '40vh',
          width: '100%',
          fontSize: '50px',
          fontWeight: 300,
          lineHeight: '60px'
        }}
      >
        <Dots
          slideContents={slideContents}
          activeDotNumber={currentSlideIndex}
        />
        <SlideText
          slideContents={slideContents}
          currentSlideIndex={currentSlideIndex}
        />
        {currentSlideIndex === 0 && <ExploreBox sliderRef={sliderRef} />}
      </div>
    </div>
  )
}
