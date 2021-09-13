import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { ethers } from 'ethers'

export default function Creature({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts,
  creature: { tokenId, minted, metaData }
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

  //const image = `https://talismoonstest.blob.core.windows.net/images/TALISMOONS_BATCH01.${tokenId}.jpeg`
  const image = `/images/creatures/TALISMOONS_GEN01_2k/TALISMOONS_GEN01_2k${prefixedTokenId}.png`

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
            setRoute('/creature')
          }}
          to={`/creature/${tokenId}`}
        >
          <img src={image} width='100%' />
        </Link>

        <div>
          <div
            style={{
              //fontFamily: 'Univers LT Std',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '25px',
              letterSpacing: '0.04em',
              textAlign: 'center'
            }}
          >
            {`${trait_name1} ${trait_name2}`}
          </div>
          <div
            style={{
              //fontFamily: 'Univers LT Std',
              fontSize: '10px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '25px',
              letterSpacing: '0.04em',
              textAlign: 'center'
            }}
          >
            {trait_jobTitle} {trait_jobField}
          </div>
        </div>
        {!minted && <Button onClick={() => mint()}>Adopt for {0.1} Ξ</Button>}
      </div>
    </>
  )
}
