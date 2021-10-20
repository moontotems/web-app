import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Menu, Button, Dropdown } from 'antd'
import $ from 'jquery'
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

import { useEventListener } from '../../../hooks'
import { getImageUrl } from '../../../helpers'
import houdini_json_hashmap from '../../assets/houdini_json_hashmap.json'
import Chatbot from '../Chatbot'
import MetaData from '../CreatureMetaData'
import Icons from '../icons'
const { OwnedByUserIcon16x16, NotMintedIcon16x16 } = Icons
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
    $('#chatbot').hide()
    $('#creatureMetaData').hide()
  }, [])

  const { id: tokenId } = useParams()

  const creatureMetadata = houdini_json_hashmap[tokenId]

  const mintEvents = useEventListener(
    readContracts,
    'MoonTotems',
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

  const image = getImageUrl(tokenId)
  const minted = !!mintEventsMap[tokenId]
  const isFavorite = checkIfIsFavorite(tokenId)

  const mint = () => {
    const to = address
    const value = ethers.utils.parseEther('0.1')
    console.log({ to, tokenId, value })

    tx(
      writeContracts.MoonTotems.mint(to, tokenId, {
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
        <div style={{ width: '60%' }}>
          <Chatbot image={image} tokenId={tokenId} />
        </div>
        <div style={{ marginTop: 50 }}>
          <MetaData creatureMetadata={creatureMetadata} />
        </div>
      </div>
      <Row>
        <Col xs={24} md={6} />
        <Col xs={24} md={12}>
          <img src={image} width='100%' />
          <Row>
            <Col span={24}>
              <div style={{ float: 'left' }}>
                {minted && <img src={OwnedByUserIcon} alt='Minted' />}
                {!minted && <img src={NotMintedIcon} alt='Not Minted' />}
              </div>
              <div
                style={{
                  float: 'left',
                  width: 'calc(100% - 64px)',
                  textAlign: 'center'
                }}
              >
                {minted && (
                  <a
                    href='https://opensea.io/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Button type='primary'>View on Opensea</Button>
                    {/*
                    <Button
                      type='primary'
                      style={{
                        backgroundColor: '#24A148',
                        borderColor: '#24A148'
                      }}
                    >
                      Make offer on Opensea
                    </Button>
                    */}
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
              <div style={{ float: 'left' }}>
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
                    console.log('click')
                    $('#chatbot').hide()
                    $('#creatureMetaData').toggle(500)
                  }}
                />
                <ChatBot32
                  aria-label='Chat'
                  style={{ ...iconStyle }}
                  onClick={() => {
                    console.log('click')
                    $('#creatureMetaData').hide()
                    $('#chatbot').toggle(500)
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
