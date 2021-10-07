import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { LunarPhaseSlider, LunarMonthSlider } from './slides'

export default function LunarSignsSection({ ethereumProps, nftAppProps }) {
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
    <>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>Lunar Signs</div>
        </Col>
        <Col xs={24} md={10}>
          <div
            style={{
              padding: '20px',
              fontSize: '27px',
              fontWeight: 300,
              lineHeight: '43px'
            }}
          >
            Each Talismoon is born under a particular Lunar Sign. Swipe left to
            learn more.
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={5} />
        <Col xs={24} md={8}>
          <div style={{ padding: '24px', fontSize: '20px' }}>Lunar Phases</div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ padding: '24px', fontSize: '20px' }}>Lunar Months</div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={5} />
        <Col xs={24} md={8}>
          <LunarPhaseSlider />
        </Col>
        <Col xs={24} md={8}>
          <LunarMonthSlider />
        </Col>
      </Row>
    </>
  )
}
