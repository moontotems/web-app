import React from 'react'
import { Link } from 'react-router-dom'
import {
  FacePendingFilled32,
  AsleepFilled32,
  UserProfile32,
  Idea32,
  LocationPersonFilled32,
  ChartMultitype32,
  LogoInstagram32,
  LogoTwitter32,
  LogoDiscord32
} from '@carbon/icons-react'

import { MOBILE_HEADER_HEIGHT } from '../../../constants'

import '../style.css'

export default function AidebarLeft({
  ethereumProps,
  nftAppProps,
  setSidebarLeftOpen
}) {
  const menuItemStyle = {
    float: 'left',
    width: '100%',
    paddingLeft: '35px',
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

  const iconStyle = {
    float: 'right',
    height: '30px',
    width: '30px'
  }

  return (
    <div
      id='sidebarLeft'
      style={{
        position: 'fixed',
        top: `calc(${MOBILE_HEADER_HEIGHT}px - 1px)`,
        left: 0,
        width: '330px',
        height: 'auto',
        overflowY: 'auto',
        zIndex: 1000
      }}
    >
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
            <div style={{ ...menuItemContentStyle.text }}>About</div>
            <div style={{ ...menuItemContentStyle.icon }}></div>
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>
              What are Moon Totems?
            </div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <FacePendingFilled32 />
            </div>
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>
              Unique Characters
            </div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <UserProfile32 />
            </div>
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>
              Exclusive Features
            </div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <Idea32 />
            </div>
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>Lunar Origins</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <LocationPersonFilled32 />
            </div>
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>Lunar Months</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <ChartMultitype32 />
            </div>
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>Lunar Phases</div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <AsleepFilled32 />
            </div>
          </div>

          <div className='menu-item title' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>Lates News</div>
            <div style={{ ...menuItemContentStyle.icon }}></div>
          </div>
          <a
            href='https://instagram.com/moontotems'
            target='_blank'
            rel='noreferrer'
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Instagram</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <LogoInstagram32 />
              </div>
            </div>
          </a>
          <a
            href='https://twitter.com/moontotemsnft'
            target='_blank'
            rel='noreferrer'
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Twitter</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <LogoTwitter32 />
              </div>
            </div>
          </a>
          <a
            href='https://discord.gg/73vMqt7k7H'
            target='_blank'
            rel='noreferrer'
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Discord</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <LogoDiscord32 />
              </div>
            </div>
          </a>

          <div className='menu-item title' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>NFT Tracking</div>
            <div style={{ ...menuItemContentStyle.icon }}></div>
          </div>
          <a href='https://opensea.io/' target='_blank' rel='noreferrer'>
            <div
              className='menu-item'
              style={{ ...menuItemStyle, height: '56px' }}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Explore on OpenSea
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <img src='/icons/Logo-OpenSea.svg' style={{ ...iconStyle }} />
              </div>
            </div>
          </a>
          <a href='https://etherscan.io/' target='_blank' rel='noreferrer'>
            <div
              className='menu-item'
              style={{ ...menuItemStyle, height: '56px' }}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Explore on Etherscan
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <img src='/icons/Logo-Etherscan.svg' style={{ ...iconStyle }} />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
