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
  UserProfile16,
  Idea16,
  LocationPersonFilled16,
  LogoInstagram16,
  LogoTwitter16,
  LogoDiscord16,
  Launch16,
  Policy16,
  TaskView16
} from '@carbon/icons-react'
import $ from 'jquery'
import { DESKTOP_HEADER_HEIGHT } from '../../../constants'
import { Icons } from '../../../sharedComponents'
const { OwnedByUserIcon16x16, NotMintedIcon16x16 } = Icons

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
        backgroundColor: '#161616',
        marginTop: DESKTOP_HEADER_HEIGHT
      }}
    >
      <SideNavItems>
        <SideNavMenu title='About'>
          <SideNavMenuItem href='javascript:void(0)'>
            What are Talismoons?
            <FacePendingFilled16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Unique Characters <UserProfile16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Exclusive Features <Idea16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Lunar Origins <LocationPersonFilled16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Lunar Months <ChartMultitype16 style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            Lunar Phases <AsleepFilled16 style={{ ...iconStyle }} />
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

        <SideNavMenu title='NFT Tracking'>
          <SideNavMenuItem href='javascript:void(0)'>
            <Link>Explore on OpenSea</Link>
            <img src='/icons/Logo-OpenSea.svg' style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavMenuItem href='javascript:void(0)'>
            <Link>Explore on Etherscan</Link>
            <img src='/icons/Logo-Etherscan.svg' style={{ ...iconStyle }} />
          </SideNavMenuItem>
          <SideNavLink href='javascript:void(0)'>
            <Link
              onClick={() => {
                setRoute('/contract-events')
                setSidebarLeftOpen(false)
              }}
              to='/contract-events'
            >
              Contract Events
            </Link>
            <TaskView16 style={{ ...iconStyle }} />
          </SideNavLink>
          <SideNavLink href='javascript:void(0)'>
            <Link
              onClick={() => {
                setRoute('/contract-interface')
                setSidebarLeftOpen(false)
              }}
              to='/contract-interface'
            >
              Contract Interface
            </Link>
            <Policy16 style={{ ...iconStyle }} />
          </SideNavLink>
        </SideNavMenu>
      </SideNavItems>
    </SideNav>
  )
}
