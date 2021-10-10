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
                  image='/home/lunarMonths/01_ghost_moon.svg'
                  title='Ghost Moon'
                  description='Season of ancestry, remembering those who came before us, now living in our memories.'
                />
                <Dots activeDotNumber={2} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarMonths/02_snow_moon.svg'
                  title='Snow Moon'
                  description='Crystalize fluid situations'
                />
                <Dots activeDotNumber={3} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarMonths/03_crow_moon.svg'
                  title='Crow Moon'
                  description='Opportunists, harbringers, and observers'
                />
                <Dots activeDotNumber={4} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarMonths/04_fish_moon.svg'
                  title='Fish Moon'
                  description='Comfortable under pressure'
                />
                <Dots activeDotNumber={5} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarMonths/05_milk_moon.svg'
                  title='Milk Moon'
                  description='Fluid and maternal'
                />
                <Dots activeDotNumber={6} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarMonths/06_honey_moon.svg'
                  title='Honey Moon'
                  description='Collective effort'
                />
                <Dots activeDotNumber={7} />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarMonths/07_thunder_moon.svg'
                title='Thunder Moon'
                description='Energetic, shocking'
              />
              <Dots activeDotNumber={8} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarMonths/08_buck_moon.svg'
                title='Buck Moon'
                description='Easily provoked, horny'
              />
              <Dots activeDotNumber={9} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarMonths/09_harvest_moon.svg'
                title='Harvest Moon'
                description='Abundant'
              />
              <Dots activeDotNumber={10} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarMonths/10_leaf_moon.svg'
                title='Leaf Moon'
                description='Traveller, nomadic'
              />
              <Dots activeDotNumber={11} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarMonths/11_blood_moon.svg'
                title='Blood Moon'
                description='Surrounded by three concentric rings of mountains, uplifted by the colossal impact event that excavated it.'
              />
              <Dots activeDotNumber={12} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarMonths/12_oak_moon.svg'
                title='Oak Moon'
                description='Static, stoic, stable, solid'
              />
              <Dots activeDotNumber={13} />
            </div>
          </Slider>
        </Col>
      </Row>
    </>
  )
}
