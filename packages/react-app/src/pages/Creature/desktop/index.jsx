import React, { useState, useEffect } from 'react'
import { Row, Col, Menu, Dropdown, Button as AntdButton } from 'antd'
import { Button } from 'antd-mobile'

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
import $ from 'jquery'
import { DESKTOP_HEADER_HEIGHT } from '../../..//constants'
import { getImageUrl } from '../../../helpers'
import { Chatbot, CreatureAttributes } from '../../../sharedComponents'
import creature_metadata_hashmap from './creature_metadata_hashmap.json'

export default function CreaturesDesktopView({ ethereumProps, nftAppProps }) {
  const { account } = ethereumProps
  const { favorites, activeFilter, mintEventsMap, mint } = nftAppProps

  const { checkIfIsFavorite, updateFavorites } = favorites

  const updateUrl = creatureIndex => {
    window.history.replaceState(
      null,
      `Moon Totem ${creatureIndex}`,
      `/totem/${creatureIndex}`
    )
  }

  let urlTokenId = window.location.pathname.match(/\d+/g)
  if (urlTokenId.length) {
    urlTokenId = parseInt(urlTokenId[0])
  } else {
    urlTokenId = 0
  }

  const [activeTokenId, setActiveTokenId] = useState(urlTokenId)

  console.log({ activeTokenId })

  const getNexTokenId = ({ direction }) => {
    console.log('in getNexTokenId() :')
    console.log({ activeTokenId })
    console.log({ direction })

    // TODO: move this into constants file
    const MAX_TOKEN_ID = 1000 // TODO: set corerct number
    const MIN_TOKEN_ID = 0
    if (!(activeTokenId === 0) && !activeTokenId) return MIN_TOKEN_ID

    let newActiveTokenId
    if (direction === 'left') {
      if (activeTokenId > MIN_TOKEN_ID) {
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

  // pre-load 10 images
  useEffect(() => {
    const preloadSize = 10
    for (
      let futureTokenId = activeTokenId + 1;
      futureTokenId < preloadSize + 1;
      futureTokenId++
    ) {
      const img = new Image()
      img.src = getImageUrl(futureTokenId)
    }
  }, [activeTokenId])

  useEffect(() => {
    window.scrollTo(0, 0)
    $('#chatbot').hide()
    $('#creatureAttributes').hide()
  }, [])

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

  const { metaData, image, isFavorite, minted } =
    assembleCreature(activeTokenId)
  const { trait_name1, trait_name2, trait_jobField, trait_jobTitle } = metaData

  useEffect(() => {
    document.onkeydown = e => {
      e.preventDefault()
      const LEFT_KEY = 37
      const RIGHT_KEY = 39

      if (e.which == LEFT_KEY) {
        console.log('in onSwipedRight()')
        const newActiveTokenId = getNexTokenId({
          direction: 'left'
        })
        console.log('in onSwipedLeft()')
        console.log({ newActiveTokenId })
        setActiveTokenId(newActiveTokenId)
        updateUrl(newActiveTokenId)
      }
      if (e.which == RIGHT_KEY) {
        const newActiveTokenId = getNexTokenId({
          direction: 'right'
        })
        console.log('in onSwipedLeft()')
        console.log({ newActiveTokenId })
        setActiveTokenId(newActiveTokenId)
        updateUrl(newActiveTokenId)
      }
    }
  }, [activeTokenId])

  const iconStyle = {
    margin: '0 20px',
    cursor: 'pointer'
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Row>
        <Col md={7} />
        <Col md={10}>
          <img
            src={image}
            onClick={() =>
              setActiveTokenId(
                getNexTokenId({
                  direction: 'right'
                })
              )
            }
            style={{
              float: 'left',
              width: '100%'
            }}
          />
        </Col>
        <Col md={7} />
      </Row>
      <Row>
        <Col xs={6}>
          <div style={{ textAlign: 'center' }}>
            <div>
              {minted && <CheckmarkOutline32 style={{ fill: '#4589FF' }} />}
              {!minted && <CheckmarkFilled32 style={{ fill: '#00FF74' }} />}
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 30 }}>
              {trait_name1} {trait_name2}
            </div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>
              {trait_jobField} {trait_jobTitle}
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <div style={{ textAlign: 'center' }}>
            <div>
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
      </Row>
      <Row>
        <Col xs={6} />
        <Col xs={12}>
          <div
            style={{
              marginTop: 30,
              textAlign: 'center'
            }}
          >
            {minted && (
              <a href='https://opensea.io/' target='_blank' rel='noreferrer'>
                <Button style={{ borderRadius: 0 }}>View on Opensea</Button>
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
            {account && !minted && (
              <Button
                style={{
                  backgroundColor: '#24A148',
                  borderRadius: 0,
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
        <Col xs={6} />
      </Row>
      <Row>
        <Col span={24}>
          <div
            style={{
              position: 'fixed',
              top: DESKTOP_HEADER_HEIGHT,
              width: '20%'
            }}
          >
            <Chatbot image={image} tokenId={activeTokenId} />
          </div>
          <div
            style={{
              position: 'fixed',
              top: DESKTOP_HEADER_HEIGHT,
              width: '40%'
            }}
          >
            <CreatureAttributes creatureMetadata={metaData} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ margin: '45px 0', textAlign: 'center' }}>
            <Filter32 aria-label='Filter' style={{ ...iconStyle }} />
            {/* <Apps32 aria-label='Switch to area view' style={{ ...iconStyle }} /> */}
            {/* <CarouselHorizontal32 style={{ ...iconStyle }} />*/}
            {/* <List32 aria-label='Switch to list view' style={{ ...iconStyle }} /> */}
            <Dropdown
              overlay={
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
              }
              placement='topCenter'
            >
              <AntdButton
                id='downloadButton'
                style={{ padding: 0, border: 'none' }}
              >
                <Download32
                  aria-label='Download'
                  style={{ ...iconStyle, color: '#fff' }}
                />
              </AntdButton>
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
