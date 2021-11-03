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
  WhatAreSection,
  TeamSection,
  RoadmapSection,
  ExampleCreaturesSection
} from './components'

export default function HomePageMobile({ ethereumProps, nftAppProps }) {
  const containerStyle = {
    float: 'right',
    //height: `calc(100vh - ${HEADER_HEIGHT_MOBILE})`,
    height: 'auto',
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
        <UniqueCharactersSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle }}>
        <UniqueFeaturesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle }}>
        <TeamSection ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </div>
      <div style={{ ...containerStyle }}>
        <RoadmapSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle }}>
        <LunarPhasesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle }}>
        <LunarMonthsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
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
      <div style={{ ...containerStyle }}>
        <ExampleCreaturesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
    </div>
  )
}
