import React, { useEffect, useState } from 'react'
import { clone } from 'underscore'

import { Footer } from '../../layout'
import { ActionSidebar } from '../../sharedComponents'
import CreaturePageDesktop from './desktop'
import CreaturePageMobile from './mobile'

export default function CreaturePage({ ethereumProps, nftAppProps }) {
  const { isMobile } = nftAppProps

  const features = [
    'creatureName',
    'chatbot',
    'creatureMetaData',
    'creatureDownloads',
    'writeCreatureStory',
    'creatureActions'
  ]

  useEffect(() => {
    // scroll to top on load
    window.scrollTo(0, 0)
  }, [])

  let initialFeaturesVisibilityState = {}
  features.map(feature => {
    initialFeaturesVisibilityState[feature] = { visible: false }
  })
  const [featuresVisibility, setFeaturesVisibility] = useState(
    initialFeaturesVisibilityState
  )

  const toggleFeature = featureToToggle => {
    let updatedFeaturesVisibility = clone(featuresVisibility)
    features.map(feature => {
      if (feature === featureToToggle) {
        updatedFeaturesVisibility[feature].visible =
          !featuresVisibility[feature].visible
      } else {
        updatedFeaturesVisibility[feature].visible = false
      }
    })
    setFeaturesVisibility(updatedFeaturesVisibility)
  }

  const hideAllFeatures = () => {
    let updatedFeaturesVisibility = clone(featuresVisibility)
    features.map(
      feature => (updatedFeaturesVisibility[feature].visible = false)
    )
    setFeaturesVisibility(updatedFeaturesVisibility)
    setOneFeatureIsVisible(false)
  }

  const toggleVisibilityDownload = () => toggleFeature('creatureDownloads')
  const toggleVisibilityMetaData = () => toggleFeature('creatureMetaData')
  const toggleVisibilityChat = () => toggleFeature('chatbot')
  const toggleVisibilityCreatureStory = () =>
    toggleFeature('writeCreatureStory')
  const toggleVisibilityTotemActions = () => toggleFeature('creatureActions')

  const [oneFeatureIsVisible, setOneFeatureIsVisible] = useState(false)

  useEffect(() => {
    let _oneFeatureIsVisible = false
    Object.keys(featuresVisibility).map(key => {
      if (featuresVisibility[key].visible) {
        _oneFeatureIsVisible = true
      }
    })
    setOneFeatureIsVisible(_oneFeatureIsVisible)
  }, [featuresVisibility])

  const featureIsVisible = feature => featuresVisibility[feature].visible

  return (
    <>
      <ActionSidebar
        ethereumProps={ethereumProps}
        nftAppProps={{
          ...nftAppProps,
          featuresVisibility,
          featureIsVisible,
          oneFeatureIsVisible,
          hideAllFeatures,
          toggleVisibilityDownload,
          toggleVisibilityMetaData,
          toggleVisibilityChat,
          toggleVisibilityCreatureStory,
          toggleVisibilityTotemActions
        }}
      />

      {!isMobile && (
        <CreaturePageDesktop
          ethereumProps={ethereumProps}
          nftAppProps={{
            ...nftAppProps,
            featuresVisibility,
            featureIsVisible,
            oneFeatureIsVisible,
            hideAllFeatures
          }}
        />
      )}
      {isMobile && (
        <CreaturePageMobile
          ethereumProps={ethereumProps}
          nftAppProps={{
            ...nftAppProps,
            featuresVisibility,
            featureIsVisible,
            oneFeatureIsVisible,
            hideAllFeatures
          }}
        />
      )}

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 1000
        }}
      >
        <Footer ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
      </div>
    </>
  )
}
