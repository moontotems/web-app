import React, { useState, useEffect } from 'react'
import { Row, Col, Menu, Button, Dropdown } from 'antd'
import {
  CheckmarkOutline32,
  CheckmarkFilled32,
  Favorite32,
  FavoriteFilled32,
  Filter32,
  Apps32,
  CarouselHorizontal32,
  List32,
  Download32,
  Information32,
  ChatBot32,
  Edit32,
  ZoomIn32
} from '@carbon/icons-react'
// https://www.npmjs.com/package/react-slick
import Slider from 'react-slick'
import SwipeableViews from 'react-swipeable-views'
import bindKeyboard from 'react-swipeable-views-utils/lib/bindKeyboard'
import $ from 'jquery'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function CreaturesCarousel({ ethereumProps, nftAppProps }) {
  const {
    creaturesMap,
    creatures,
    infiniteScroll: {
      visibleCreaturesRangeStart,
      setVisibleCreaturesRangeStart,
      visibleCreaturesRangeEnd,
      setVisibleCreaturesRangeEnd
    },
    updateFavorites,
    mint
  } = nftAppProps

  const iconStyle = {
    margin: '0 20px',
    cursor: 'pointer'
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.antgroup.com'
        >
          PNG (10mb)
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.aliyun.com'
        >
          OBJ (239kb)
        </a>
      </Menu.Item>
    </Menu>
  )

  let tokenId = parseInt(window.location.pathname.match(/\d+/g))
  if (isNaN(tokenId)) tokenId = visibleCreaturesRangeStart
  console.log({ tokenId })

  console.log({ creaturesMap })
  //const { isFavorite, minted } = creaturesMap[`${tokenId}`]
  const { isFavorite, minted } = creatures[0]

  /*
  const updateUrl = creatureIndex => {
    console.log('in updateUrl')
    console.log({ creatureIndex })
    window.history.replaceState(
      null,
      `Moon Totem ${creatureIndex}`,
      `/totem/${creatureIndex}`
    )
  }

  useEffect(() => {
    updateUrl(currentCreatureIndex)
  }, [currentCreatureIndex])
  */

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
    infinite: false,
    initialSlide: 0, // TODO:
    speed: 800,
    slidesToShow: 1,
    //slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    //nextArrow: null,
    //prevArrow: null,
    // https://react-slick.neostack.com/docs/api/#lazyLoad
    //lazyLoad: true,
    onSwipe: () => console.log('onSwipe'),
    // afterChange: () => this.setState(state => ({ updateCount: state.updateCount + 1 })),
    // beforeChange: (current, next) => this.setState({ slideIndex: next })
    // afterChange: () => setCurrentCreatureIndex(currentCreatureIndex + 1),
    beforeChange: (current, next) => {
      /*
      console.log({ current, next })
      console.log({ creatures })
      const reachedLeftEnd = next === 0
      const reachedRightEnd = next === creatures.length - 1
      console.log({ reachedLeftEnd, reachedRightEnd })
      if (reachedLeftEnd || reachedRightEnd) {
        console.log('now calling updateVisibleCreatureRange()')
        updateVisibleCreatureRange({ newCenter: tokenId })
      }
      */
    }
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      {/*
      <div style={{ width: '60%' }}>
        <Chatbot image={image} tokenId={tokenId} />
      </div>
      <div style={{ marginTop: 50 }}>
        <Attributes creatureMetadata={creatureMetadata} />
      </div>
      */}
      <Slider {...sliderSettings}>
        {creatures.map(creature => {
          const { tokenId, metaData, image, isFavorite, minted } = creature

          const key = `TALISMOON-${tokenId}`

          return (
            <div key={key}>
              <Row>
                <Col xs={0} md={6} />
                <Col xs={24} md={12}>
                  <img src={image} width='100%' />
                </Col>
                <Col xs={0} md={6} />
              </Row>
            </div>
          )
        })}
      </Slider>
      <Row>
        <Col xs={10} />
        <Col xs={4}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ float: 'left' }}>
              {minted && <CheckmarkOutline32 style={{ fill: '#4589FF' }} />}
              {!minted && <CheckmarkFilled32 style={{ fill: '#00FF74' }} />}
            </div>
            <div style={{ float: 'right' }}>
              {!isFavorite && (
                <Favorite32
                  role='button'
                  style={{ fill: 'white', cursor: 'pointer' }}
                  onClick={() => updateFavorites(tokenId)}
                />
              )}
              {isFavorite && (
                <FavoriteFilled32
                  role='button'
                  style={{ fill: '#DA1E28', cursor: 'pointer' }}
                  onClick={() => updateFavorites(tokenId)}
                />
              )}
            </div>
          </div>
        </Col>
        <Col xs={10} />
      </Row>
      <Row>
        <Col xs={10} />
        <Col xs={4}>
          <div
            style={{
              textAlign: 'center'
            }}
          >
            {minted && (
              <a href='https://opensea.io/' target='_blank' rel='noreferrer'>
                <Button type='primary' block>
                  View on Opensea
                </Button>
                {/*
                <Button
                  type='primary'
                  style={{
                    backgroundColor: '#24A148',
                    borderColor: '#24A148'
                  }}
                >
                  Make offer on Opensea
                </Button>
                */}
              </a>
            )}
            {!minted && (
              <Button
                type='success'
                block
                style={{
                  backgroundColor: '#24A148',
                  borderColor: '#24A148',
                  color: '#fff'
                }}
                onClick={() => mint(tokenId)}
              >
                Summon this Totem (0.1 Ξ)
              </Button>
            )}
          </div>
        </Col>
        <Col xs={10} />
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ margin: '45px 0', textAlign: 'center' }}>
            <Filter32 aria-label='Filter' style={{ ...iconStyle }} />
            {/* <Apps32 aria-label='Switch to area view' style={{ ...iconStyle }} /> */}
            {/* <CarouselHorizontal32 style={{ ...iconStyle }} />*/}
            {/* <List32 aria-label='Switch to list view' style={{ ...iconStyle }} /> */}
            <Dropdown overlay={menu} placement='topCenter'>
              <Button
                id='downloadButton'
                style={{ padding: 0, border: 'none' }}
              >
                <Download32
                  aria-label='Download'
                  style={{ ...iconStyle, color: '#fff' }}
                />
              </Button>
            </Dropdown>
            {/*
              <Dropdown
                ariaLabel='Dropdown'
                id='carbon-dropdown-example'
                items={['.jpg', '.png']}
                label={
                  <Download32
                    aria-label='Download'
                    style={{ ...iconStyle, color: '#fff' }}
                  />
                }
                titleText='Dropdown title'
                style={{ width: 'auto' }}
              />
            */}
            <Information32
              aria-label='Show Info'
              style={{ ...iconStyle }}
              onClick={() => {
                console.log('click')
                //setShowChat(false)
                $('#chatbot').hide()
                $('#creatureAttributes').toggle(500)
                //setShowMetadata(!showMetadata)
              }}
            />
            <ChatBot32
              aria-label='Chat'
              style={{ ...iconStyle }}
              onClick={() => {
                console.log('click')
                //setShowMetadata(false)
                $('#creatureAttributes').hide()
                $('#chatbot').toggle(500)
                //setShowChat(!showChat)
              }}
            />
            <Edit32 style={{ ...iconStyle }} />
            <ZoomIn32 aria-label='Zoom' style={{ ...iconStyle }} />
          </div>
        </Col>
      </Row>
    </div>
  )
}
