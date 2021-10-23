import React from 'react'
import { Link } from 'react-router-dom'
import {
  FacePendingFilled16,
  AsleepFilled16,
  UserProfile16,
  Idea16,
  LocationPersonFilled16,
  ChartMultitype16,
  LogoInstagram16,
  LogoTwitter16,
  LogoDiscord16,
  TaskView16,
  Policy16
} from '@carbon/icons-react'

import { DESKTOP_HEADER_HEIGHT } from '../../../constants'

import '../style.css'

const iconStyle = {
  float: 'right'
}

export default function SidebarLeft({
  ethereumProps,
  nftAppProps,
  setSidebarLeftOpen
}) {
  const { setRoute } = nftAppProps

  const menuItemStyle = {
    float: 'left',
    width: '100%',
    paddingLeft: '35px',
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
      id='sidebarLeft'
      style={{
        position: 'fixed',
        top: `calc(${DESKTOP_HEADER_HEIGHT}px - 1px)`,
        left: 0,
        width: '250px',
        height: 'auto',
        overflowY: 'auto',
        zIndex: 1000
      }}
    >
      <div
        style={{
          float: 'left',
          width: '100%',
          borderTop: '1px solid #393939'
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
            <div style={{ ...menuItemContentStyle.text }}>About</div>
            <div style={{ ...menuItemContentStyle.icon }}></div>
          </div>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>
              What are Moon Totems?
            </div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <FacePendingFilled16 />
            </div>
          </div>
          <Link
            onClick={() => {
              setRoute('/attributes')
            }}
            to={'/attributes'}
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>
                Unique Characters
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <UserProfile16 />
              </div>
            </div>
          </Link>
          <div className='menu-item' style={{ ...menuItemStyle }}>
            <div style={{ ...menuItemContentStyle.text }}>
              Exclusive Features
            </div>
            <div style={{ ...menuItemContentStyle.icon }}>
              <Idea16 />
            </div>
          </div>
          <Link
            onClick={() => {
              setRoute('/lunar-origins')
            }}
            to={'/lunar-origins'}
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Lunar Origins</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <LocationPersonFilled16 />
              </div>
            </div>
          </Link>
          <Link
            onClick={() => {
              setRoute('/lunar-calendar')
            }}
            to={'/lunar-calendar'}
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Lunar Months</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <ChartMultitype16 />
              </div>
            </div>
          </Link>
          <Link
            onClick={() => {
              setRoute('/lunar-calendar')
            }}
            to={'/lunar-calendar'}
          >
            <div className='menu-item' style={{ ...menuItemStyle }}>
              <div style={{ ...menuItemContentStyle.text }}>Lunar Phases</div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <AsleepFilled16 />
              </div>
            </div>
          </Link>

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
                <LogoInstagram16 />
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
                <LogoTwitter16 />
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
                <LogoDiscord16 />
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
              style={{ ...menuItemStyle, height: '39px' }}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Explore on OpenSea
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <img src='/icons/Logo-OpenSea.svg' style={{ ...iconStyle }} />
              </div>
            </div>
          </a>
          <a
            href='https://etherscan.io/address/0x8fe83f6f7f726a2c9e238b7e094c4bf530bc9720'
            target='_blank'
            rel='noreferrer'
          >
            <div
              className='menu-item'
              style={{ ...menuItemStyle, height: '39px' }}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Explore on Etherscan
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <img src='/icons/Logo-Etherscan.svg' style={{ ...iconStyle }} />
              </div>
            </div>
          </a>
          {/*
          <Link
            onClick={() => {
              setRoute('/contract-events')
              setSidebarLeftOpen(false)
            }}
            to='/contract-events'
          >
            <div
              className='menu-item'
              style={{ ...menuItemStyle, height: '39px' }}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Contract Events
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <TaskView16 />
              </div>
            </div>
          </Link>
          <Link
            onClick={() => {
              setRoute('/contract-interface')
              setSidebarLeftOpen(false)
            }}
            to='/contract-interface'
          >
            <div
              className='menu-item'
              style={{ ...menuItemStyle, height: '39px' }}
            >
              <div style={{ ...menuItemContentStyle.text }}>
                Contract Interface
              </div>
              <div style={{ ...menuItemContentStyle.icon }}>
                <Policy16 />
              </div>
            </div>
          </Link>
          */}
        </div>
      </div>
    </div>
  )
}
