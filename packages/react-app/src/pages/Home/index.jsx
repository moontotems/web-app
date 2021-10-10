import React from 'react'
import { Row, Col } from 'antd'

import {
  CharacteristicsSection,
  LunarSignsSection,
  LunarOriginsSection,
  LunarPhasesSection,
  SignColumnsSection,
  NFTTutorialSection,
  SocialMediaSection,
  UniqueFeaturesSection,
  WhatAreSection
} from './components'

export default function Home({ ethereumProps, nftAppProps }) {
  return (
    <div style={{ fontFamily: 'IBM Plex Sans', fontStyle: 'normal' }}>
      <div
        style={{
          float: 'right',
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
          width: '100%',
          overflowX: 'hidden'
        }}
      >
        <Row>
          <Col xs={24} md={5}>
            <div style={{ padding: '24px', fontSize: '20px' }}>
              Characteristics
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%'
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
          width: '100%',
          marginTop: '40px',
          overflowX: 'hidden'
        }}
      >
        <Row>
          <Col xs={24} md={5}>
            <div style={{ padding: '24px', fontSize: '20px' }}>
              Lunar Phases
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%'
        }}
      >
        <LunarPhasesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          width: '100%',
          marginTop: '40px',
          overflowX: 'hidden'
        }}
      >
        <Row>
          <Col xs={24} md={5}>
            <div style={{ padding: '24px', fontSize: '20px' }}>
              Unique Features
            </div>
          </Col>
          <Col xs={24} md={10}>
            <div
              style={{
                padding: '20px',
                fontSize: '27px',
                fontWeight: 300,
                lineHeight: '33px'
              }}
            ></div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%'
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
          width: '100%',
          marginTop: '40px',
          marginBottom: '40px',
          overflowX: 'hidden'
        }}
      >
        <Row>
          <Col xs={24} md={5}>
            <div style={{ padding: '24px', fontSize: '20px' }}>Lunar Signs</div>
          </Col>
          <Col xs={24} md={10}>
            <div
              style={{
                padding: '20px',
                fontSize: '27px',
                fontWeight: 300,
                lineHeight: '33px'
              }}
            ></div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%'
        }}
      >
        <LunarSignsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          width: '100%',
          marginTop: '40px',
          marginBottom: '40px',
          overflowX: 'hidden'
        }}
      >
        <Row>
          <Col xs={24} md={5}>
            <div style={{ padding: '24px', fontSize: '20px' }}>
              Lunar Origins
            </div>
          </Col>
          <Col xs={24} md={10}>
            <div
              style={{
                padding: '20px',
                fontSize: '27px',
                fontWeight: 300,
                lineHeight: '33px'
              }}
            ></div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          float: 'right',
          height: '100vh',
          width: '100%'
        }}
      >
        <LunarOriginsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          //height: '100vh',
          width: '100%'
          //paddingTop: '10%'
        }}
      >
        <SocialMediaSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      {/*
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
      */}
    </div>
  )
}
