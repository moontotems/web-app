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
  creature
}) {
  const [route, setRoute] = useState()
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute])
  console.log({ creature })

  const {
    id,
    name1,
    name2,
    generation,
    characteristic1,
    characteristic2,
    characteristic3,
    element,
    family,
    minted,
    image
  } = creature

  const mint = () => {
    const to = address
    const tokenId = id
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
          to={`/creature/${id}`}
        >
          <img src={image} width='100%' />
        </Link>

        <div
          style={{
            fontWeight: 700,
            fontSize: '36px'
          }}
        >
          #{id}
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
          &quot;{`${name1} ${name2}`}&quot;
          <div style={{ fontSize: 12 }}>
            {characteristic1}, {characteristic2}, {characteristic3}
          </div>
          <div>{element}</div>
          <div>Family: {family}</div>
          <div>Generation: {generation}</div>
        </div>

        {!minted && <Button onClick={() => mint()}>Adopt for {0.1} Ξ</Button>}
      </div>
    </>
  )
}
