import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import {
  CheckmarkOutline16,
  Search20,
  AppSwitcher20,
  TextAlignJustify20,
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

import { DESKTOP_HEADER_HEIGHT } from '../../../constants'
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

  const accountDropdownContent = (
    <Menu>
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

  return (
    <>
      <div
        id='headerTitle'
        style={{
          position: 'fixed',
          top: 9,
          height: DESKTOP_HEADER_HEIGHT,
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

      <Header
        aria-label={'Moon Totems'}
        style={{ height: DESKTOP_HEADER_HEIGHT }}
      >
        {/*
        <Dropdown overlay={infoDropdownContent} placement='bottomRight'>
          <div
            id='infoDropdown'
            style={{
              marginTop: '7px',
              padding: 0,
              border: 'none'
            }}
          >
            <TextAlignJustify32 />
          </div>
        </Dropdown>
        */}
        <Link
          onClick={() => {
            setRoute('/all')
          }}
          to='/all'
        >
          <div
            aria-label='Show all Totems'
            style={{
              height: '40px',
              width: '50px',
              //backgroundColor: '#262626',
              textAlign: 'center'
            }}
            onClick={() => setSidebarLeftOpen(!sidebarLeftOpen)}
          >
            <TextAlignJustify20 style={{ marginTop: '10px' }} />
          </div>
        </Link>

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
        <HeaderNavigation aria-label='Moon Totems'>
          <HeaderName href='#' prefix=''></HeaderName>
          {/*
            <HeaderMenu aria-label='Subm' menuLinkName='Subm'>
              <HeaderMenuItem></HeaderMenuItem>
            </HeaderMenu>
          */}
        </HeaderNavigation>
        <HeaderGlobalBar>
          <span style={{ marginTop: '9px' }}>
            <div style={{ marginRight: '15px' }}>{networkDisplay}</div>
          </span>

          <span>
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
              <Dropdown overlay={accountDropdownContent} placement='bottomLeft'>
                <div
                  id='accountDropdown'
                  style={{
                    marginTop: '7px',
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
          {/*
          <HeaderGlobalAction aria-label='Search' onClick={() => {}}>
            <Search20 />
          </HeaderGlobalAction>
          */}
          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
          >
            <div
              aria-label='Show all Totems'
              style={{
                height: '40px',
                width: '50px',
                backgroundColor: '#262626',
                borderBottom: '1px solid #6F6F6F',
                textAlign: 'center'
              }}
            >
              <AppSwitcher20 style={{ marginTop: '10px' }} />
            </div>
          </Link>
        </HeaderGlobalBar>
      </Header>
    </>
  )
}
