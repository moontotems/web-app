import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink
} from 'carbon-components-react'
import {
  FacePendingFilled16,
  AsleepFilled16,
  ChartMultitype16,
  HelpFilled16,
  LogoInstagram16,
  LogoTwitter16,
  LogoDiscord16,
  Launch16,
  FavoriteFilled16
} from '@carbon/icons-react'
import $ from 'jquery'
import { Icons } from '../../../sharedComponents'
const { MintedIcon16x16, NotMintedIcon16x16 } = Icons

export default function SidebarLeftDesktopView({
  ethereumProps,
  nftAppProps,
  setSidebarLeftOpen,
  open
}) {
  const { setRoute } = nftAppProps
  // TODO: set aria-current='page'
  /*
    <SideNavMenuItem aria-current='page' href='javascript:void(0)'>
      Twitter
    </SideNavMenuItem>
  */

  useEffect(() => {
    // open all submenus
    $('.bx--side-nav__submenu').attr('aria-expanded', 'true')
  }, [])

  const menuItemStyle = {
    fontSize: 14
  }

  const iconStyle = {
    float: 'right'
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
        <SideNavMenu title='About'>
          <SideNavMenuItem href='javascript:void(0)'>
            What are Moon Totems?{' '}
            <FacePendingFilled16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Key Stats <ChartMultitype16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            FAQ <HelpFilled16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title='Lates News'>
          <SideNavMenuItem href='javascript:void(0)'>
            Instagram <LogoInstagram16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Twitter <LogoTwitter16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Discord <LogoDiscord16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title='Explore Moon Totems'>
          <SideNavMenuItem href='javascript:void(0)'>
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
            <AsleepFilled16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Available Moon Totems{' '}
            <img
              src={NotMintedIcon16x16}
              alt='Minted'
              style={{ ...iconStyle }}
            />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            <Link
              onClick={() => {
                setRoute('/favorites')
                setSidebarLeftOpen(false)
              }}
              to='/favorites'
              style={{ ...menuItemStyle }}
            >
              Favorite Moon Totems
            </Link>
            <FavoriteFilled16 style={{ ...iconStyle, color: 'red' }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            <Link
              onClick={() => {
                setRoute('/wallet')
                setSidebarLeftOpen(false)
              }}
              to='/wallet'
              style={{ ...menuItemStyle }}
            >
              {' '}
              My Moon Totems
            </Link>
            <img src={MintedIcon16x16} alt='Minted' style={{ ...iconStyle }} />
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink href='javascript:void(0)'>
          <Link>Explore on OpenSea</Link>
          <Launch16 style={{ ...iconStyle }} />
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
      </SideNavItems>
    </SideNav>
  )
}
