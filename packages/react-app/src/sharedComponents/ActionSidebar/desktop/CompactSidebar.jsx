import React from 'react'
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

export default function CompactSidebar({
  ethereumProps,
  nftAppProps,
  menuItemStyle
}) {
  const { setRoute, setShowGrid, shuffleVisibleCreatures } = nftAppProps

  return (
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
        <img
          src='/TALISMOON_LOGO.svg'
          width='17px'
          style={{ marginTop: '-10px' }}
          alt='All Talismoon'
        />
      </div>
      <div className='menu-item' style={{ ...menuItemStyle }}>
        <AsleepFilled16 aria-label='TODO' />
        {/*<img src={NotMintedIcon16x16} alt='Not Minted' />*/}
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
  )
}
