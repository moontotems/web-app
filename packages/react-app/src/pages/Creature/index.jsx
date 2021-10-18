import React, { useEffect } from 'react'
import $ from 'jquery'

import { ActionSidebar } from '../../sharedComponents'
import CreaturePageDesktop from './desktop'
import CreaturePageMobile from './mobile'

export default function CreaturePage({ ethereumProps, nftAppProps }) {
  const { isMobile } = nftAppProps

  // scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const toggleVisibilityDownload = () => {
    $('#creatureName').hide()
    $('#chatbot').hide()
    $('#creatureAttributes').hide()
    $('#creatureDownloads').toggle(500)
  }

  const toggleVisibilityMetaData = () => {
    $('#creatureName').hide()
    $('#chatbot').hide()
    $('#creatureDownloads').hide()
    $('#creatureAttributes').toggle(500)
  }

  const toggleVisibilityChat = () => {
    $('#creatureName').hide()
    $('#creatureAttributes').hide()
    $('#creatureDownloads').hide()
    $('#chatbot').toggle(500)
  }

  return (
    <>
      <ActionSidebar
        ethereumProps={ethereumProps}
        nftAppProps={{
          ...nftAppProps,
          toggleVisibilityDownload,
          toggleVisibilityMetaData,
          toggleVisibilityChat
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
