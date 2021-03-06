import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { QueryQueue16 } from '@carbon/icons-react'

import { HEADER_HEIGHT } from '../../constants'

import CompactSidebar from './CompactSidebar'
import OpenSidebar from './OpenSidebar'

import './style.css'

export default function ActionSidebar({ ethereumProps, nftAppProps }) {
  const { usersCreaturesTokenIds } = nftAppProps

  const checkIfShouldShowCreatureFeatures = () => {
    const removeFirstChar = str => str.substring(1)
    const location = useLocation()

    const possibleTokenId = removeFirstChar(location.pathname)
    if (!isNaN(possibleTokenId)) {
      const currentCreatureTokenId = parseInt(possibleTokenId)
      const creatureIsOwnedByUser = usersCreaturesTokenIds.includes(
        currentCreatureTokenId
      )
      return creatureIsOwnedByUser
    }
    return false
  }

  const showCreatureFeatures = checkIfShouldShowCreatureFeatures()

  const viewStates = {
    hidden: 'hidden',
    visibleNarrow: 'visible-narrow',
    visibleWide: 'visible-wide'
  }

  const [view, setView] = useState(viewStates.hidden)

  const toggleView = () => {
    if (view === viewStates.hidden) setView(viewStates.visibleNarrow)
    if (view === viewStates.visibleNarrow) setView(viewStates.visibleWide)
    if (view === viewStates.visibleWide) setView(viewStates.hidden)
  }

  const getToggleButtonPosition = () => {
    if (view === viewStates.visibleWide) return '250px'
    if (view === viewStates.visibleNarrow) return '50px'
    return '0px'
  }
  const getSidebarWidth = () => {
    if (view === viewStates.visibleWide) return '250px'
    if (view === viewStates.visibleNarrow) return '50px'
    return '0px'
  }

  const getMenuItemPaddingLeft = () => {
    if (view === viewStates.visibleWide) return '35px'
    if (view === viewStates.visibleNarrow) return '15px'
    return '15px'
  }

  const menuItemStyle = {
    float: 'left',
    width: '100%',
    paddingLeft: getMenuItemPaddingLeft(),
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '5px',
    borderBottom: '1px solid #6F6F6F',
    cursor: 'pointer'
  }

  return (
    <div
      id='actionSidebar'
      style={{
        position: 'fixed',
        top: `calc(${HEADER_HEIGHT}px - 1px)`,
        right: 0,
        width: getSidebarWidth(),
        height: 'auto',
        overflowY: 'auto',
        zIndex: 1000
      }}
    >
      <div
        className='menu-item toggle-menu'
        style={{
          ...menuItemStyle,
          position: 'fixed',
          top: '119px',
          right: getToggleButtonPosition(),
          height: '39px',
          width: '44px',
          paddingLeft: '15px',
          backgroundColor: '#262626',
          borderBottom: 'none',
          textAlign: 'center'
        }}
        onClick={() => toggleView()}
      >
        <QueryQueue16 aria-label='Toggle menu' />
      </div>
      {view === viewStates.visibleWide && (
        <OpenSidebar
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          showCreatureFeatures={showCreatureFeatures}
          menuItemStyle={menuItemStyle}
        />
      )}

      {view === viewStates.visibleNarrow && (
        <CompactSidebar
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          showCreatureFeatures={showCreatureFeatures}
          menuItemStyle={menuItemStyle}
        />
      )}
    </div>
  )
}
