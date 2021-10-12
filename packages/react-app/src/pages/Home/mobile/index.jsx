import React from 'react'

import {
  UniqueCharactersSection,
  LunarPhasesSection,
  LunarMonthsSection,
  LunarOriginsSection,
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
      <div style={{ ...containerStyle, height: 'auto' }}>
        <WhatAreSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle, height: 'auto' }}>
        <UniqueCharactersSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle, height: 'auto' }}>
        <UniqueFeaturesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle, height: 'auto' }}>
        <LunarMonthsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle, height: 'auto' }}>
        <LunarPhasesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle, height: 'auto' }}>
        <LunarOriginsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle, height: 'auto' }}>
        <SocialMediaSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
    </div>
  )
}
