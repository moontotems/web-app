import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Search20 from '@carbon/icons-react/lib/search/20'
import Notification20 from '@carbon/icons-react/lib/notification/20'
import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20'
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

export default function MyHeader({
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

  return (
    <Header aria-label='Talismoons'>
      <HeaderName href='#' prefix=''>
        <Link
          onClick={() => {
            setRoute('/')
          }}
          to='/'
        >
          Talismoons
        </Link>
      </HeaderName>
      <HeaderNavigation aria-label='Crypto Moons'>
        <HeaderMenuItem>
          <Link
            onClick={() => {
              setRoute('/')
            }}
            to='/'
          >
            Home
          </Link>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
          >
            All Talismoons
          </Link>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <Link
            onClick={() => {
              setRoute('/minted')
            }}
            to='/minted'
          >
            Minted Talismoons
          </Link>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <Link
            onClick={() => {
              setRoute('/wallet')
            }}
            to='/wallet'
          >
            Your Talismoons
          </Link>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <Link
            onClick={() => {
              setRoute('/contract-events')
            }}
            to='/contract-events'
          >
            Contract Events
          </Link>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <Link
            onClick={() => {
              setRoute('/contract-interface')
            }}
            to='/contract-interface'
          >
            C Interface
          </Link>
        </HeaderMenuItem>
        <HeaderMenu aria-label='Subm' menuLinkName='Subm'>
          <HeaderMenuItem href='#'>Sub-link 1</HeaderMenuItem>
          <HeaderMenuItem href='#'>Sub-link 2</HeaderMenuItem>
          <HeaderMenuItem href='#'>Sub-link 3</HeaderMenuItem>
        </HeaderMenu>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <div style={{ marginRight: 15 }}>{networkDisplay}</div>
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
