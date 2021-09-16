import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button, Dropdown } from 'antd'
//import Search20 from '@carbon/icons-react/lib/search/20'
//import Notification20 from '@carbon/icons-react/lib/notification/20'
//import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20'
import {
  CheckmarkOutline16,
  Search20,
  Notification20,
  AppSwitcher20,
  TextAlignJustify32,
  QueryQueue32
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
    console.log(window.location.pathname)
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

  console.log({ getTitle: getTitle() })

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
      <Menu.Item>
        <Link
          onClick={() => {
            setRoute('/minted')
          }}
          to='/minted'
        >
          Mint a new Totem
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          onClick={() => {
            setRoute('/wallet')
          }}
          to='/wallet'
        >
          My Totems
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          onClick={() => {
            setRoute('/favorites')
          }}
          to='/favorites'
        >
          My Favorite Totems
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header aria-label='Moon Totems'>
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
          MOON TOTEMS
        </Link>
      </HeaderName>
      <HeaderNavigation aria-label='Crypto Moons'>
        <HeaderName href='#' prefix='' style={{ textAlign: 'center' }}>
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
        <span style={{ marginTop: 13 }}>
          <div style={{ marginRight: 15 }}>{networkDisplay}</div>
        </span>

        <span style={{ marginTop: 6 }}>
          <Dropdown overlay={dropdownContent} placement='bottomCenter'>
            <Button id='accountDropdown' style={{ padding: 0, border: 'none' }}>
              <Address
                size='medium'
                address={address}
                ensProvider={mainnetProvider}
                blockExplorer={blockExplorer}
              />
              {/*<Account
                address={address}
                localProvider={localProvider}
                userSigner={userSigner}
                mainnetProvider={mainnetProvider}
                price={ethPriceDollar}
                web3Modal={web3Modal}
                loadWeb3Modal={loadWeb3Modal}
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                blockExplorer={blockExplorer}
              />*/}
            </Button>
          </Dropdown>
        </span>
        <HeaderGlobalAction aria-label='Search' onClick={() => {}}>
          <Search20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label='Notifications' onClick={() => {}}>
          <Notification20 />
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label='App Switcher' onClick={() => {}}>
          <AppSwitcher20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  )
}
