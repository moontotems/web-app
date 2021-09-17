import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ethers } from 'ethers'
import {
  CheckmarkOutline16,
  CheckmarkFilled16,
  Favorite16,
  FavoriteFilled16
} from '@carbon/icons-react'

export default function Creature({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  favorites: { favoritedIds, checkIfIsFavorite, updateFavorites },
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts,
  creature: { tokenId, minted, isFavorite, metaData }
}) {
  const [route, setRoute] = useState()
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute])

  let prefixedTokenId = ''
  if (tokenId < 10) {
    prefixedTokenId = `0000${tokenId}`
  } else if (tokenId < 100) {
    prefixedTokenId = `000${tokenId}`
  } else if (tokenId < 1000) {
    prefixedTokenId = `00${tokenId}`
  }

  const image = `https://talismoonstest.blob.core.windows.net/finalrenders/TALISMOONS_GEN01_2k${prefixedTokenId}.png`
  //const image = `/images/creatures/TALISMOONS_GEN01_2k/TALISMOONS_GEN01_2k${prefixedTokenId}.png`

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
  } = metaData || {}

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
    <>
      <div
        style={{
          minHeight: 104
        }}
      >
        <Link
          onClick={() => {
            setRoute('/totem')
          }}
          to={`/totem/${tokenId}`}
        >
          <img src={image} width='100%' />
        </Link>

        <div style={{ width: '100%' }}>
          <div style={{ float: 'left', width: '10%' }}>
            {minted && <CheckmarkOutline16 style={{ fill: '#4589FF' }} />}
            {!minted && <CheckmarkFilled16 style={{ fill: '#00FF74' }} />}
          </div>
          <div style={{ float: 'left', width: '80%' }}>
            <div
              style={{
                fontFamily: 'IBM Plex Sans',
                fontSize: 16,
                fontStyle: 'normal',
                fontWeight: 400,
                //lineHeight: '3em',
                marginBottom: 2,
                //letterSpacing: '0.04em',
                textAlign: 'center'
              }}
            >
              {`${trait_name1} ${trait_name2}`}
            </div>
            <div
              style={{
                fontFamily: 'IBM Plex Sans',
                fontSize: 13,
                fontStyle: 'normal',
                fontWeight: 300,
                //lineHeight: 5,
                //letterSpacing: '0.04em',
                textAlign: 'center'
              }}
            >
              {trait_jobField} {trait_jobTitle}
            </div>
          </div>
          <div style={{ float: 'left', width: '10%' }}>
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

            {/*<FavoriteFilled32 style={{ fill: 'red' }} />*/}
          </div>
        </div>
        {/*!minted && <Button onClick={() => mint()}>Adopt for {0.1} Ξ</Button>*/}
      </div>
    </>
  )
}
