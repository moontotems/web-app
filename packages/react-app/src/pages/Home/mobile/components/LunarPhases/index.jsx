import React, { useState, useEffect } from 'react'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SlideStart, Slide } from './slides'
import ExploreAllBox from './ExploreAllBox'

export default function Section({ ethereumProps, nftAppProps }) {
  const [sliderRef, setSliderRef] = useState()

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
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    //appendDots: dots => $('#slickDots'),
    arrows: false,
    //nextArrow: null,
    //prevArrow: null,
    // https://react-slick.neostack.com/docs/api/#lazyLoad
    //lazyLoad: true,
    onSwipe: () => console.log('onSwipe'),
    // afterChange: () => this.setState(state => ({ updateCount: state.updateCount + 1 })),
    // beforeChange: (current, next) => this.setState({ slideIndex: next })
    // afterChange: () => setCurrentCreatureIndex(currentCreatureIndex + 1),
    afterChange: current => {},
    beforeChange: (current, next) => {}
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Slider {...sliderSettings}>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <SlideStart ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
          <ExploreAllBox
            ethereumProps={ethereumProps}
            nftAppProps={nftAppProps}
          />
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarPhases/new_moon.svg'
              title='New Moon'
              text='New Begging, Virgninal'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarPhases/waxing_crescent.svg'
              title='Waxing Crescent'
              text='Youth, open'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarPhases/first_quarter.svg'
              title='First Quarter'
              text='Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarPhases/waxing_gibbous.svg'
              title='Waxing Gibbous'
              text='Exhuberance, excitement, fertile'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarPhases/full_moon.svg'
              title='Full Moon'
              text='Pinnacle, peak, climax'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarPhases/waning_gibbous.svg'
              title='Waning Gibbous'
              text='The Day after, Reflection'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarPhases/last_quarter.svg'
              title='Last Quarter'
              text='Last Hurrah, Realization Dawning of the Mind'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarPhases/waning_crescent.svg'
              title='Waning Crescent'
              text='Old, Wise, Calm, Enlightenment'
            />
          </div>
        </div>
      </Slider>
    </div>
  )
}
