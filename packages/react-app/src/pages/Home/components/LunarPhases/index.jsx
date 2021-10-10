import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SlideStart, Slide } from './slides'
import Dots from './Dots'
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
    <>
      <Row>
        <Col xs={24}>
          <Slider {...sliderSettings}>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <SlideStart
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                />
                <Dots activeDotNumber={1} />
                <ExploreAllBox
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarPhases/new_moon.svg'
                  title='New Moon'
                  description='New Begging, Virgninal'
                />
                <Dots activeDotNumber={2} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarPhases/waxing_crescent.svg'
                  title='Waxing Crescent'
                  description='Youth, open'
                />
                <Dots activeDotNumber={3} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarPhases/first_quarter.svg'
                  title='First Quarter'
                  description='Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.'
                />
                <Dots activeDotNumber={4} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarPhases/waxing_gibbous.svg'
                  title='Waxing Gibbous'
                  description='Exhuberance, excitement, fertile'
                />
                <Dots activeDotNumber={5} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarPhases/full_moon.svg'
                  title='Full Moon'
                  description='Pinnacle, peak, climax'
                />
                <Dots activeDotNumber={6} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarPhases/waning_gibbous.svg'
                  title='Waning Gibbous'
                  description='The Day after, Reflection'
                />
                <Dots activeDotNumber={7} />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarPhases/last_quarter.svg'
                title='Last Quarter'
                description='Last Hurrah, Realization Dawning of the Mind'
              />
              <Dots activeDotNumber={8} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarPhases/waning_crescent.svg'
                title='Waning Crescent'
                description='Old, Wise, Calm, Enlightenment'
              />
              <Dots activeDotNumber={9} />
            </div>
          </Slider>
        </Col>
      </Row>
    </>
  )
}
