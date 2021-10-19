import React, { useEffect } from 'react'
import $ from 'jquery'

import { ActionSidebar } from '../../sharedComponents'
import CreaturePageDesktop from './desktop'
import CreaturePageMobile from './mobile'

export default function CreaturePage({ ethereumProps, nftAppProps }) {
  const { isMobile } = nftAppProps

  const features = [
    'creatureName',
    'chatbot',
    'creatureAttributes',
    'creatureDownloads',
    'writeCreatureStory'
  ]

  useEffect(() => {
    // scroll to top on load
    window.scrollTo(0, 0)
    features.map(feature => $(`#${feature}`).hide())
  }, [])

  const toggleFeature = featureToToggle => {
    features.map(feature => {
      if (feature === featureToToggle) {
        $(`#${feature}`).toggle(500)
      } else {
        $(`#${feature}`).hide()
      }
    })
  }

  const toggleVisibilityDownload = () => toggleFeature('creatureDownloads')
  const toggleVisibilityMetaData = () => toggleFeature('creatureAttributes')
  const toggleVisibilityChat = () => toggleFeature('chatbot')
  const toggleVisibilityCreatureStory = () =>
    toggleFeature('writeCreatureStory')

  return (
    <>
      <ActionSidebar
        ethereumProps={ethereumProps}
        nftAppProps={{
          ...nftAppProps,
          toggleVisibilityDownload,
          toggleVisibilityMetaData,
          toggleVisibilityChat,
          toggleVisibilityCreatureStory
        }}
      />

      {!isMobile && (
        <CreaturePageDesktop
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}
      {isMobile && (
        <CreaturePageMobile
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
      )}
    </>
  )
}
