import React, { useState } from 'react'
import Dots from './components/Dots'
import SlideText0 from './components/SlideText0'
import SlideText from './components/SlideText'
import Slider from './components/Slider'
import ExploreBox from './components/ExploreBox'
import slideContents from './slideContents'

export default function Section({ ethereumProps, nftAppProps }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [sliderRef, setSliderRef] = useState()

  return (
    <div style={{ height: 'auto' }}>
      <div
        style={{
          padding: '5%',
          fontSize: '35px'
        }}
      >
        Unique Characters
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
          width: '100%',
          fontSize: '50px',
          fontWeight: 300,
          lineHeight: '60px'
        }}
      >
        {currentSlideIndex !== 0 && (
          <>
            <Dots
              slideContents={slideContents}
              activeDotNumber={currentSlideIndex}
            />
            <SlideText
              slideContents={slideContents}
              currentSlideIndex={currentSlideIndex}
            />
          </>
        )}
        {currentSlideIndex === 0 && (
          <>
            <SlideText0
              slideContents={slideContents}
              currentSlideIndex={currentSlideIndex}
            />
            <ExploreBox sliderRef={sliderRef} />
          </>
        )}
      </div>
    </div>
  )
}
