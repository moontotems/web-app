import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Button } from 'antd'
import {
  AsleepFilled32,
  Favorite32,
  FavoriteFilled32,
  Download32,
  Information32,
  ChatBot32,
  Edit32,
  ZoomIn32
} from '@carbon/icons-react'
import $ from 'jquery'
import _ from 'underscore'
// https://www.npmjs.com/package/react-inner-image-zoom
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'

import { MIN_TOKEN_ID, MAX_TOKEN_ID } from '../../../constants'
import { getImageUrl } from '../../../helpers'
import {
  Chatbot,
  CreatureAttributes,
  CreatureFileDownloads,
  Icons,
  FilterDropdown
} from '../../../sharedComponents'
const { NotMintedIcon32x32 } = Icons
import houdini_json_hashmap from '../../../assets/houdini_json_hashmap.json'
import './styles.css'

export default function CreaturesDesktopView({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const { creatures, mintEventsMap, mint, favorites, isMobile } = nftAppProps

  const { checkIfIsFavorite, updateFavorites } = favorites

  const updateUrl = creatureIndex => {
    window.history.replaceState(
      null,
      `Moon Totem ${creatureIndex}`,
      `/moontotem/${creatureIndex}`
    )
  }

  let urlTokenId = window.location.pathname.match(/\d+/g)
  if (urlTokenId.length) {
    urlTokenId = parseInt(urlTokenId[0])
  } else {
    urlTokenId = 0
  }

  const [visibleCreatureListIndex, setVisibleCreatureListIndex] =
    useState(urlTokenId)

  const getActiveTokenListIndex = _urlTokenId => {
    console.log('in getActiveTokenListIndex():')
    console.log({ _urlTokenId })
    console.log({ filteredCreatures: creatures.filtered })
    const index = _.findIndex(creatures.filtered, creature => {
      return creature.tokenId === _urlTokenId
    })
    console.log({ index })
    return index
  }

  /*
  const [activeCreatureListIndex, setActiveCreatureListIndex] = useState(
    getActiveTokenListIndex(urlTokenId)
  )

  useEffect(() => {
    updateUrl(creatures.filtered[activeCreatureListIndex].tokenId)
  }, [activeCreatureListIndex])
  */

  const currentVisibleCreature = creatures.filtered[visibleCreatureListIndex]

  console.log({ creatures })
  console.log({ visibleCreatureListIndex })
  console.log({ currentVisibleCreature })

  const setNextTokenId = ({ direction }) => {
    let newIndex = visibleCreatureListIndex
    if (direction === 'left') {
      if (visibleCreatureListIndex > 0) {
        newIndex = visibleCreatureListIndex - 1
      }
    }
    if (direction === 'right') {
      if (visibleCreatureListIndex < creatures.filtered.length - 1) {
        newIndex = visibleCreatureListIndex + 1
      }
    }
    setVisibleCreatureListIndex(newIndex)
    updateUrl(newIndex)
  }

  // TODO:
  // pre-load 10 images
  /*
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
  */

  useEffect(() => {
    window.scrollTo(0, 0)
    $('#creatureDownloads').hide()
    $('#chatbot').hide()
    $('#creatureAttributes').hide()
  }, [])

  const { metaData, image, isFavorite, minted } = currentVisibleCreature
  const { trait_name1, trait_name2, trait_jobField, trait_jobTitle } = metaData

  useEffect(() => {
    document.onkeydown = e => {
      const LEFT_KEY = 37
      const RIGHT_KEY = 39

      if (e.which == LEFT_KEY) {
        setNextTokenId({
          direction: 'left'
        })
      }
      if (e.which == RIGHT_KEY) {
        setNextTokenId({
          direction: 'right'
        })
      }
    }
  }, [visibleCreatureListIndex])

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
        <Chatbot image={image} tokenId={currentVisibleCreature.tokenId} />
      </div>
      <div
        style={{
          position: 'fixed',
          top: 110,
          width: '40%',
          zIndex: 1000
        }}
      ></div>
      <Row>
        <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
          <InnerImageZoom
            zoomPreload={true}
            src={image}
            zoomSrc={image}
            zoomScale={3}
            //moveType='drag'
            hideCloseButton={true}
            hideHint={true}
          />
          {/*
          <div
            style={{
              position: 'absolute',
              bottom: '10vh',
              left: 0,
              right: 0,
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: 40 }}>
              {trait_name1} {trait_name2}
            </div>
          </div>
          */}
        </div>
      </Row>

      <Row>
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
              <div style={{ marginTop: '5px', fontSize: 14, fontWeight: 600 }}>
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
                onClick={() => mint(currentVisibleCreature.tokenId)}
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
                onClick={() => updateFavorites(currentVisibleCreature.tokenId)}
              />
            )}
            {isFavorite && (
              <FavoriteFilled32
                role='button'
                style={{ fill: '#DA1E28', cursor: 'pointer' }}
                onClick={() => updateFavorites(currentVisibleCreature.tokenId)}
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
      <Row>
        <Col xs={0} md={7} />
        <Col xs={24} md={14}>
          <div style={{ textAlign: 'center' }}>
            <CreatureAttributes creatureMetadata={metaData} />
          </div>
        </Col>
        <Col xs={0} md={7} />
      </Row>
    </div>
  )
}
