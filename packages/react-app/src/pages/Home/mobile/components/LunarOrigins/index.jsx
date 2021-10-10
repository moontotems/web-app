import React, { useState, useEffect } from 'react'
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
              image='/home/lunarOrigins/sea_of_rains.jpeg'
              icon='/home/lunarOrigins/sea_of_rains.svg'
              title='Sea of Rains'
              subtitle='Mare Imbrium'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/sea_of_fertility.jpeg'
              icon='/home/lunarOrigins/sea_of_fertility.svg'
              title='Sea of Fertility'
              subtitle='Mare Fecunditatis'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/sea_of_tranquility.jpeg'
              icon='/home/lunarOrigins/sea_of_tranquility.svg'
              title='Sea of Tranquility'
              subtitle='Mare Tranquillitatis'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/sea_of_clouds.jpeg'
              icon='/home/lunarOrigins/sea_of_clouds.svg'
              title='Sea of Clouds'
              subtitle='Mare Nubium'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/sea_of_islands.jpeg'
              icon='/home/lunarOrigins/sea_of_islands.svg'
              title='Sea of Islands'
              subtitle='Mare Insularum'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/lake_of_dreams.jpeg'
              icon='/home/lunarOrigins/lake_of_dreams.svg'
              title='Lake of Dreams'
              subtitle='Lacus Somniorum'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/bay_of_rainbows.jpeg'
              icon='/home/lunarOrigins/bay_of_rainbows.svg'
              title='Bay of Rainbows'
              subtitle='Sinus Iridum'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/peninsula_of_thunder.jpeg'
              icon='/home/lunarOrigins/peninsula_of_thunder.svg'
              title='Peninsula of Thunder'
              subtitle='Peninsula Fulminum'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/bay_of_harmony.jpeg'
              icon='/home/lunarOrigins/bay_of_harmony.svg'
              title='Bay of Harmony'
              subtitle='Sinus Concordiae'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/bay_of_success.jpeg'
              icon='/home/lunarOrigins/bay_of_success.svg'
              title='Bay of Success'
              subtitle='Sinus Successus'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/bay_of_love.jpeg'
              icon='/home/lunarOrigins/bay_of_love.svg'
              title='Bay of Love'
              subtitle='Sinus Amoris'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/lunarOrigins/lake_of_time.jpeg'
              icon='/home/lunarOrigins/lake_of_time.svg'
              title='Lake of Time'
              subtitle='Lacus Temporis'
              text='Talismoons were first discovered on the Ethereum blockchain but they are believed to originate from the Moon.'
            />
          </div>
        </div>
      </Slider>
    </div>
  )
}
