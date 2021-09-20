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
import $ from 'jquery'
import FILTERS from '../../../sharedComponents/ActionBar/filters'
import { getImageUrl } from '../../../helpers'
import creature_metadata_hashmap from './creature_metadata_hashmap.json'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export default function CreaturesMobileView({ ethereumProps, nftAppProps }) {
  const { favorites, activeFilter, mintEventsMap, mint } = nftAppProps

  const { checkIfIsFavorite, updateFavorites } = favorites

  let urlTokenId = window.location.pathname.match(/\d+/g)
  if (urlTokenId.length) {
    urlTokenId = parseInt(urlTokenId[0])
  } else {
    urlTokenId = 0
  }

  const [activeTokenId, setActiveTokenId] = useState(urlTokenId)

  let creaturesMap = {}

  /*
  for (let tokenId = startId; tokenId < lastVisibleTokenId; tokenId++) {
    const minted = !!mintEventsMap[tokenId]
    const isFavorite = checkIfIsFavorite(tokenId)
    const metaData = creature_metadata_hashmap[tokenId]
    const image = getImageUrl(tokenId)

    const creature = {
      tokenId,
      metaData,
      image,
      isFavorite,
      minted
    }

    if (!activeFilter) {
      creatures.push(creature)
      creaturesMap[`${tokenId}`] = creature
    } else if (activeFilter === FILTERS.available && !minted) {
      creatures.push(creature)
      creaturesMap[`${tokenId}`] = creature
    } else if (activeFilter === FILTERS.taken && minted) {
      creatures.push(creature)
      creaturesMap[`${tokenId}`] = creature
    } else if (activeFilter === FILTERS.favorites && isFavorite) {
      creatures.push(creature)
      creaturesMap[`${tokenId}`] = creature
    }
  }
  */

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

  const assembleCreature = tokenId => {
    const minted = !!mintEventsMap[tokenId]
    const isFavorite = checkIfIsFavorite(tokenId)
    const metaData = creature_metadata_hashmap[tokenId]
    const image = getImageUrl(tokenId)

    const creature = {
      tokenId,
      metaData,
      image,
      isFavorite,
      minted
    }
    return creature
  }

  console.log({ creaturesMap })
  const { metaData, image, isFavorite, minted } =
    assembleCreature(activeTokenId)

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
    //updateUrl(activeTokenId)
  }, [activeTokenId])

  console.log({ activeTokenId })

  const getNexTokenId = ({ currentTokenId, direction }) => {
    const MAX_TOKEN_ID = 1000 // TODO: set corerct number
    let newActiveTokenId
    if (direction === 'left') {
      if (activeTokenId > 0) {
        newActiveTokenId = activeTokenId - 1
        return newActiveTokenId
      }
      return newActiveTokenId
    }
    if (direction === 'right') {
      if (activeTokenId !== MAX_TOKEN_ID) {
        newActiveTokenId = activeTokenId + 1
        return newActiveTokenId
      } else {
        return activeTokenId
      }
    }
  }

  useEffect(() => {
    document.onkeydown = e => {
      e.preventDefault()
      const LEFT_KEY = 37
      const RIGHT_KEY = 39

      let newActiveTokenId = activeTokenId

      if (e.which == LEFT_KEY) {
        console.log('click LEFT_KEY')
        newActiveTokenId = getNexTokenId({
          currentTokenId: activeTokenId,
          direction: 'left'
        })
      }

      if (e.which == RIGHT_KEY) {
        console.log('click RIGHT_KEY')
        newActiveTokenId = getNexTokenId({
          currentTokenId: activeTokenId,
          direction: 'right'
        })
      }

      setActiveTokenId(newActiveTokenId)
      updateUrl(newActiveTokenId)
    }
  }, [activeTokenId])

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
      <Row>
        <Col xs={0} md={6} />
        <Col xs={24} md={12}>
          <img
            src={image}
            width='100%'
            onClick={() =>
              setActiveTokenId(
                getNexTokenId({
                  currentTokenId: activeTokenId,
                  direction: 'right'
                })
              )
            }
          />
        </Col>
        <Col xs={0} md={6} />
      </Row>
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
                  onClick={() => updateFavorites(activeTokenId)}
                />
              )}
              {isFavorite && (
                <FavoriteFilled32
                  role='button'
                  style={{ fill: '#DA1E28', cursor: 'pointer' }}
                  onClick={() => updateFavorites(activeTokenId)}
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
                onClick={() => mint(activeTokenId)}
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
