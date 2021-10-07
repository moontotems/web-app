import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slide from './Slide'

export default function LunarPhaseSlider({ ethereumProps, nftAppProps }) {
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
    //initialSlide: 3, // TODO:
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
    <Row>
      <Col xs={24}>
        <Slider {...sliderSettings}>
          <div style={{ float: 'left', width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <Slide
                activePageNumber={1}
                image={'/home/moon/sea_of_fertility.jpeg'}
                title={'/home/moon/sea_of_fertility.svg'}
                description={'New Moon'}
              />
            </div>
          </div>
          <div style={{ float: 'left', width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <Slide
                activePageNumber={2}
                image={'/home/moon/sea_of_fertility.jpeg'}
                title={'/home/moon/sea_of_fertility.svg'}
                description={'Half Moon'}
              />
            </div>
          </div>
        </Slider>
      </Col>
    </Row>
  )
}
