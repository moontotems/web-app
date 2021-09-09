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

  const image = `https://talismoonstest.blob.core.windows.net/images/TALISMOONS_BATCH01.${tokenId}.jpeg`

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

        <div
          style={{
            fontWeight: 700,
            fontSize: '36px'
          }}
        >
          #{tokenId}
        </div>
        <div
          style={{
            margin: '10px 0',
            padding: '10px 0',
            fontWeight: 200,
            fontSize: 16,
            lineHeight: '2.12 em'
          }}
        >
          &quot;{`${trait_name1} ${trait_name2}`}&quot;
          <div style={{ fontSize: 12 }}>
            {trait_personality1}, {trait_personality2}, {trait_personality3}
          </div>
          <div>Age: {age}</div>
          <div>Moon Month: {moonMonth}</div>
          <div>Moon Phase: {moonPhase}</div>
          <div>Job Field: {trait_jobField}</div>
          <div>Job Title: {trait_jobTitle}</div>
          <div>Moon Phase: {birthYearStr}</div>
          <div>Lunar Origin Name: {lunarOriginName}</div>
          <div>Lunar Origin Name Latin: {lunarOriginNameLatin}</div>
          <div>Lunar Origin Quantity: {lunarOriginQuantity}</div>
        </div>

        {!minted && <Button onClick={() => mint()}>Adopt for {0.1} Ξ</Button>}
      </div>
    </>
  )
}
