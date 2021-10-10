import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import $ from 'jquery'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Slide0, Slide1, Slide2, Slide3, Slide4, Slide5 } from './slides'
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
      <Row style={{ marginTop: '30px' }}>
        <Col xs={24}>
          <Slider {...sliderSettings}>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide0
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
                <Slide1
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                />
                <Dots activeDotNumber={2} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide2
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                />
                <Dots activeDotNumber={3} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide3
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                />
                <Dots activeDotNumber={4} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide4
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                />
                <Dots activeDotNumber={5} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide5
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                />
                <Dots activeDotNumber={6} />
              </div>
            </div>
          </Slider>
        </Col>
      </Row>
    </>
  )
}
