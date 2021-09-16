import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink
} from 'carbon-components-react'

export default function SidebarLeft({ open }) {
  const [route, setRoute] = useState()
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute])

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
        <SideNavLink href='javascript:void(0)'></SideNavLink>
        <SideNavLink href='javascript:void(0)'>
          <Link
            onClick={() => {
              setRoute('/minted')
            }}
            to='/minted'
          >
            Mint a new Moon
          </Link>
        </SideNavLink>

        <SideNavLink href='javascript:void(0)'>
          {' '}
          <Link
            onClick={() => {
              setRoute('/wallet')
            }}
            to='/wallet'
          >
            My Totems
          </Link>
        </SideNavLink>
        <SideNavLink href='javascript:void(0)'>
          <Link
            onClick={() => {
              setRoute('/favorites')
            }}
            to='/favorites'
          >
            My Favorite Moons
          </Link>
        </SideNavLink>
      </SideNavItems>
    </SideNav>
  )
}
