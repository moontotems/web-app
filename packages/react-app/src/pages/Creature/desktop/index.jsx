import React, { useState, useEffect } from 'react'
import {
  AsleepFilled20,
  Locked20,
  Favorite20,
  FavoriteFilled20
} from '@carbon/icons-react'
// https://www.npmjs.com/package/react-inner-image-zoom
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'

import {
  DESKTOP_HEADER_HEIGHT,
  MIN_TOKEN_ID,
  MAX_TOKEN_ID
} from '../../../constants'
import { getImageUrl } from '../../../helpers'
import { creatureFeatures } from '../../../sharedComponents'
const { MetaData, Chatbot, FileDownloads, WriteStory, FreshMintMessage } =
  creatureFeatures
import './styles.css'

export default function CreaturesDesktopView({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const {
    assembleCreature,
    creatures,
    filter: { activeFilters },
    mintEventsMap,
    mint,
    favorites
  } = nftAppProps

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
  }

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

  const buttonStyle = {
    height: '34px',
    fontSize: '16px',
    padding: '0 15px'
  }

  const FOOTER_HEIGHT = 40

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div
        style={{
          position: 'fixed',
          top: DESKTOP_HEADER_HEIGHT,
          //left: '17px',
          left: '0',
          width: '35%',
          zIndex: 1000
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
      <div
        style={{
          position: 'fixed',
          top: DESKTOP_HEADER_HEIGHT,
          left: 0,
          width: '100%',
          height: `calc(100vh - ${DESKTOP_HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
          overflowY: 'hidden'
        }}
      >
        <InnerImageZoom
          zoomPreload={true}
          src={getImageUrl({ tokenId, size: 2048 })}
          zoomSrc={getImageUrl({
            tokenId,
            size: 2048,
            withSymbol: isOwnedByUser
          })}
          height={`calc(100vh - ${DESKTOP_HEADER_HEIGHT + FOOTER_HEIGHT}px)`}
          zoomScale={2}
          //moveType='drag'
          hideCloseButton={true}
          hideHint={true}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
            right: 0,
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '30px', marginBottom: '3px' }}>
            {isAvailable && (
              <AsleepFilled20
                style={{
                  marginRight: '40px'
                }}
              />
            )}
            {isTaken && (
              <Locked20
                style={{
                  marginRight: '40px'
                }}
              />
            )}
            {trait_name1} {trait_name2}
            {!isFavorite && (
              <Favorite20
                role='button'
                style={{
                  fill: 'white',
                  cursor: 'pointer',
                  marginLeft: '40px'
                }}
                onClick={() => updateFavorites(currentVisibleCreature.tokenId)}
              />
            )}
            {isFavorite && (
              <FavoriteFilled20
                role='button'
                style={{
                  fill: '#DA1E28',
                  cursor: 'pointer',
                  marginLeft: '40px'
                }}
                onClick={() => updateFavorites(currentVisibleCreature.tokenId)}
              />
            )}
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>
            {trait_jobField} {trait_jobTitle}
          </div>
        </div>
      </div>

      {/*
      <Row>
        <Col xs={10}>
          <div
            style={{
              textAlign: 'right',
              paddingRight: '12%',
              marginTop: '2px'
            }}
          >
            {isAvailable && <AsleepFilled32 />}
            {isTaken && <Locked32 />}
          </div>
        </Col>
        <Col xs={4}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '25px' }}>
                {trait_name1} {trait_name2}
              </div>
              <div
                style={{ marginTop: '20px', fontSize: '17px', fontWeight: 600 }}
              >
                {trait_jobField} {trait_jobTitle}
              </div>
            </div>
            {isTaken && (
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
            {address && isAvailable && (
              <Button
                style={{
                  ...buttonStyle,
                  backgroundColor: '#24A148',
                  borderColor: '#24A148'
                }}
                onClick={() => mint(currentVisibleCreature.tokenId)}
              >
                Summon this Totem (0.1 Ξ)
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
      */}
    </div>
  )
}
