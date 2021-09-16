import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Menu, Button, Dropdown } from 'antd'
import { ethers } from 'ethers'
import {
  CheckmarkOutline32,
  CheckmarkFilled32,
  Favorite32,
  FavoriteFilled32,
  Filter32,
  Apps32,
  CarouselHorizontal32,
  List32,
  Download32,
  Information32,
  ChatBot32,
  Edit32,
  ZoomIn32
} from '@carbon/icons-react'

import { useEventListener } from '../../hooks'
import creature_metadata_hashmap from '../../creature_metadata_hashmap.json'
import { Attributes, Chatbot } from './components'
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

  const { id: tokenId } = useParams()

  const [showMetadata, setShowMetadata] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const creatureMetadata = creature_metadata_hashmap[tokenId]

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

  const image = `https://talismoonstest.blob.core.windows.net/finalrenders/TALISMOONS_GEN01_2k${prefixedTokenId}.png`
  //const image = `/images/creatures/TALISMOONS_GEN01_2k/TALISMOONS_GEN01_2k${prefixedTokenId}.png`

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

  const iconStyle = {
    margin: '0 20px',
    cursor: 'pointer'
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.antgroup.com'
        >
          PNG (10mb)
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.aliyun.com'
        >
          OBJ (239kb)
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div
        style={{
          position: 'fixed',
          top: 30,
          left: 0,
          width: 600,
          padding: 20,
          zIndex: 100
        }}
      >
        {showChat && (
          <div style={{ width: '60%' }}>
            <Chatbot image={image} />
          </div>
        )}
        {showMetadata && (
          <div style={{ marginTop: 50 }}>
            <Attributes creatureMetadata={creatureMetadata} />
          </div>
        )}
      </div>
      <Row>
        <Col xs={24} md={6} />
        <Col xs={24} md={12}>
          <img src={image} width='100%' />
          <Row>
            <Col span={24}>
              <div style={{ float: 'left', width: '10%' }}>
                {minted && <CheckmarkOutline32 style={{ fill: '#4589FF' }} />}
                {!minted && <CheckmarkFilled32 style={{ fill: '#00FF74' }} />}
              </div>
              <div style={{ float: 'left', width: '80%', textAlign: 'center' }}>
                {minted && (
                  <a
                    href='https://opensea.io/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Button type='primary'>View on Opensea</Button>
                    {/*<Button
                      type='primary'
                      style={{
                        backgroundColor: '#24A148',
                        borderColor: '#24A148'
                      }}
                    >
                      Make offer on Opensea
                    </Button>*/}
                  </a>
                )}
                {!minted && (
                  <Button
                    type='success'
                    style={{
                      backgroundColor: '#24A148',
                      borderColor: '#24A148',
                      color: '#fff'
                    }}
                    onClick={() => mint()}
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
          <Row>
            <Col span={24}>
              <div style={{ margin: '45px 0', textAlign: 'center' }}>
                <Filter32 aria-label='Filter' style={{ ...iconStyle }} />
                <Apps32
                  aria-label='Switch to area view'
                  style={{ ...iconStyle }}
                />
                <CarouselHorizontal32 style={{ ...iconStyle }} />
                <List32
                  aria-label='Switch to list view'
                  style={{ ...iconStyle }}
                />
                <Dropdown overlay={menu} placement='topCenter'>
                  <Button
                    id='downloadButton'
                    style={{ padding: 0, border: 'none' }}
                  >
                    <Download32
                      aria-label='Download'
                      style={{ ...iconStyle, color: '#fff' }}
                    />
                  </Button>
                </Dropdown>
                {/*
                <Dropdown
                  ariaLabel='Dropdown'
                  id='carbon-dropdown-example'
                  items={['.jpg', '.png']}
                  label={
                    <Download32
                      aria-label='Download'
                      style={{ ...iconStyle, color: '#fff' }}
                    />
                  }
                  titleText='Dropdown title'
                  style={{ width: 'auto' }}
                />
                */}
                <Information32
                  aria-label='Show Info'
                  style={{ ...iconStyle }}
                  onClick={() => {
                    setShowChat(false)
                    setShowMetadata(!showMetadata)
                  }}
                />
                <ChatBot32
                  aria-label='Chat'
                  style={{ ...iconStyle }}
                  onClick={() => {
                    setShowMetadata(false)
                    setShowChat(!showChat)
                  }}
                />
                <Edit32 style={{ ...iconStyle }} />
                <ZoomIn32 aria-label='Zoom' style={{ ...iconStyle }} />
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={6} />
      </Row>
    </div>
  )
}
