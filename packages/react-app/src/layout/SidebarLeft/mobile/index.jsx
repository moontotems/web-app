import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer, List, NavBar, Icon } from 'antd-mobile'
import { MOBILE_HEADER_HEIGHT } from '../../../constants'

export default function SidebarLeftMobileView({
  ethereumProps,
  nftAppProps,
  setSidebarLeftOpen,
  open
}) {
  const { setRoute } = nftAppProps
  const menuItemStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }

  const onOpenChange = () => {
    setSidebarLeftOpen(!open)
  }

  const sidebar = (
    <List>
      <List.Item multipleLine>
        <Link
          onClick={() => {
            setRoute('/all')
            setSidebarLeftOpen(false)
          }}
          to='/all'
          style={{ ...menuItemStyle }}
        >
          All Talismoons
        </Link>
      </List.Item>
      <List.Item multipleLine>
        <Link
          onClick={() => {
            setRoute('/favorites')
            setSidebarLeftOpen(false)
          }}
          to='/favorites'
          style={{ ...menuItemStyle }}
        >
          My Favorite Talismoons
        </Link>
      </List.Item>
      <List.Item multipleLine>
        <Link
          onClick={() => {
            setRoute('/wallet')
            setSidebarLeftOpen(false)
          }}
          to='/wallet'
          style={{ ...menuItemStyle }}
        >
          My Talismoons
        </Link>
      </List.Item>
      <List.Item multipleLine>
        <Link
          onClick={() => {
            setRoute('/minted')
            setSidebarLeftOpen(false)
          }}
          to='/minted'
          style={{ ...menuItemStyle }}
        >
          Mint a new Talismoon
        </Link>
      </List.Item>
      <List.Item multipleLine>
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
      </List.Item>
      <List.Item multipleLine>
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
      </List.Item>
    </List>
  )

  return (
    <div>
      <Drawer
        className='my-drawer'
        style={{
          minHeight: '100vh',
          marginTop: MOBILE_HEADER_HEIGHT
        }}
        enableDragHandle
        contentStyle={{
          color: '#A6A6A6',
          textAlign: 'center',
          paddingTop: 42
        }}
        sidebar={sidebar}
        open={open}
        onOpenChange={onOpenChange}
      >
        {/*Click upper-left corner */}
      </Drawer>
    </div>
  )
}
