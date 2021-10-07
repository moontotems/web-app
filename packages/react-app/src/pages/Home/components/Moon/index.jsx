import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Slide1, RegionSlide } from './slides'

export default function CMoonSection({ ethereumProps, nftAppProps }) {
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
          <div style={{ padding: '24px', fontSize: '20px' }}>Lunar Origins</div>
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
            Talsimoons come from the moon.
          </div>
        </Col>
        <Col xs={24}>
          <Slider {...sliderSettings}>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide1
                  ethereumProps={ethereumProps}
                  nftAppProps={nftAppProps}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <RegionSlide
                  activePageNumber={1}
                  image={'/home/moon/bay_of_harmony.jpeg'}
                  icon={'/home/moon/bay_of_harmony.svg'}
                  lunarOriginName={'Sea of Rains'}
                  lunarOriginNameLatin={'Mare Imbrium'}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <RegionSlide
                  activePageNumber={2}
                  image={'/home/moon/sea_of_fertility.jpeg'}
                  icon={'/home/moon/sea_of_fertility.svg'}
                  lunarOriginName={'Sea of Fertility'}
                  lunarOriginNameLatin={'Mare Fecunditatis'}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <RegionSlide
                  activePageNumber={3}
                  image={'/home/moon/sea_of_tranquility.jpeg'}
                  icon={'/home/moon/sea_of_tranquility.svg'}
                  lunarOriginName={'Sea of Tranquility'}
                  lunarOriginNameLatin={'Mare Tranquillitatis'}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <RegionSlide
                  activePageNumber={4}
                  image={'/home/moon/sea_of_clouds.jpeg'}
                  icon={'/home/moon/sea_of_clouds.svg'}
                  lunarOriginName={'Sea of Clouds'}
                  lunarOriginNameLatin={'Mare Nubium'}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <RegionSlide
                  activePageNumber={5}
                  image={'/home/moon/sea_of_islands.jpeg'}
                  icon={'/home/moon/sea_of_islands.svg'}
                  lunarOriginName={'Sea of Islands'}
                  lunarOriginNameLatin={'Mare Insularum'}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <RegionSlide
                  activePageNumber={6}
                  image={'/home/moon/lake_of_dreams.jpeg'}
                  icon={'/home/moon/lake_of_dreams.svg'}
                  lunarOriginName={'Lake of Dreams'}
                  lunarOriginNameLatin={'Lacus Somniorum'}
                />
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <RegionSlide
                activePageNumber={7}
                image={'/home/moon/bay_of_rainbows.jpeg'}
                icon={'/home/moon/bay_of_rainbows.svg'}
                lunarOriginName={'Bay of Rainbows'}
                lunarOriginNameLatin={'Sinus Iridum'}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <RegionSlide
                activePageNumber={8}
                image={'/home/moon/peninsula_of_thunder.jpeg'}
                icon={'/home/moon/peninsula_of_thunder.svg'}
                lunarOriginName={'Peninsula of Thunder'}
                lunarOriginNameLatin={'Peninsula Fulminum'}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <RegionSlide
                activePageNumber={9}
                image={'/home/moon/bay_of_harmony.jpeg'}
                icon={'/home/moon/bay_of_harmony.svg'}
                lunarOriginName={'Bay of Harmony'}
                lunarOriginNameLatin={'Sinus Concordiae'}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <RegionSlide
                activePageNumber={10}
                image={'/home/moon/bay_of_success.jpeg'}
                icon={'/home/moon/bay_of_success.svg'}
                lunarOriginName={'Bay of Success'}
                lunarOriginNameLatin={'Sinus Successus'}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <RegionSlide
                activePageNumber={11}
                image={'/home/moon/bay_of_love.jpeg'}
                icon={'/home/moon/bay_of_love.svg'}
                lunarOriginName={'Bay of Love'}
                lunarOriginNameLatin={'Sinus Amoris'}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <RegionSlide
                activePageNumber={12}
                image={'/home/moon/lake_of_time.jpeg'}
                icon={'/home/moon/lake_of_time.svg'}
                lunarOriginName={'Lake of Time'}
                lunarOriginNameLatin={'Lacus Temporis'}
              />
            </div>
          </Slider>
        </Col>
      </Row>
    </>
  )
}
