import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import $ from 'jquery'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Slide } from './slides'

export default function UniqueFeaturesSection({ ethereumProps, nftAppProps }) {
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
      <Row style={{ marginTop: '40px' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>
            Unique Features
          </div>
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
            Talismoons is a next generation NFT project
          </div>
        </Col>
        <Col xs={24}>
          <Slider {...sliderSettings}>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  activeDotNumber={1}
                  image={'home/uniqueFeatures/talismoon_chat.jpg'}
                  icon={'home/uniqueFeatures/icons/Icon-Chat.svg'}
                  title={'TALISMOON CHAT'}
                  subtitle={'It’s an Oracle'}
                  text1={
                    'Holders can consult their Talismoons on matters large and small.'
                  }
                  text2={''}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  activeDotNumber={2}
                  image={'home/uniqueFeatures/talismoon_bio.jpg'}
                  icon={'home/uniqueFeatures/icons/Icon-Edit.svg'}
                  title={'TALISMOON STORIES'}
                  subtitle={'You write the story'}
                  text1={
                    'Holders can build and elaborate the Talismoon narrative or mythology.'
                  }
                  text2={
                    'The best stories will be shared in the community and could perhaps increase the value of your Talismoon.'
                  }
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  activeDotNumber={3}
                  image={'home/uniqueFeatures/talismoon_zoom_and_pan.jpg'}
                  icon={'home/uniqueFeatures/icons/Icon-Zoom.svg'}
                  title={'TALISMOON ZOOM'}
                  subtitle={'See all the details'}
                  text1={
                    'Holders can experience their Talismoon in close proximity and see details invisible from public view.'
                  }
                  text2={
                    'A kind of tactile intimacy exclusive to holders of Talismoons.'
                  }
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  activeDotNumber={4}
                  image={'home/uniqueFeatures/talismoon_community.jpg'}
                  icon={'home/uniqueFeatures/icons/Icon-Community.svg'}
                  title={'TALISMOON COMMUNITY'}
                  subtitle={'Connect'}
                  text1={
                    'DAO? A forum for ideas, proposals and decision on the future direction of the project.'
                  }
                  text2={''}
                />
              </div>
            </div>
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <Slide
                  activeDotNumber={5}
                  image={'home/uniqueFeatures/talismoon_zoom_and_pan.jpg'}
                  icon={'home/uniqueFeatures/icons/Icon-CreativeCommons.svg'}
                  title={'TALISMOON RIGHTS'}
                  subtitle={'Holders hold the rights'}
                  text1={
                    'Talismoons is Creative Commons project. Holders are free to...'
                  }
                  text2={
                    'Exclusive access to potential future generations, projects or events.'
                  }
                />
              </div>
            </div>
          </Slider>
        </Col>
      </Row>
    </>
  )
}
