import React, { useState, useEffect } from 'react'
import { Row, Col, Menu, Dropdown, Button as AntdButton } from 'antd'
import { Button } from 'antd'

import {
  AsleepFilled32,
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
import { MIN_TOKEN_ID, MAX_TOKEN_ID } from '../../../constants'
import { getImageUrl } from '../../../helpers'
import {
  Chatbot,
  CreatureAttributes,
  CreatureFileDownloads,
  Icons,
  FilterDropdown
} from '../../../sharedComponents'
const { OwnedByUserIcon32x32, NotMintedIcon32x32 } = Icons
import houdini_json_hashmap from '../../../assets/houdini_json_hashmap.json'

export default function CreaturesDesktopView({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const { favorites, activeFilter, mintEventsMap, mint, isMobile } = nftAppProps

  const { checkIfIsFavorite, updateFavorites } = favorites

  const updateUrl = creatureIndex => {
    window.history.replaceState(
      null,
      `Talismoon ${creatureIndex}`,
      `/talismoon/${creatureIndex}`
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

  const getNextTokenId = ({ direction }) => {
    if (typeof activeTokenId !== 'number') {
      return MIN_TOKEN_ID
    }

    let newActiveTokenId
    if (direction === 'left') {
      if (activeTokenId > MIN_TOKEN_ID) {
        newActiveTokenId = activeTokenId - 1
        return newActiveTokenId
      } else {
        return MIN_TOKEN_ID
      }
    }
    if (direction === 'right') {
      if (activeTokenId === MAX_TOKEN_ID) {
        return activeTokenId
      } else {
        newActiveTokenId = activeTokenId + 1
        return newActiveTokenId
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
    $('#creatureDownloads').hide()
    $('#chatbot').hide()
    $('#creatureAttributes').hide()
  }, [])

  const assembleCreature = tokenId => {
    const minted = !!mintEventsMap[tokenId]
    const isFavorite = checkIfIsFavorite(tokenId)
    const metaData = houdini_json_hashmap[tokenId]
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
      const LEFT_KEY = 37
      const RIGHT_KEY = 39

      if (e.which == LEFT_KEY) {
        const newActiveTokenId = getNextTokenId({
          direction: 'left'
        })
        setActiveTokenId(newActiveTokenId)
        updateUrl(newActiveTokenId)
      }
      if (e.which == RIGHT_KEY) {
        const newActiveTokenId = getNextTokenId({
          direction: 'right'
        })
        setActiveTokenId(newActiveTokenId)
        updateUrl(newActiveTokenId)
      }
    }
  }, [activeTokenId])

  const iconStyle = {
    margin: '0 20px',
    cursor: 'pointer'
  }

  const buttonStyle = {
    height: 34,
    width: '100%',
    lineHeight: '34px',
    padding: '0 15px',
    fontSize: '14px',
    borderRadius: 0
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div
        id='creatureName'
        style={{
          position: 'fixed',
          top: '15%',
          width: isMobile ? '20%' : '30%',
          zIndex: 1000
        }}
      >
        {/*
        <div style={{ marginLeft: '20%' }}>
          <div style={{ fontSize: 30 }}>
            {trait_name1} {trait_name2}
          </div>
          <div style={{ fontSize: 20, fontWeight: 600 }}>
            {trait_jobField} {trait_jobTitle}
          </div>
        </div>
        */}
      </div>

      <div
        style={{
          position: 'fixed',
          top: 110,
          width: '40%',
          zIndex: 1000
        }}
      >
        <CreatureFileDownloads
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>

      <div
        style={{
          position: 'fixed',
          top: 90,
          left: 10,
          width: '20%',
          zIndex: 1000
        }}
      >
        <Chatbot image={image} tokenId={activeTokenId} />
      </div>
      <div
        style={{
          position: 'fixed',
          top: 110,
          width: '40%',
          zIndex: 1000
        }}
      >
        <CreatureAttributes creatureMetadata={metaData} />
      </div>
      <Row>
        <Col md={7} />
        <Col md={10}>
          <img
            src={image}
            style={{
              float: 'left',
              width: '100%',
              marginTop: 9
            }}
          />
        </Col>
        <Col md={7} />
      </Row>
      <Row style={{ marginTop: 25 }}>
        <Col xs={10}>
          <div
            style={{
              textAlign: 'right',
              paddingRight: '12%',
              marginTop: '2px'
            }}
          >
            {minted && <AsleepFilled32 />}
            {!minted && <img src={NotMintedIcon32x32} alt='Not Minted' />}
          </div>
        </Col>
        <Col xs={4}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: 20 }}>
                {trait_name1} {trait_name2}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>
                {trait_jobField} {trait_jobTitle}
              </div>
            </div>
            {minted && (
              <a href='https://opensea.io/' target='_blank' rel='noreferrer'>
                <Button
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#1062FE',
                    borderColor: '#1062FE'
                  }}
                >
                  View on Opensea
                </Button>
              </a>
            )}
            {address && !minted && (
              <Button
                style={{
                  ...buttonStyle,
                  backgroundColor: '#24A148',
                  borderColor: '#24A148'
                }}
                onClick={() => mint(activeTokenId)}
              >
                Summon this Talismoon (0.1 Ξ)
              </Button>
            )}
          </div>
        </Col>
        <Col xs={10}>
          <div
            style={{ textAlign: 'left', paddingLeft: '12%', marginTop: '2px' }}
          >
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
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ margin: '45px 0', textAlign: 'center' }}>
            <FilterDropdown
              ethereumProps={ethereumProps}
              nftAppProps={nftAppProps}
            />
            {/* <Apps32 aria-label='Switch to area view' style={{ ...iconStyle }} /> */}
            {/* <CarouselHorizontal32 style={{ ...iconStyle }} />*/}
            {/* <List32 aria-label='Switch to list view' style={{ ...iconStyle }} /> */}
            <Download32
              aria-label='Download'
              style={{ ...iconStyle }}
              onClick={() => {
                $('#creatureName').hide()
                $('#chatbot').hide()
                $('#creatureAttributes').hide()
                $('#creatureDownloads').toggle(500)
              }}
            />
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
                $('#creatureName').hide()
                $('#chatbot').hide()
                $('#creatureDownloads').hide()
                $('#creatureAttributes').toggle(500)
              }}
            />
            <ChatBot32
              aria-label='Chat'
              style={{ ...iconStyle }}
              onClick={() => {
                $('#creatureName').hide()
                $('#creatureAttributes').hide()
                $('#creatureDownloads').hide()
                $('#chatbot').toggle(500)
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
