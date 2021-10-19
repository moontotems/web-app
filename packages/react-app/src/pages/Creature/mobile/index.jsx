import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Button } from 'antd-mobile'

import {
  AsleepFilled32,
  Favorite32,
  FavoriteFilled32,
  Information32,
  CloseFilled32
} from '@carbon/icons-react'
// https://www.npmjs.com/package/react-slick
import { useSwipeable } from 'react-swipeable'
import $ from 'jquery'
import { MIN_TOKEN_ID, MAX_TOKEN_ID } from '../../../constants'
import { getImageUrl } from '../../../helpers'
import {
  CreatureAttributes,
  Chatbot,
  WriteCreatureStory,
  Icons
} from '../../../sharedComponents'
const { OwnedByUserIcon32x32, NotMintedIcon32x32 } = Icons
import houdini_json_hashmap from '../../../assets/houdini_json_hashmap.json'

export default function CreaturesMobileView({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const { favorites, mintEventsMap, mint } = nftAppProps

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

  const [activeTokenId, setActiveTokenId] = useState(urlTokenId)

  console.log({ activeTokenId })

  useEffect(() => {
    window.scrollTo(0, 0)
    $('#chatbot').hide()
    $('#creatureAttributes').hide()
  }, [])

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

  const swipeableHandler = useSwipeable({
    trackMouse: true,
    trackTouch: true,
    //onSwiped: eventData => console.log('User Swiped!', eventData),
    onSwipedLeft: eventData => {
      console.log('in onSwipedLeft()')
      const newActiveTokenId = getNextTokenId({
        direction: 'right'
      })
      console.log('in onSwipedLeft()')
      console.log({ newActiveTokenId })
      setActiveTokenId(newActiveTokenId)
      updateUrl(newActiveTokenId)
    },
    onSwipedRight: eventData => {
      console.log('in onSwipedRight()')
      const newActiveTokenId = getNextTokenId({
        direction: 'left'
      })
      console.log('in onSwipedLeft()')
      console.log({ newActiveTokenId })
      setActiveTokenId(newActiveTokenId)
      updateUrl(newActiveTokenId)
    }
    //onTap: ({ event }) =>
  })

  const iconStyle = {
    margin: '0 20px',
    cursor: 'pointer'
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div
        id='chatbot'
        style={{
          position: 'fixed',
          left: 0,
          minHeight: '100vh',
          width: '100%',
          //marginTop: '10%',
          textAlign: 'center',
          padding: '10%',
          zIndex: 100
          //pointerEvents: 'none'
        }}
      >
        <Chatbot image={image} tokenId={activeTokenId} />
      </div>
      <Row>
        <Col xs={0} />
        <Col xs={24}>
          <img
            {...swipeableHandler}
            src={image}
            width='100%'
            onClick={() =>
              setActiveTokenId(
                getNextTokenId({
                  direction: 'right'
                })
              )
            }
            style={{
              //marginTop: 120,
              marginBottom: 80
            }}
          />
        </Col>
        <Col xs={0} />
      </Row>
      <Row>
        <Col xs={6}>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <div>
              {minted && <AsleepFilled32 />}
              {!minted && <img src={NotMintedIcon32x32} alt='Not Minted' />}
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40 }}>
              {trait_name1} {trait_name2}
            </div>
            <div style={{ fontSize: 30, fontWeight: 600 }}>
              {trait_jobField} {trait_jobTitle}
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
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
                <Button
                  type='primary'
                  size='small'
                  style={{
                    height: 34,
                    lineHeight: '34px',
                    fontSize: 16,
                    padding: '0 15px',
                    borderRadius: 0,
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
                type='primary'
                size='small'
                style={{
                  height: 34,
                  lineHeight: '34px',
                  fontSize: 16,
                  padding: '0 15px',
                  borderRadius: 0,
                  backgroundColor: '#24A148',
                  borderColor: '#24A148'
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
          {/*
            <div style={{ width: '60%' }}>
              <Chatbot image={image} tokenId={tokenId} />
            </div>
            <div style={{ marginTop: 50 }}>
              <Attributes creatureMetadata={creatureMetadata} />
            </div>
          */}
        </Col>
      </Row>
      <Row>
        <Col span={24} id='creatureAttributes'>
          <Information32
            aria-label='Show Info'
            style={{ ...iconStyle, float: 'left' }}
          />{' '}
          <span style={{ float: 'left', fontSize: 18, marginTop: 2 }}>
            INFO
          </span>
          <CloseFilled32
            aria-label='Close'
            style={{ ...iconStyle, float: 'right' }}
            onClick={() => $('#creatureAttributes').toggle(500)}
          />
          <div
            style={{
              float: 'left',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <CreatureAttributes creatureMetadata={metaData} isMobile={true} />
          </div>
        </Col>
        <Col span={24}>
          <div style={{ padding: '30px' }}>
            <WriteCreatureStory tokenId={activeTokenId} isMobile={true} />
          </div>
        </Col>
      </Row>
    </div>
  )
}
