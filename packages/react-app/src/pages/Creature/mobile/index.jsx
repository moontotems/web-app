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

import { MIN_TOKEN_ID, MAX_TOKEN_ID } from '../../../constants'
import { getImageUrl } from '../../../helpers'
import { creatureFeatures } from '../../../sharedComponents'
const { MetaData, Chatbot, FileDownloads, WriteStory, FreshMintMessage } =
  creatureFeatures

export default function CreaturesMobileView({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const {
    assembleCreature,
    creatures,
    filter: { activeFilters },
    mintEventsMap,
    mint,
    favorites
  } = nftAppProps

  const { updateFavorites } = favorites

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

  // find index position of creature with tokenId == urlTokenId
  const fetchCreatureIndex = () => {
    let index
    creatures.filtered.filter((creature, _index) => {
      if (creature.tokenId === urlTokenId) {
        index = _index
      }
    })
    return index
  }
  const index = fetchCreatureIndex()

  const [visibleCreatureListIndex, setVisibleCreatureListIndex] =
    useState(index)

  useEffect(() => {
    if (!creatures.filtered[visibleCreatureListIndex])
      setVisibleCreatureListIndex(fetchCreatureIndex())
  }, [activeFilters])

  const currentVisibleCreature = creatures.filtered[visibleCreatureListIndex]

  useEffect(() => {
    updateUrl(creatures.filtered[visibleCreatureListIndex].tokenId)
  }, [visibleCreatureListIndex])

  // pre-load 10 images to the left and to the right
  useEffect(() => {
    const preloadSize = 10 // in each direction

    const _currentVisibleCreature = creatures.filtered[visibleCreatureListIndex]

    const activeTokenId = _currentVisibleCreature.tokenId

    let startTokenId = MIN_TOKEN_ID
    if (activeTokenId - preloadSize > MIN_TOKEN_ID) {
      startTokenId = activeTokenId - preloadSize
    }

    let endTokenId = MAX_TOKEN_ID
    if (activeTokenId + preloadSize < MAX_TOKEN_ID) {
      endTokenId = activeTokenId + preloadSize
    }

    for (let preloadId = startTokenId; preloadId <= endTokenId; preloadId++) {
      const img = new Image()
      img.src = getImageUrl({ tokenId: preloadId, size: 2048 })
    }
  }, [visibleCreatureListIndex])

  const { tokenId, metaData, image, ownedByUser, minted, isFavorite } =
    currentVisibleCreature || assembleCreature(urlTokenId)

  const isAvailable = !minted
  const isTaken = !isAvailable
  const isOwnedByUser = ownedByUser

  const { trait_name1, trait_name2, trait_jobField, trait_jobTitle } = metaData

  const swipeableHandler = useSwipeable({
    trackMouse: true,
    trackTouch: true,
    //onSwiped: eventData => console.log('User Swiped!', eventData),
    onSwipedLeft: eventData => {
      setVisibleCreatureListIndex(visibleCreatureListIndex - 1)
    },
    onSwipedRight: eventData => {
      setVisibleCreatureListIndex(visibleCreatureListIndex + 1)
    }
    //onTap: ({ event }) =>
  })

  const buttonStyle = {
    height: '44px',
    minWidth: '150px',
    lineHeight: '44px',
    fontSize: '19px',
    padding: '0px 15px',
    borderRadius: '15px',
    marginBottom: '0px'
  }

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
          image={getImageUrl({ tokenId, size: 1024 })}
          tokenId={tokenId}
        />
        <WriteStory ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </div>
      <Row>
        <Col xs={24}>
          <img
            {...swipeableHandler}
            src={getImageUrl({ tokenId, size: 1024 })}
            width='100%'
            /*
            onClick={() =>
              setActiveTokenId(
                getNextTokenId({
                  direction: 'right'
                })
              )
            }
            */
            style={{
              marginBottom: '40px'
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
            <div style={{ fontSize: '40px' }}>
              {trait_name1} {trait_name2}
            </div>
            <div
              style={{ marginTop: '15px', fontSize: '30px', fontWeight: 600 }}
            >
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
                  onClick={() =>
                    updateFavorites(currentVisibleCreature.tokenId)
                  }
                />
              )}
              {isFavorite && (
                <FavoriteFilled32
                  role='button'
                  style={{ fill: '#DA1E28', cursor: 'pointer' }}
                  onClick={() =>
                    updateFavorites(currentVisibleCreature.tokenId)
                  }
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
                type='primary'
                size='small'
                style={{
                  ...buttonStyle
                }}
                onClick={() => mint(currentVisibleCreature.tokenId)}
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
