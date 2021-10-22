import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Button } from 'antd-mobile'
import {
  AsleepFilled32,
  Locked32,
  Favorite32,
  FavoriteFilled32
} from '@carbon/icons-react'
// https://www.npmjs.com/package/react-slick
import { useSwipeable } from 'react-swipeable'
import $ from 'jquery'

import { MIN_TOKEN_ID, MAX_TOKEN_ID } from '../../../constants'
import { getImageUrl } from '../../../helpers'

import { creatureFeatures } from '../../../sharedComponents'
const { MetaData, Chatbot, FileDownloads, WriteStory, FreshMintMessage } =
  creatureFeatures

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

  useEffect(() => {
    window.scrollTo(0, 0)
    $('#chatbot').hide()
    $('#creatureMetaData').hide()
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

  // TODO: why are we doing this?? all the data should be available and passed down in/from App.jsx
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

  const { tokenId, metaData, image, ownedByUser, minted, isFavorite } =
    assembleCreature(urlTokenId)

  const isAvailable = !minted
  const isTaken = !isAvailable
  const isOwnedByUser = ownedByUser

  const { trait_name1, trait_name2, trait_jobField, trait_jobTitle } = metaData

  const swipeableHandler = useSwipeable({
    trackMouse: true,
    trackTouch: true,
    //onSwiped: eventData => console.log('User Swiped!', eventData),
    onSwipedLeft: eventData => {
      const newActiveTokenId = getNextTokenId({
        direction: 'right'
      })
      setActiveTokenId(newActiveTokenId)
      updateUrl(newActiveTokenId)
    },
    onSwipedRight: eventData => {
      const newActiveTokenId = getNextTokenId({
        direction: 'left'
      })
      setActiveTokenId(newActiveTokenId)
      updateUrl(newActiveTokenId)
    }
    //onTap: ({ event }) =>
  })

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div
        style={{
          position: 'fixed',
          left: 0,
          width: 'auto',
          height: '100%',
          zIndex: 100,
          overflowY: 'hidden'
        }}
      >
        <FreshMintMessage
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          tokenId={tokenId}
        />
        <MetaData
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureMetadata={metaData}
        />
        <FileDownloads
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
        <Chatbot
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          image={image}
          tokenId={tokenId}
        />
        <WriteStory ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </div>
      <Row>
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
              marginBottom: 80
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <div>
              {isAvailable && <AsleepFilled32 />}
              {isTaken && <Locked32 />}
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
    </div>
  )
}
