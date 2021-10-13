import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import {
  TextAlignJustify32,
  AppSwitcher32,
  Moon16,
  FavoriteFilled16,
  JoinRight16,
  Logout16
} from '@carbon/icons-react'

import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem
} from 'carbon-components-react/lib/components/UIShell'

import { Account } from '../../../sharedComponents'
import { MOBILE_HEADER_HEIGHT } from '../../../constants'

export default function HeaderMobile({
  ethereumProps,
  nftAppProps,
  sidebarLeftOpen,
  setSidebarLeftOpen,
  headerTitle,
  setHeaderTitle,
  userSigner,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  networkDisplay
}) {
  const { address, mainnetProvider, localProvider, ethPriceDollar } =
    ethereumProps

  const { isMobile, setRoute } = nftAppProps

  const menuItemStyle = {
    float: 'left',
    width: '100%'
  }

  const menuTextStyle = {
    float: 'left',
    marginRight: 50,
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    letterSpacing: '0.1599999964237213px',
    color: '#C6C6C6'
  }

  const menuIconStyle = {
    float: 'right'
  }

  const dropdownContent = (
    <Menu>
      <Menu.Item style={{ ...menuItemStyle }}>
        <div style={{ float: 'left' }}>
          <Link
            onClick={() => {
              setRoute('/minted')
            }}
            to='/minted'
            style={{ ...menuTextStyle }}
          >
            Mint a new Talismoon
          </Link>
        </div>
        <JoinRight16 style={{ ...menuIconStyle }} />
      </Menu.Item>
      <Menu.Item style={{ ...menuItemStyle }}>
        <div style={{ float: 'left' }}>
          <Link
            onClick={() => {
              setRoute('/wallet')
            }}
            to='/wallet'
            style={{ ...menuTextStyle }}
          >
            My Talismoons
          </Link>
        </div>
        <Moon16 style={{ ...menuIconStyle }} />
      </Menu.Item>
      <Menu.Item style={{ ...menuItemStyle }}>
        <div style={{ float: 'left' }}>
          <Link
            onClick={() => {
              setRoute('/favorites')
            }}
            to='/favorites'
            style={{ ...menuTextStyle }}
          >
            My Favorite Talismoons
          </Link>
        </div>
        <FavoriteFilled16 style={{ ...menuIconStyle }} />
      </Menu.Item>
      <Menu.Item style={{ ...menuItemStyle }}>
        <div style={{ float: 'left' }}>
          <Link
            onClick={() => {
              logoutOfWeb3Modal()
            }}
            style={{ ...menuTextStyle }}
          >
            Logout
          </Link>
        </div>
        <Logout16 style={{ ...menuIconStyle }} />
      </Menu.Item>
    </Menu>
  )

  const headerHeight = MOBILE_HEADER_HEIGHT
  return (
    <>
      <div
        id='header'
        style={{
          position: 'fixed',
          top: 7,
          height: headerHeight,
          width: '100%',
          zIndex: 9000,
          pointerEvents: 'none',
          textAlign: 'center',
          fontFamily: 'IBM Plex Sans',
          fontSize: 40,
          fontWeight: 400
        }}
      >
        {/*getTitle()*/}
      </div>
      <Header
        aria-label={''}
        style={{ height: headerHeight, backgroundColor: '#000' }}
      >
        <HeaderGlobalAction
          aria-label='Navigation'
          onClick={() => setSidebarLeftOpen(!sidebarLeftOpen)}
        >
          {/* <QueryQueue12 /> */}
          <TextAlignJustify32 />
        </HeaderGlobalAction>
        <HeaderName href='#' prefix=''>
          <Link
            onClick={() => {
              setRoute('/')
            }}
            to='/'
          >
            <span
              style={{
                float: 'left',
                fontFamily: 'IBM Plex Sans',
                fontSize: 30,
                fontWeight: 400
              }}
            >
              TALISMOONS
            </span>
          </Link>
        </HeaderName>
        <HeaderNavigation aria-label='Crypto Moons'>
          <HeaderName href='#' prefix=''></HeaderName>
          {/*
            <HeaderMenu aria-label='Subm' menuLinkName='Subm'>
              <HeaderMenuItem></HeaderMenuItem>
            </HeaderMenu>
          */}
        </HeaderNavigation>

        <HeaderGlobalBar>
          <span style={{ marginRight: 25 }}>
            {!address && (
              <Account
                address={address}
                localProvider={localProvider}
                userSigner={userSigner}
                mainnetProvider={mainnetProvider}
                price={ethPriceDollar}
                web3Modal={web3Modal}
                loadWeb3Modal={loadWeb3Modal}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                blockExplorer={blockExplorer}
                isMobile={true}
              />
            )}
            {address && (
              <Dropdown overlay={dropdownContent} placement='bottomLeft'>
                <div
                  id='accountDropdown'
                  style={{
                    marginTop: 13,
                    padding: 0,
                    border: 'none'
                  }}
                >
                  <Account
                    address={address}
                    localProvider={localProvider}
                    userSigner={userSigner}
                    mainnetProvider={mainnetProvider}
                    price={ethPriceDollar}
                    web3Modal={web3Modal}
                    loadWeb3Modal={loadWeb3Modal}
                    logoutOfWeb3Modal={logoutOfWeb3Modal}
                    blockExplorer={blockExplorer}
                    isMobile={true}
                  />
                </div>
              </Dropdown>
            )}
          </span>
        </HeaderGlobalBar>
        <HeaderGlobalAction aria-label='App Switcher'>
          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
          >
            <AppSwitcher32 />
          </Link>
        </HeaderGlobalAction>
      </Header>
    </>
  )
}
