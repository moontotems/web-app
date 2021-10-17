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

export default function OpenSidebar({
  ethereumProps,
  nftAppProps,
  menuItemStyle
}) {
  const { setRoute, setShowGrid, shuffleVisibleCreatures } = nftAppProps

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
          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
          >
            <div style={{ ...menuItemContentStyle.text }}>All Talismoons</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <img
                src='/TALISMOON_LOGO.svg'
                width='17px'
                style={{ marginTop: '-10px' }}
                alt='All Talismoon'
              />
            </div>
          </Link>
        </div>
        <div
          className='menu-item'
          style={{
            ...menuItemStyle
            //paddingTop: '8px',
            //paddingBottom: '9px'
          }}
        >
          <div style={{ ...menuItemContentStyle.text }}>
            Available Talismoons
          </div>
          <div style={{ ...menuItemContentStyle.icon }}>
            {/*<img src={NotMintedIcon16x16} alt='Not Minted' />*/}
            <AsleepFilled16 aria-label='TODO' />
          </div>
        </div>
        <div className='menu-item' style={{ ...menuItemStyle }}>
          <div style={{ ...menuItemContentStyle.text }}>Minted Talismoons</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <Locked16 aria-label='TODO' />
          </div>
        </div>
        <div className='menu-item' style={{ ...menuItemStyle }}>
          <div style={{ ...menuItemContentStyle.text }}>
            Favorite Talismoons
          </div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <FavoriteFilled16 aria-label='TODO' style={{ fill: '#DA1E28' }} />
          </div>
        </div>
        <div
          className='menu-item'
          style={{
            ...menuItemStyle,
            //paddingTop: '8px',
            //paddingBottom: '9px',
            borderBottom: '1px solid #24A148'
          }}
        >
          <div style={{ ...menuItemContentStyle.text }}>My Talismoons</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <img
              src={OwnedByUserIcon16x16}
              style={{ marginTop: '-6px' }}
              alt='Minted'
            />
          </div>
        </div>
        <div
          className='menu-item shuffle'
          style={{
            ...menuItemStyle,
            backgroundColor: '#24A148',
            borderBottom: '1px solid #24A148'
          }}
          aria-label='Shuffle'
          onClick={() => shuffleVisibleCreatures()}
        >
          <div style={{ ...menuItemContentStyle.text }}>Shuffle</div>
          <div style={{ ...menuItemContentStyle.icon }}>
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
          <div style={{ ...menuItemContentStyle.text }}>Write the Story</div>
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
          <div style={{ ...menuItemContentStyle.text }}>Show all Metadata</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <Information16 aria-label='Details' />
          </div>
        </div>
        <div className='menu-item' style={{ ...menuItemStyle }}>
          <div style={{ ...menuItemContentStyle.text }}>Explore on OpenSea</div>
          <div style={{ ...menuItemContentStyle.icon }}>
            <Launch16 aria-label='Explore on OpenSea' />
          </div>
        </div>
      </div>
    </div>
  )
}
