import React, { useState, useEffect } from 'react'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slide from './Slide'

export default function MySlider({
  slideContents,
  setCurrentSlideIndex,
  sliderRef,
  setSliderRef
}) {
  useEffect(() => {
    document.onkeydown = e => {
      e.preventDefault()
      const LEFT_KEY = 37
      const RIGHT_KEY = 39

      if (e.which == LEFT_KEY) {
        sliderRef.slickPrev()
      }
      if (e.which == RIGHT_KEY) {
        sliderRef.slickNext()
      }
    }
  }, [sliderRef])

  const sliderSettings = {
    ref: slider => setSliderRef(slider),
    infinite: true,
    //initialSlide: 3,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    //appendDots: dots => $('#slickDots'),
    arrows: false,
    //nextArrow: null,
    //prevArrow: null,
    // https://react-slick.neostack.com/docs/api/#lazyLoad
    //lazyLoad: true,
    //onSwipe: () => console.log('onSwipe'),
    beforeChange: (current, next) => setCurrentSlideIndex(next)
    //afterChange: current => {}
  }

  return (
    <Slider {...sliderSettings}>
      {slideContents.map((slideContent, index) => {
        return (
          <div key={`slide-${index}`} style={{ float: 'left', width: '50%' }}>
            <div style={{ position: 'relative' }}>
              <Slide image={slideContent.image} />
            </div>
          </div>
        )
      })}
    </Slider>
  )
}
