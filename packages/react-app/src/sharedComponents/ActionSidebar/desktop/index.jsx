import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  QueryQueue16,
  ColorPalette16,
  ChatBot16,
  Edit16,
  ZoomIn16,
  Download16,
  Information16,
  Launch16,
  ViewFilled16,
  CarouselHorizontal16,
  Apps16,
  List16,
  Filter16,
  AsleepFilled16,
  Locked16,
  FavoriteFilled16,
  Shuffle16
} from '@carbon/icons-react'

import { DESKTOP_HEADER_HEIGHT } from '../../../constants'
import Icons from '../../icons'
const { OwnedByUserIcon16x16, NotMintedIcon16x16 } = Icons

import './style.css'

export default function ActionSidebar({ ethereumProps, nftAppProps }) {
  const { setRoute, setShowGrid, shuffleVisibleCreatures } = nftAppProps

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

  const menuItemContentStyle = {
    text: {
      float: 'left',
      marginTop: '-3px'
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
          textAlign: 'center',
          filter: 'brightness(110%)'
        }}
        onClick={() => toggleView()}
      >
        <QueryQueue16 aria-label='Toggle menu' />
      </div>
      {view === viewStates.visibleWide && (
        <div
          style={{
            float: 'left',
            width: '100%',
            borderTop: '1px solid #6F6F6F'
          }}
        >
          <div
            style={{
              float: 'right',
              width: '100%',
              textAlign: 'center',
              backgroundColor: '#262626',
              height: `calc(100vh - ${DESKTOP_HEADER_HEIGHT}px)`
            }}
          >
            <div className='menu-item title' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>View</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ViewFilled16 aria-label='TODO' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <Link
                onClick={() => {
                  setRoute('/talismoon')
                }}
                to={`/talismoon/${0}`}
              >
                <div style={{ ...menuItemContentStyle.text }}>Item View</div>
                <div style={{ ...menuItemContentStyle.icon }}>
                  <CarouselHorizontal16 aria-label='Switch to carousel view' />
                </div>
              </Link>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div
                style={{ ...menuItemContentStyle.text }}
                aria-label='Switch to area view'
                onClick={() => setShowGrid(true)}
              >
                Grid View
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Apps16 />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div
                style={{ ...menuItemContentStyle.text }}
                aria-label='Switch to list view'
                onClick={() => setShowGrid(false)}
              >
                List View
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <List16 />
              </div>
            </div>
            <div className='menu-item title' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Filter</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Filter16 aria-label='TODO' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>All Talismoons</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <AsleepFilled16 aria-label='TODO' />
              </div>
            </div>
            <div
              className='menu-item'
              style={{
                ...menuItemStyle,
                paddingTop: '8px',
                paddingBottom: '9px'
              }}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Available Talismoons
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <img src={NotMintedIcon16x16} alt='Not Minted' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Not Available Talismoons
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Locked16 aria-label='TODO' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Favorite Talismoons
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <FavoriteFilled16
                  aria-label='TODO'
                  style={{ fill: '#DA1E28' }}
                />
              </div>
            </div>
            <div
              className='menu-item'
              style={{
                ...menuItemStyle,
                paddingTop: '8px',
                paddingBottom: '9px',
                borderBottom: '1px solid #24A148'
              }}
            >
              <div style={{ ...menuItemContentStyle.text }}>My Talismoons</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <img src={OwnedByUserIcon16x16} alt='Minted' />
              </div>
            </div>
            <div
              className='menu-item shuffle'
              style={{
                ...menuItemStyle,
                backgroundColor: '#24A148',
                borderBottom: '1px solid #24A148'
              }}
            >
              <div style={{ ...menuItemContentStyle.text }}>Shuffle</div>
              <div
                style={{ ...menuItemContentStyle.icon }}
                aria-label='Shuffle'
                onClick={() => shuffleVisibleCreatures()}
              >
                <Shuffle16 />
              </div>
            </div>
            <div className='menu-item title' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Tools</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ColorPalette16 aria-label='Color' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Consult your Talismoon
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ChatBot16 aria-label='Chat' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Write the Story
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Edit16 aria-label='Edit' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                View Full Resolution
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ZoomIn16 aria-label='Zoom' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Download Files</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Download16 aria-label='Download' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Show all Metadata
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Information16 aria-label='Details' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Explore on OpenSea
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Launch16 aria-label='Explore on OpenSea' />
              </div>
            </div>
          </div>
        </div>
      )}

      {view === viewStates.visible && (
        <div
          style={{
            float: 'right',
            width: '100%',
            textAlign: 'center',
            backgroundColor: '#262626',
            height: `calc(100vh - ${DESKTOP_HEADER_HEIGHT}px)`
          }}
        >
          <div className='menu-item square-title' style={{ ...menuItemStyle }}>
            <ViewFilled16 aria-label='TODO' />
          </div>
          <Link
            onClick={() => {
              setRoute('/talismoon')
            }}
            to={`/talismoon/${0}`}
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <CarouselHorizontal16 aria-label='Switch to carousel view' />
            </div>
          </Link>

          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            aria-label='Switch to area view'
            onClick={() => setShowGrid(true)}
          >
            <Apps16 />
          </div>
          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            aria-label='Switch to list view'
            onClick={() => setShowGrid(false)}
          >
            <List16 />
          </div>
          <div className='menu-item square-title' style={{ ...menuItemStyle }}>
            <Filter16 aria-label='TODO' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <AsleepFilled16 aria-label='TODO' />
          </div>
          <div
            className='menu-item'
            style={{
              ...menuItemStyle,
              paddingTop: '8px',
              paddingBottom: '9px'
            }}
          >
            <img src={NotMintedIcon16x16} alt='Not Minted' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Locked16 aria-label='TODO' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <FavoriteFilled16 aria-label='TODO' style={{ fill: '#DA1E28' }} />
          </div>
          <div
            className='menu-item'
            style={{
              ...menuItemStyle,
              paddingTop: '8px',
              paddingBottom: '9px',
              borderBottom: 'none'
            }}
          >
            <img src={OwnedByUserIcon16x16} alt='Minted' />
          </div>
          <div
            className='menu-item shuffle'
            style={{
              ...menuItemStyle,
              backgroundColor: '#24A148',
              borderBottom: 'none'
            }}
            aria-label='Shuffle'
            onClick={() => shuffleVisibleCreatures()}
          >
            <Shuffle16 />
          </div>
          <div
            className='menu-item square-title'
            style={{ ...menuItemStyle, borderTop: '1px solid #6F6F6F' }}
          >
            <ColorPalette16 aria-label='Color' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <ChatBot16 aria-label='Chat' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Edit16 aria-label='Edit' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <ZoomIn16 aria-label='Zoom' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Download16 aria-label='Download' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Information16 aria-label='Details' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Launch16 aria-label='TODO' />
          </div>
        </div>
      )}
    </div>
  )
}
