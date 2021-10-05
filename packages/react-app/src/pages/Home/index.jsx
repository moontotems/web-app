import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import {
  ArrowRight32,
  ChatBot32,
  Edit32,
  ZoomIn32,
  LogoInstagram32,
  LogoTwitter32,
  LogoDiscord32
} from '@carbon/icons-react'

import {
  CharacteristicsSection,
  MoonSection,
  MoonOriginsSection,
  NFTTutorialSection,
  SocialMediaSection,
  UniqueFeaturesSection,
  WhatAreSection
} from './components'

export default function Home({ ethereumProps, nftAppProps }) {
  return (
    <>
      <div
        style={{
          float: 'right',
          //height: '100vh',
          width: '100%',
          overflowX: 'hidden'
        }}
      >
        <WhatAreSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%',
          paddingTop: '5%'
        }}
      >
        <CharacteristicsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%',
          marginTop: '15%'
          //paddingTop: '10%'
        }}
      >
        <UniqueFeaturesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%',
          marginTop: '10%'
        }}
      >
        <MoonOriginsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%'
        }}
      >
        <MoonSection ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%'
          //paddingTop: '10%'
        }}
      >
        <SocialMediaSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%'
          //paddingTop: '10%'
        }}
      >
        <NFTTutorialSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
    </>
  )
}
