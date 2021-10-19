import React, { useState } from 'react'

import { QueryQueue16 } from '@carbon/icons-react'

import { DESKTOP_HEADER_HEIGHT } from '../../../constants'

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
    visibleWide: 'visible-large'
  }

  const [view, setView] = useState(viewStates.visible)

  const toggleView = () => {
    if (view === viewStates.hidden) setView(viewStates.visible)
    if (view === viewStates.visible) setView(viewStates.visibleWide)
    if (view === viewStates.visibleWide) setView(viewStates.hidden)
  }

  const getToggleButtonPosition = () => {
    if (view === viewStates.visibleWide) return '250px'
    if (view === viewStates.visible) return '50px'
    return '0px'
  }
  const getSidebarWidth = () => {
    if (view === viewStates.visibleWide) return '250px'
    if (view === viewStates.visible) return '50px'
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
        top: `calc(${DESKTOP_HEADER_HEIGHT}px - 1px)`,
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
