import React, { useState } from 'react'

import { QueryQueue32 } from '@carbon/icons-react'

import { MOBILE_HEADER_HEIGHT } from '../../../constants'

import CompactSidebar from './CompactSidebar'
import OpenSidebar from './OpenSidebar'

import './style.css'

export default function ActionSidebar({
  ethereumProps,
  nftAppProps,
  creatureList
}) {
  const { showTools } = nftAppProps
  const viewStates = {
    hidden: 'hidden',
    visible: 'visible',
    visibleWide: 'visible-wide'
  }

  const [view, setView] = useState(viewStates.visible)

  const toggleView = () => {
    if (view === viewStates.hidden) setView(viewStates.visible)
    if (view === viewStates.visible) setView(viewStates.visibleWide)
    if (view === viewStates.visibleWide) setView(viewStates.hidden)
  }

  const getToggleButtonPosition = () => {
    if (view === viewStates.visibleWide) return '330px'
    if (view === viewStates.visible) return '61px'
    return '0px'
  }
  const getSidebarWidth = () => {
    if (view === viewStates.visibleWide) return '330px'
    if (view === viewStates.visible) return '61px'
    return '0px'
  }

  const getMenuItemPaddingLeft = () => {
    if (view === viewStates.visibleWide) return '35px'
    if (view === viewStates.visible) return '15px'
    return '15px'
  }

  const menuItemStyle = {
    float: 'left',
    width: '100%',
    paddingLeft: getMenuItemPaddingLeft(),
    paddingRight: '32px',
    paddingTop: '12px',
    paddingBottom: '5px',
    borderBottom: '1px solid #6F6F6F',
    cursor: 'pointer'
  }

  const menuItemContentStyle = {
    text: {
      float: 'left',
      marginTop: '1px',
      fontSize: '20px'
    },
    icon: {
      float: 'right'
    }
  }

  return (
    <div
      id='actionSidebar'
      style={{
        position: 'fixed',
        top: `calc(${MOBILE_HEADER_HEIGHT}px - 1px)`,
        right: 0,
        width: getSidebarWidth(),
        height: 'auto',
        overflowY: 'scroll',
        zIndex: 1000
      }}
    >
      <div
        className='menu-item toggle-menu'
        style={{
          ...menuItemStyle,
          position: 'fixed',
          top: '146px',
          right: getToggleButtonPosition(),
          height: '55px',
          width: '61px',
          paddingLeft: '15px',
          backgroundColor: '#262626',
          borderBottom: 'none',
          textAlign: 'center'
        }}
        onClick={() => toggleView()}
      >
        <QueryQueue32 aria-label='Toggle menu' />
      </div>
      {view === viewStates.visibleWide && (
        <OpenSidebar
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList}
          menuItemStyle={menuItemStyle}
          showTools={showTools}
        />
      )}

      {view === viewStates.visible && (
        <CompactSidebar
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
          creatureList={creatureList}
          menuItemStyle={menuItemStyle}
          showTools={showTools}
        />
      )}
    </div>
  )
}
