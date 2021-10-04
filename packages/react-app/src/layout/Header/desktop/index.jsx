import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import {
  CheckmarkOutline16,
  Search20,
  AppSwitcher20,
  TextAlignJustify32,
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

export default function HeaderDesktop({
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

  const { setRoute } = nftAppProps

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

  const headerHeight = 48
  return (
    <>
      <div
        id='headerTitle'
        style={{
          position: 'fixed',
          top: 9,
          height: headerHeight,
          width: '100%',
          zIndex: 9000,
          pointerEvents: 'none',
          textAlign: 'center',
          fontFamily: 'IBM Plex Sans',
          fontSize: 20,
          fontWeight: 400
        }}
      >
        {headerTitle}
      </div>
      <Header aria-label={'Talismoons'} style={{ height: headerHeight }}>
        <HeaderGlobalAction
          aria-label='Navigation'
          onClick={() => setSidebarLeftOpen(!sidebarLeftOpen)}
        >
          {/* <QueryQueue32 /> */}
          <TextAlignJustify32 />
        </HeaderGlobalAction>
        <HeaderName href='#' prefix=''>
          <Link
            onClick={() => {
              setRoute('/')
            }}
            to='/'
          >
            <span style={{ fontWeight: 400 }}>TALISMOONS</span>
          </Link>
        </HeaderName>
        <HeaderNavigation aria-label='Talismoons'>
          <HeaderName href='#' prefix=''></HeaderName>
          {/*
            <HeaderMenu aria-label='Subm' menuLinkName='Subm'>
              <HeaderMenuItem></HeaderMenuItem>
            </HeaderMenu>
          */}
        </HeaderNavigation>
        <HeaderGlobalBar>
          <span style={{ marginTop: 14 }}>
            <div style={{ marginRight: 15 }}>{networkDisplay}</div>
          </span>

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
                  />
                </div>
              </Dropdown>
            )}
          </span>
          <HeaderGlobalAction aria-label='Search' onClick={() => {}}>
            <Search20 />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label='App Switcher' onClick={() => {}}>
            <Link
              onClick={() => {
                setRoute('/all')
              }}
              to='/all'
            >
              <AppSwitcher20 />
            </Link>
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    </>
  )
}
