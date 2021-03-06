import React, { useState, useEffect } from 'react'
import { Row, Col } from 'antd'
import { Button, notification } from 'antd'
import {
  AsleepFilled16,
  Locked16,
  Favorite16,
  FavoriteFilled16,
  Share16,
  Information16
} from '@carbon/icons-react'
// https://www.npmjs.com/package/react-slick
import { useSwipeable } from 'react-swipeable'

import { getImageUrl } from '../../../helpers'
import { creatureFeatures, Icons } from '../../../sharedComponents'
const { MetaData, Chatbot, FileDownloads, WriteStory, FreshMintMessage } =
  creatureFeatures
// TODO: there is an error when implementing this: try out before pushing!!
const { OwnedByUserIcon32x32 } = Icons

export default function CreaturesMobileView({ ethereumProps, nftAppProps }) {
  const { address } = ethereumProps
  const {
    assembleCreature,
    filteredCreatures,
    filter: { activeFilters },
    mint,
    favorites,
    oneFeatureIsVisible,
    featureIsVisible,
    toggleVisibilityMetaData
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

  const { tokenId, metaData, image, ownedByUser, minted, isFavorite } =
    currentVisibleCreature || assembleCreature(urlTokenId)

  const isAvailable = !minted
  const isTaken = !isAvailable
  const isOwnedByUser = ownedByUser

  const {
    trait_name1,
    trait_name2,
    trait_jobField,
    trait_jobTitle,
    trait_personality1,
    trait_personality2,
    trait_personality3,
    lunarOriginName
  } = metaData

  const swipeableHandler = useSwipeable({
    trackMouse: true,
    trackTouch: true,
    onSwiped: eventData => console.log('User Swiped!', eventData),
    onSwipedLeft: eventData => {
      setNextTokenId({
        direction: 'right'
      })
    },
    onSwipedRight: eventData => {
      setNextTokenId({
        direction: 'left'
      })
    }
    //onTap: ({ event }) =>
  })

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

  const shareTotem = () => {
    if (navigator && navigator.share) {
      const title = `Moon Totem #${tokenId}`
      const text = `Moon Totem #${tokenId}: ${trait_name1} ${trait_name2} - ${trait_jobField} ${trait_jobTitle}. ${trait_personality1}, ${trait_personality2} & ${trait_personality3}. Lunar Origin: ${lunarOriginName}`
      const url = window.location.href
      navigator
        .share({
          title,
          text,
          url
        })
        //.then(() => console.log('successful share'))
        .catch(error => console.log(error))
    } else {
      notification.error(
        'Share not supported on this browser, do it the old way.'
      )
    }
  }

  return (
    <div>
      {oneFeatureIsVisible && (
        <div
          style={{
            position: 'fixed',
            left: 0,
            width: '100%',
            height: '100%',
            overflowY: 'hidden',
            zIndex: 100
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
        </div>
      )}
      <Row>
        <Col xs={24} {...swipeableHandler}>
          <img
            src={getImageUrl({
              tokenId,
              size: isOwnedByUser ? 2048 : 1024
            })}
            width='100%'
            /*
            onClick={() => {
              setNextTokenId({
                direction: 'right'
              })
            }}
            */
          />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <div>
              {isAvailable && <AsleepFilled16 />}
              {isTaken && !ownedByUser && <Locked16 />}
              {ownedByUser && (
                <img src={OwnedByUserIcon32x32} alt='Owned by User' />
              )}
            </div>
            <div style={{ marginTop: '18px' }}>
              <Share16 onClick={() => shareTotem()} />
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '30px' }}>
              {trait_name1} {trait_name2}
            </div>
            <div style={{ fontSize: '20px', fontWeight: 600 }}>
              {trait_jobField} {trait_jobTitle}
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <div>
              {!isFavorite && (
                <Favorite16
                  role='button'
                  style={{ fill: 'white', cursor: 'pointer' }}
                  onClick={() => updateFavorites(tokenId)}
                />
              )}
              {isFavorite && (
                <FavoriteFilled16
                  role='button'
                  style={{ fill: '#DA1E28', cursor: 'pointer' }}
                  onClick={() => updateFavorites(tokenId)}
                />
              )}
            </div>
            <div style={{ marginTop: '18px' }}>
              <Information16 onClick={() => toggleVisibilityMetaData()} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={6} />
        <Col xs={12}>
          <div
            style={{
              marginTop: '15px',
              textAlign: 'center'
            }}
          >
            {isTaken && (
              <a
                href={`https://opensea.io/assets/0x8fe83f6f7f726a2c9e238b7e094c4bf530bc9720/${tokenId}`}
                target='_blank'
                rel='noreferrer'
              >
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
            {address && isAvailable && (
              <Button
                type='primary'
                size='small'
                style={{
                  ...buttonStyle
                }}
                onClick={() => mint(address, tokenId)}
              >
                Summon this Totem (0.05 ??)
              </Button>
            )}
          </div>
        </Col>
        <Col xs={6} />
      </Row>
    </div>
  )
}
