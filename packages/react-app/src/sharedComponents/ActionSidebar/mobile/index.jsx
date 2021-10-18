import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  QueryQueue32,
  ColorPalette32,
  ChatBot32,
  Edit32,
  ZoomIn32,
  Download32,
  Information32,
  Launch32,
  ViewFilled32,
  CarouselHorizontal32,
  Apps32,
  List32,
  Filter32,
  AsleepFilled32,
  Locked32,
  FavoriteFilled32,
  Shuffle32
} from '@carbon/icons-react'

import { MOBILE_HEADER_HEIGHT } from '../../../constants'
import Icons from '../../icons'
const { OwnedByUserIcon32x32, NotMintedIcon32x32 } = Icons

import './style.css'

export default function ActionSidebar({ ethereumProps, nftAppProps }) {
  const { setRoute, setShowGrid, shuffleFilteredCreatures } = nftAppProps

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
              height: `calc(100vh - ${MOBILE_HEADER_HEIGHT}px)`
            }}
          >
            <div className='menu-item title' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>View</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ViewFilled32 aria-label='TODO' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Item View</div>
              <Link
                onClick={() => {
                  setRoute('/moontotem')
                }}
                to={`/moontotem/${0}`}
              >
                <div style={{ ...menuItemContentStyle.icon }}>
                  <CarouselHorizontal32 aria-label='Switch to carousel view' />
                </div>
              </Link>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Grid View</div>
              <div
                style={{ ...menuItemContentStyle.icon }}
                aria-label='Switch to area view'
                onClick={() => setShowGrid(true)}
              >
                <Apps32 />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>List View</div>
              <div
                style={{ ...menuItemContentStyle.icon }}
                aria-label='Switch to list view'
                onClick={() => setShowGrid(false)}
              >
                <List32 />
              </div>
            </div>
            <div className='menu-item title' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Filter</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Filter32 aria-label='TODO' />
              </div>
            </div>

            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>All Talismoons</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <AsleepFilled32 aria-label='TODO' />
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
                <img src={NotMintedIcon32x32} alt='Not Minted' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Minted Talismoons
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Locked32 aria-label='TODO' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Favorite Talismoons
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <FavoriteFilled32
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
                <img src={OwnedByUserIcon32x32} alt='Minted' />
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
                onClick={() => shuffleFilteredCreatures()}
              >
                <Shuffle32 />
              </div>
            </div>
            <div className='menu-item title' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Tools</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ColorPalette32 aria-label='Color' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Consult your Talismoon
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ChatBot32 aria-label='Chat' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Write the Story
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Edit32 aria-label='Edit' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                View Full Resolution
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ZoomIn32 aria-label='Zoom' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Download Files</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Download32 aria-label='Download' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Show All Metadata
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Information32 aria-label='Details' />
              </div>
            </div>
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Explore on OpenSea
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Launch32 aria-label='Explore on OpenSea' />
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
            height: `calc(100vh - ${MOBILE_HEADER_HEIGHT}px)`
          }}
        >
          <div className='menu-item square-title' style={{ ...menuItemStyle }}>
            <ViewFilled32 aria-label='TODO' />
          </div>
          <Link
            onClick={() => {
              setRoute('/moontotem')
            }}
            to={`/moontotem/${0}`}
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <CarouselHorizontal32 aria-label='Switch to carousel view' />
            </div>
          </Link>

          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            aria-label='Switch to area view'
            onClick={() => setShowGrid(true)}
          >
            <Apps32 />
          </div>

          <div
            className='menu-item'
            style={{ ...menuItemStyle }}
            aria-label='Switch to list view'
            onClick={() => setShowGrid(false)}
          >
            <List32 />
          </div>
          <div className='menu-item square-title' style={{ ...menuItemStyle }}>
            <Filter32 aria-label='TODO' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <AsleepFilled32 aria-label='TODO' />
          </div>
          <div
            className='menu-item'
            style={{
              ...menuItemStyle,
              paddingTop: '8px',
              paddingBottom: '9px'
            }}
          >
            <img src={NotMintedIcon32x32} alt='Not Minted' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Locked32 aria-label='TODO' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <FavoriteFilled32 aria-label='TODO' style={{ fill: '#DA1E28' }} />
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
            <img src={OwnedByUserIcon32x32} alt='Minted' />
          </div>
          <div
            className='menu-item shuffle'
            style={{
              ...menuItemStyle,
              backgroundColor: '#24A148',
              borderBottom: 'none'
            }}
            onClick={() => shuffleFilteredCreatures()}
          >
            <Shuffle32 aria-label='Shuffle' />
          </div>
          <div
            className='menu-item square-title'
            style={{ ...menuItemStyle, borderTop: '1px solid #6F6F6F' }}
          >
            <ColorPalette32 aria-label='Color' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <ChatBot32 aria-label='Chat' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Edit32 aria-label='Edit' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <ZoomIn32 aria-label='Zoom' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Download32 aria-label='Download' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Information32 aria-label='Details' />
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <Launch32 aria-label='TODO' />
          </div>
        </div>
      )}
    </div>
  )
}
