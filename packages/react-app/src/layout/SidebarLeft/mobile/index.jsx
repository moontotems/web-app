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
  FacePendingFilled32,
  AsleepFilled32,
  ChartMultitype32,
  HelpFilled32,
  LogoInstagram32,
  LogoTwitter32,
  LogoDiscord32,
  Launch32,
  FavoriteFilled32
} from '@carbon/icons-react'
import $ from 'jquery'
import { Icons } from '../../../sharedComponents'
const { OwnedByUserIcon32x32, NotMintedIcon32x32 } = Icons

export default function SidebarLeftMobileView({
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
            What are Talismoons?{' '}
            <FacePendingFilled32 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Key Stats <ChartMultitype32 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            FAQ <HelpFilled32 style={{ ...iconStyle }} />
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavMenu title='Lates News'>
          <SideNavMenuItem href='javascript:void(0)'>
            Instagram <LogoInstagram32 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Twitter <LogoTwitter32 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Discord <LogoDiscord32 style={{ ...iconStyle }} />
          </SideNavMenuItem>
        </SideNavMenu>
        <SideNavLink href='javascript:void(0)'>
          <Link>Explore on OpenSea</Link>
          <Launch32 style={{ ...iconStyle }} />
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
