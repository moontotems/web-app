import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SlideStart, Slide } from './slides'
import Dots from './Dots'
import ExploreAllBox from './ExploreAllBox'

export default function LunarOriginsSection({ ethereumProps, nftAppProps }) {
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
    //initialSlide: 3
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
                  image='/home/lunarOrigins/sea_of_rains.jpeg'
                  icon='/home/lunarOrigins/sea_of_rains.svg'
                  title='Sea of Rains'
                  subtitle='Mare Imbrium'
                  description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
                />
                <Dots activeDotNumber={2} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarOrigins/sea_of_fertility.jpeg'
                  icon='/home/lunarOrigins/sea_of_fertility.svg'
                  title='Sea of Fertility'
                  subtitle='Mare Fecunditatis'
                  description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
                />
                <Dots activeDotNumber={3} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarOrigins/sea_of_tranquility.jpeg'
                  icon='/home/lunarOrigins/sea_of_tranquility.svg'
                  title='Sea of Tranquility'
                  subtitle='Mare Tranquillitatis'
                  description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
                />
                <Dots activeDotNumber={4} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarOrigins/sea_of_clouds.jpeg'
                  icon='/home/lunarOrigins/sea_of_clouds.svg'
                  title='Sea of Clouds'
                  subtitle='Mare Nubium'
                  description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
                />
                <Dots activeDotNumber={5} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarOrigins/sea_of_islands.jpeg'
                  icon='/home/lunarOrigins/sea_of_islands.svg'
                  title='Sea of Islands'
                  subtitle='Mare Insularum'
                  description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
                />
                <Dots activeDotNumber={6} />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  image='/home/lunarOrigins/lake_of_dreams.jpeg'
                  icon='/home/lunarOrigins/lake_of_dreams.svg'
                  title='Lake of Dreams'
                  subtitle='Lacus Somniorum'
                  description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
                />
                <Dots activeDotNumber={7} />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarOrigins/bay_of_rainbows.jpeg'
                icon='/home/lunarOrigins/bay_of_rainbows.svg'
                title='Bay of Rainbows'
                subtitle='Sinus Iridum'
                description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
              />
              <Dots activeDotNumber={8} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarOrigins/peninsula_of_thunder.jpeg'
                icon='/home/lunarOrigins/peninsula_of_thunder.svg'
                title='Peninsula of Thunder'
                subtitle='Peninsula Fulminum'
                description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
              />
              <Dots activeDotNumber={9} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarOrigins/bay_of_harmony.jpeg'
                icon='/home/lunarOrigins/bay_of_harmony.svg'
                title='Bay of Harmony'
                subtitle='Sinus Concordiae'
                description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
              />
              <Dots activeDotNumber={10} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarOrigins/bay_of_success.jpeg'
                icon='/home/lunarOrigins/bay_of_success.svg'
                title='Bay of Success'
                subtitle='Sinus Successus'
                description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
              />
              <Dots activeDotNumber={11} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarOrigins/bay_of_love.jpeg'
                icon='/home/lunarOrigins/bay_of_love.svg'
                title='Bay of Love'
                subtitle='Sinus Amoris'
                description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
              />
              <Dots activeDotNumber={12} />
            </div>
            <div style={{ position: 'relative' }}>
              <Slide
                image='/home/lunarOrigins/lake_of_time.jpeg'
                icon='/home/lunarOrigins/lake_of_time.svg'
                title='Lake of Time'
                subtitle='Lacus Temporis'
                description='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
              />
              <Dots activeDotNumber={12} />
            </div>
          </Slider>
        </Col>
      </Row>
    </>
  )
}
