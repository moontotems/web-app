import React from 'react'
import { Divider } from 'antd'
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
  ExampleCreaturesSection,
  RoadmapSection,
  TeamSection
} from './components'

export default function HomePageDesktop({ ethereumProps, nftAppProps }) {
  const containerStyle = {
    float: 'right',
    //height: `calc(100vh - ${HEADER_HEIGHT_DESKTOP})`,
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
        <ExampleCreaturesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle, height: 'auto' }}>
        <RoadmapSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      <div style={{ ...containerStyle, height: 'auto' }}>
        <TeamSection ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </div>
      {/*
      <div style={{ ...containerStyle, height: 'auto' }}>
        <LunarPhasesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      */}
      {/*
      <div style={{ ...containerStyle, height: 'auto' }}>
        <LunarMonthsSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
      */}
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
      <div style={{ ...containerStyle, height: 'auto' }}>
        <ExampleCreaturesSection
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      </div>
    </div>
  )
}
