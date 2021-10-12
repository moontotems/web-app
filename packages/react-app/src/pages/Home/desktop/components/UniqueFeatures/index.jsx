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
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div
        style={{
          padding: '25px',
          fontSize: '20px'
        }}
      >
        Unique Features
      </div>
      <div
        style={{
          float: 'left',
          width: '50%'
        }}
      >
        <Slider
          slideContents={slideContents}
          setCurrentSlideIndex={setCurrentSlideIndex}
          sliderRef={sliderRef}
          setSliderRef={setSliderRef}
        />
      </div>
      <div
        style={{
          float: 'left',
          height: '100vh',
          width: '50%',
          fontSize: '50px',
          fontWeight: 300,
          lineHeight: '60px'
        }}
      >
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          {currentSlideIndex === 0 && (
            <SlideText0
              slideContents={slideContents}
              currentSlideIndex={currentSlideIndex}
            />
          )}
          {currentSlideIndex !== 0 && (
            <SlideText
              slideContents={slideContents}
              currentSlideIndex={currentSlideIndex}
            />
          )}

          <div
            style={{
              position: 'absolute',
              bottom: 250,
              right: 0,
              height: '150px',
              width: '350px',
              marginTop: '20%',
              padding: '15px'
            }}
          >
            <Dots
              slideContents={slideContents}
              activeDotNumber={currentSlideIndex}
            />
          </div>

          <ExploreBox
            sliderRef={sliderRef}
            currentSlideIndex={currentSlideIndex}
          />
        </div>
      </div>
    </div>
  )
}
