import React, { useEffect, useState } from 'react'
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

import Account from './Account'
import Address from './HeaderAddress'

export default function MyHeader({
  setSidebarLeftOpen,
  sidebarLeftOpen,
  address,
  userSigner,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  ethPriceDollar,
  gasPrice,
  tx,
  writeContracts,
  readContracts,
  blockExplorer,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  networkDisplay
}) {
  const [route, setRoute] = useState()
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute])

  const getTitle = () => {
    if (window.location.pathname === '/') {
      return ''
    }
    if (window.location.pathname === '/minted') {
      return 'Minted'
    }
    if (window.location.pathname === '/wallet') {
      return 'My Totems'
    }
    if (window.location.pathname === '/favorites') {
      return 'Favorite Totems'
    }
    if (window.location.pathname === '/favorites') {
      return 'Favorite Totems'
    }
  }

  const dropdownContent = (
    <Menu>
      <Menu.Item>
        <Address
          size='medium'
          address={address}
          ensProvider={mainnetProvider}
          blockExplorer={blockExplorer}
        />
      </Menu.Item>
      <Menu.Item style={{ float: 'left', width: '100%' }}>
        <div style={{ float: 'left' }}>
          <Link
            onClick={() => {
              setRoute('/minted')
            }}
            to='/minted'
          >
            Mint a new Totem
          </Link>
        </div>
        <JoinRight16 style={{ float: 'right' }} />
      </Menu.Item>
      <Menu.Item style={{ float: 'left', width: '100%' }}>
        <div style={{ float: 'left' }}>
          <Link
            onClick={() => {
              setRoute('/wallet')
            }}
            to='/wallet'
          >
            My Totems
          </Link>
        </div>
        <Moon16 style={{ float: 'right' }} />
      </Menu.Item>
      <Menu.Item style={{ float: 'left', width: '100%' }}>
        <div style={{ float: 'left' }}>
          <Link
            onClick={() => {
              setRoute('/favorites')
            }}
            to='/favorites'
          >
            My Favorite Totems
          </Link>
        </div>
        <FavoriteFilled16 style={{ float: 'right' }} />
      </Menu.Item>
      <Menu.Item style={{ float: 'left', width: '100%' }}>
        <div style={{ float: 'left' }}>
          <Link
            onClick={() => {
              console.log('logout')
            }}
          >
            Logout
          </Link>
        </div>
        <Logout16 style={{ float: 'right' }} />
      </Menu.Item>
    </Menu>
  )

  return (
    <Header aria-label='Moon Totems' style={{ height: 48 }}>
      <HeaderGlobalAction
        aria-label='Navigation'
        onClick={() => setSidebarLeftOpen(!sidebarLeftOpen)}
      >
        {/*<QueryQueue32 />*/}
        <TextAlignJustify32 />
      </HeaderGlobalAction>
      <HeaderName href='#' prefix=''>
        <Link
          onClick={() => {
            setRoute('/')
          }}
          to='/'
        >
          <span style={{ fontWeight: 400 }}>MOON TOTEMS</span>
        </Link>
      </HeaderName>
      <HeaderNavigation aria-label='Crypto Moons'>
        <HeaderName
          href='#'
          prefix=''
          style={{
            fontFamily: 'IBM Plex Sans',
            fontSize: 20,
            fontWeight: 400
          }}
        >
          {getTitle()}
        </HeaderName>
        <HeaderMenuItem></HeaderMenuItem>
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
            <Dropdown overlay={dropdownContent} placement='bottomCenter'>
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
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  )
}
