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
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_chat.jpg'
              title='TALISMOON CHAT'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_bio.jpg'
              title='TALISMOON STORIES'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_zoom_and_pan.jpg'
              title='TALISMOON ZOOM'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_community.jpg'
              title='TALISMOON COMMUNITY'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_community.jpg'
              title='TALISMOON ASSETS'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_community.jpg'
              title='TALISMOON'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_community.jpg'
              title='TALISMOON FUTURE'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_community.jpg'
              title='TALISMOON ROLEPLAY'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
        <div style={{ float: 'left', width: '100%', height: '100vh' }}>
          <div style={{ position: 'relative' }}>
            <Slide
              image='/home/uniqueFeatures/talismoon_community.jpg'
              title='TALISMOON METAVERSE'
              text='Season of ancestry, remembering those who came before us, now living in our memories.'
            />
          </div>
        </div>
      </Slider>
    </div>
  )
}
