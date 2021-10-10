import React from 'react'

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

const HEADER_HEIGHT_MOBILE = '80px'

export default function HomePageMobile({ ethereumProps, nftAppProps }) {
  const containerStyle = {
    float: 'right',
    height: `calc(100vh - ${HEADER_HEIGHT_MOBILE})`,
    width: '100%',
    backgroundColor: '#000'
  }

  return (
    <div style={{ fontFamily: 'IBM Plex Sans', fontStyle: 'normal' }}>
      <div style={{ ...containerStyle }}>
        <WhatAreSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle }}>
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
        <div>
          <div
            style={{
              padding: '5%',
              paddingBottom: 0,
              fontSize: '35px'
            }}
          >
            Lunar Phases
          </div>
        </div>
      </div>
      <div style={{ ...containerStyle }}>
        <LunarPhasesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div
        style={{
          float: 'right',
          width: '100%'
        }}
      >
        <div>
          <div
            style={{
              padding: '5%',
              paddingBottom: 0,
              fontSize: '35px'
            }}
          >
            Unique Features
          </div>
        </div>
      </div>
      <div style={{ ...containerStyle }}>
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
        <div>
          <div
            style={{
              padding: '5%',
              paddingBottom: 0,
              fontSize: '35px'
            }}
          >
            Lunar Signs
          </div>
        </div>
      </div>
      <div style={{ ...containerStyle }}>
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
        <div>
          <div
            style={{
              padding: '5%',
              paddingBottom: 0,
              fontSize: '35px'
            }}
          >
            Lunar Origins
          </div>
        </div>
      </div>
      <div style={{ ...containerStyle }}>
        <LunarOriginsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle }}>
        <SocialMediaSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
    </div>
  )
}
