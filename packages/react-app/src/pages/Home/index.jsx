import React from 'react'

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
