import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { sample } from 'underscore'
import Slide from './Slide'

export default function MySlider({
  ethereumProps,
  nftAppProps,
  slideDirectionLeft
}) {
  const { creatures } = nftAppProps

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 6000,
    cssEase: 'linear',
    slidesToShow: 5,
    slidesToScroll: 1,
    rtl: !slideDirectionLeft,
    infinite: true,
    swipeToSlide: false,
    centerMode: true,
    focusOnSelect: true,
    arrows: false,
    dots: false
  }

  const sliderCreatures = sample(creatures.all, 15)

  return (
    <Slider {...sliderSettings}>
      {sliderCreatures.map((creature, index) => {
        return (
          <div key={`slide-${index}`} style={{ float: 'left', width: '50%' }}>
            <div style={{ position: 'relative' }}>
              <Slide
                ethereumProps={ethereumProps}
                nftAppProps={nftAppProps}
                creature={creature}
              />
            </div>
          </div>
        )
      })}
    </Slider>
  )
}
