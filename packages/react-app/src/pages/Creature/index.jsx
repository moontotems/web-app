import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button } from 'antd'
import { ethers } from 'ethers'
import {
  CheckmarkOutline32,
  CheckmarkFilled32,
  Favorite32,
  FavoriteFilled32
} from '@carbon/icons-react'

import { useEventListener } from '../../hooks'
import creature_meta_data_hashmap from '../../creature_meta_data_hashmap.json'
import './styles.css'

export default function CreaturePage({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  favorites: { favoritedIds, checkIfIsFavorite, updateFavorites },
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let { id: tokenId } = useParams()
  tokenId = parseInt(tokenId)

  const {
    age,
    birthDay,
    birthMonth,
    birthYear,
    birthYearStr,
    edition,
    eyeAsymmetrical,
    eyeColor1,
    eyeColor2,
    eyeMulticolor,
    lunarOriginBatchId,
    lunarOriginId,
    lunarOriginName,
    lunarOriginNameLatin,
    lunarOriginQuantity,
    moonMonth,
    moonMonthId,
    moonPhase,
    moonPhaseId,
    P,
    rarity,
    rarityOrigin,
    seedGlobal,
    seedLocal,
    spawn_DateDay,
    spawn_DateMonth,
    spawn_DateYear,
    spawn_Hour,
    total,
    trait_jobField,
    trait_jobTitle,
    trait_name1,
    trait_name2,
    trait_personality1,
    trait_personality2,
    trait_personality3
  } = creature_meta_data_hashmap[tokenId]

  const mintEvents = useEventListener(
    readContracts,
    'NFTokenMetadataEnumerableMock',
    'Mint',
    localProvider,
    1
  )
  const mintEventsMap = {}
  mintEvents.map(mintEvent => {
    mintEventsMap[mintEvent._tokenId] = mintEvent
    // convert _tokenId from bigNumber to string
    mintEventsMap[mintEvent._tokenId]['1'] =
      mintEventsMap[mintEvent._tokenId]['1'].toString()
  })

  let prefixedTokenId = ''
  if (tokenId < 10) {
    prefixedTokenId = `0000${tokenId}`
  } else if (tokenId < 100) {
    prefixedTokenId = `000${tokenId}`
  } else if (tokenId < 1000) {
    prefixedTokenId = `00${tokenId}`
  }

  //const image = `https://talismoonstest.blob.core.windows.net/images/TALISMOONS_BATCH01.${tokenId}.jpeg`
  const image = `/images/creatures/TALISMOONS_GEN01_2k/TALISMOONS_GEN01_2k${prefixedTokenId}.png`

  const minted = !!mintEventsMap[tokenId]

  const isFavorite = checkIfIsFavorite(tokenId)

  const mint = () => {
    const to = address
    const value = ethers.utils.parseEther('0.1')
    console.log({ to, tokenId, value })

    tx(
      writeContracts.NFTokenMetadataEnumerableMock.mint(to, tokenId, {
        gasPrice,
        // gasLimit: 1000000
        value
        // nonce:
      })
    )
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div
        style={{ position: 'fixed', top: 90, left: 0, width: 600, padding: 20 }}
      >
        <div
          style={{
            float: 'left',
            width: '20%',
            paddingRight: 10,
            fontFamily: 'UniversLTStd',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '18px',
            lineHeight: '24px',
            textAlign: 'right',
            color: '#fff',
            opacity: 0.5
          }}
        >
          <div className='creature-attribute-prefix'>Name</div>
          <div className='creature-attribute-prefix'>Title</div>
          <div className='creature-attribute-prefix'>From</div>
          <div className='creature-attribute-prefix'>Personality</div>
          <div className='creature-attribute-prefix'>Lunar Sign</div>
          <div className='creature-attribute-prefix'>Age</div>
          <div className='creature-attribute-prefix'>Rarity</div>
        </div>
        <div
          style={{
            float: 'left',
            width: '75%',
            fontFamily: 'UniversLTStd',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '18px',
            lineHeight: '24px',
            textAlign: 'left',
            color: '#fff'
          }}
        >
          <div className='creature-attribute-value' style={{ fontSize: 30 }}>
            {trait_name1} {trait_name2}
          </div>
          <div className='creature-attribute-value'>
            <b>
              {trait_jobField} {trait_jobTitle}
            </b>
          </div>
          <div className='creature-attribute-value'>
            <b>{lunarOriginName}</b>
          </div>
          <div className='creature-attribute-value'>
            {trait_personality1}, {trait_personality2}, {trait_personality3}
          </div>
          <div className='creature-attribute-value'>{lunarOriginNameLatin}</div>
          <div className='creature-attribute-value'>{age} years</div>
          <div className='creature-attribute-value'>{rarity}</div>
        </div>
      </div>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <img src={image} width='100%' />
          <Row>
            <Col span={24}>
              <div style={{ float: 'left', width: '10%' }}>
                <CheckmarkOutline32 style={{ fill: '#4589FF' }} />
                <CheckmarkFilled32 style={{ fill: '#00FF74' }} />
              </div>
              <div style={{ float: 'left', width: '80%' }}>
                {minted && (
                  <a
                    href='https://opensea.io/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Button type='primary'>View on Opensea</Button>
                    <Button
                      type='primary'
                      style={{
                        marginTop: '20px',
                        backgroundColor: '#24A148',
                        borderColor: '#24A148'
                      }}
                    >
                      Make offer on Opensea
                    </Button>
                  </a>
                )}
                {!minted && (
                  <Button
                    block
                    type='success'
                    onClick={() => mint()}
                    style={{ marginTop: '20px' }}
                  >
                    Summon this Totem (0.1 Ξ)
                  </Button>
                )}
              </div>
              <div style={{ float: 'left', width: '10%' }}>
                {!isFavorite && (
                  <Favorite32
                    role='button'
                    style={{ fill: 'white', cursor: 'pointer' }}
                    onClick={() => updateFavorites(tokenId)}
                  />
                )}
                {isFavorite && (
                  <FavoriteFilled32
                    role='button'
                    style={{ fill: '#DA1E28', cursor: 'pointer' }}
                    onClick={() => updateFavorites(tokenId)}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6} />
      </Row>
    </div>
  )
}
