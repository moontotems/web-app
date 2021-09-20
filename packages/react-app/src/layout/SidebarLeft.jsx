import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink
} from 'carbon-components-react'

export default function SidebarLeft({
  ethereumProps,
  nftAppProps,
  setSidebarLeftOpen,
  open
}) {
  const { isMobile, setRoute } = nftAppProps

  let menuItemStyle = {}
  if (isMobile) {
    menuItemStyle = {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 20
    }
  } else {
    menuItemStyle = {
      fontSize: 14
    }
  }
  return (
    <SideNav
      isFixedNav
      expanded={open}
      isChildOfHeader={false}
      aria-label='Side navigation'
      style={{
        borderRight: '1px solid #393939',
        backgroundColor: '#161616'
      }}
    >
      <SideNavItems>
        <SideNavLink href='javascript:void(0)'></SideNavLink>
        <SideNavLink href='javascript:void(0)'>
          <Link
            onClick={() => {
              setRoute('/all')
              setSidebarLeftOpen(false)
            }}
            to='/all'
            style={{ ...menuItemStyle }}
          >
            All Moon Totems
          </Link>
        </SideNavLink>
        <SideNavLink href='javascript:void(0)'>
          <Link
            onClick={() => {
              setRoute('/favorites')
              setSidebarLeftOpen(false)
            }}
            to='/favorites'
            style={{ ...menuItemStyle }}
          >
            My Favorite Totems
          </Link>
        </SideNavLink>
        <SideNavLink href='javascript:void(0)'>
          <Link
            onClick={() => {
              setRoute('/wallet')
              setSidebarLeftOpen(false)
            }}
            to='/wallet'
            style={{ ...menuItemStyle }}
          >
            My Totems
          </Link>
        </SideNavLink>
        <SideNavLink href='javascript:void(0)'>
          <Link
            onClick={() => {
              setRoute('/minted')
              setSidebarLeftOpen(false)
            }}
            to='/minted'
            style={{ ...menuItemStyle }}
          >
            Mint a new Totem
          </Link>
        </SideNavLink>
        <SideNavLink href='javascript:void(0)'>
          <Link
            onClick={() => {
              setRoute('/contract-events')
              setSidebarLeftOpen(false)
            }}
            to='/contract-events'
            style={{ ...menuItemStyle }}
          >
            Contract Events
          </Link>
        </SideNavLink>
        <SideNavLink href='javascript:void(0)'>
          <Link
            onClick={() => {
              setRoute('/contract-interface')
              setSidebarLeftOpen(false)
            }}
            to='/contract-interface'
            style={{ ...menuItemStyle }}
          >
            Contract Interface
          </Link>
        </SideNavLink>

        {/*<SideNavMenu title='L0 menu'>
          <SideNavMenuItem href='javascript:void(0)'>
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title='L0 menu'>
          <SideNavMenuItem href='javascript:void(0)'>
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            L0 menu item
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            L0 menu item
          </SideNavMenuItem>
        </SideNavMenu>*/}
      </SideNavItems>
    </SideNav>
  )
}
