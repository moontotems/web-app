import React, { useState, useEffect } from 'react'
import {
  AsleepFilled20,
  Locked20,
  Favorite20,
  FavoriteFilled20
} from '@carbon/icons-react'
import { Button } from 'antd'
// https://www.npmjs.com/package/react-inner-image-zoom
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'

import { DESKTOP_HEADER_HEIGHT } from '../../../constants'
import { getImageUrl } from '../../../helpers'
import { creatureFeatures, Icons } from '../../../sharedComponents'
const {
  MetaData,
  Chatbot,
  FileDownloads,
  WriteStory,
  Actions,
  FreshMintMessage
} = creatureFeatures
// TODO: there is an error when implementing this: try out before pushing!!
const { OwnedByUserIcon20x20 } = Icons
import './styles.css'

export default function CreaturesDesktopView({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const {
    assembleCreature,
    filteredCreatures,
    filter: { activeFilters },
    mint,
    favorites,
    oneFeatureIsVisible,
    featureIsVisible
  } = nftAppProps

  const { updateFavorites } = favorites

  const updateUrl = creatureIndex => {
    window.history.replaceState(
      null,
      `Moon Totem ${creatureIndex}`,
      `/${creatureIndex}`
    )
  }

  let urlTokenId = window.location.pathname.match(/\d+/g)
  if (urlTokenId && urlTokenId.length) {
    urlTokenId = parseInt(urlTokenId[0])
  } else {
    urlTokenId = 0
  }

  // find index position of creature with tokenId == urlTokenId
  const fetchCreatureIndex = () => {
    let index
    filteredCreatures.filter((creature, _index) => {
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
    if (!filteredCreatures[visibleCreatureListIndex])
      setVisibleCreatureListIndex(fetchCreatureIndex())
  }, [activeFilters])

  const currentVisibleCreature = filteredCreatures[visibleCreatureListIndex]

  const setNextTokenId = ({ direction }) => {
    let newIndex = visibleCreatureListIndex
    if (direction === 'left') {
      if (visibleCreatureListIndex > 0) {
        newIndex = visibleCreatureListIndex - 1
      }
    }
    if (direction === 'right') {
      if (visibleCreatureListIndex < filteredCreatures.length - 1) {
        newIndex = visibleCreatureListIndex + 1
      }
    }
    setVisibleCreatureListIndex(newIndex)
  }

  useEffect(() => {
    updateUrl(filteredCreatures[visibleCreatureListIndex].tokenId)
  }, [visibleCreatureListIndex])

  /////
  // pre-load images to the left and to the right
  useEffect(() => {
    const preloadSize = 10 // in each direction

    const startIndex =
      visibleCreatureListIndex > preloadSize
        ? visibleCreatureListIndex - preloadSize
        : 0

    const endIndex =
      filteredCreatures.length - 1 > visibleCreatureListIndex + preloadSize
        ? visibleCreatureListIndex + preloadSize
        : filteredCreatures.length - 1

    for (
      let preloadIndex = startIndex;
      preloadIndex <= endIndex;
      preloadIndex++
    ) {
      const creatureToPreload = filteredCreatures[preloadIndex]
      const img = new Image()
      img.src = getImageUrl({ tokenId: creatureToPreload.tokenId, size: 2048 })
    }
  }, [visibleCreatureListIndex])
  /////

  const { tokenId, metaData, ownedByUser, minted, isFavorite } =
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

  const FOOTER_HEIGHT = 40

  const buttonStyle = {
    height: '26px',
    minWidth: '113px',
    lineHeight: '25px',
    fontSize: '12px',
    padding: '0 15px',
    borderRadius: '15px',
    marginBottom: '12px',
    background: 'none'
  }

  return (
    <>
      {true && (
        <div
          style={{
            position: 'fixed',
            top: DESKTOP_HEADER_HEIGHT,
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

          {featureIsVisible('creatureMetaData') && (
            <MetaData
              ethereumProps={ethereumProps}
              nftAppProps={nftAppProps}
              creatureMetadata={metaData}
            />
          )}
          {featureIsVisible('creatureDownloads') && (
            <FileDownloads
              ethereumProps={ethereumProps}
              nftAppProps={nftAppProps}
              tokenId={tokenId}
            />
          )}
          {featureIsVisible('chatbot') && (
            <Chatbot
              ethereumProps={ethereumProps}
              nftAppProps={nftAppProps}
              image={getImageUrl({
                tokenId,
                size: 1024
              })}
              tokenId={tokenId}
            />
          )}
          {featureIsVisible('writeCreatureStory') && (
            <WriteStory
              ethereumProps={ethereumProps}
              nftAppProps={nftAppProps}
            />
          )}
          {featureIsVisible('creatureActions') && (
            <Actions
              ethereumProps={ethereumProps}
              nftAppProps={nftAppProps}
              tokenId={tokenId}
            />
          )}
        </div>
      )}

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
          zoomScale={1.1}
          //moveType='drag'
          hideCloseButton={true}
          hideHint={true}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
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
            {isTaken && !ownedByUser && (
              <Locked20
                style={{
                  marginRight: '40px'
                }}
              />
            )}
            {ownedByUser && (
              <img
                src={OwnedByUserIcon20x20}
                alt='Owned by User'
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
                onClick={() => updateFavorites(tokenId)}
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
                onClick={() => updateFavorites(tokenId)}
              />
            )}
          </div>
          <div style={{ fontSize: '15px', fontWeight: 600 }}>
            {trait_jobField} {trait_jobTitle}
          </div>
          <div style={{ fontSize: '15px', marginTop: '20px' }}>
            {isTaken && (
              <a
                href={`https://opensea.io/assets/0x8fe83f6f7f726a2c9e238b7e094c4bf530bc9720/${tokenId}`}
                target='_blank'
                rel='noreferrer'
              >
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
                  ...buttonStyle
                }}
                onClick={() => mint(tokenId)}
              >
                Summon this Totem (0.05 Ξ)
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
