import React from 'react'
import { Menu, Button, Dropdown } from 'antd'
import {
  Filter32,
  Apps32,
  CarouselHorizontal32,
  List32,
  CheckmarkOutline16,
  FavoriteFilled16,
  Locked16
} from '@carbon/icons-react'
import FILTERS from './filters'

export default function ActionBar({ ethereumProps, nftAppProps }) {
  const { setActiveFilter, activeFilter, setShowGrid } = nftAppProps

  const iconStyle = {
    margin: '0 20px',
    cursor: 'pointer'
  }
  const menuItemStyle = {
    float: 'left',
    width: '100%',
    padding: 8,
    borderLeft: '4px solid'
  }
  const menuTextStyle = {
    float: 'left',
    marginRight: 40,
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    letterSpacing: '0.1599999964237213px',
    color: '#C6C6C6'
  }
  const menuIconStyle = {
    float: 'right',
    marginRight: 50
  }

  const getMenuColorSelect = _filter => {
    let color = '#161616'
    if (_filter === activeFilter) color = '#4589FF'
    return color
  }

  const filterMenuContent = (
    <Menu>
      <Menu.Item
        style={{
          ...menuItemStyle,
          borderColor: getMenuColorSelect('')
        }}
        onClick={() => setActiveFilter('')}
      >
        <div style={{ ...menuTextStyle }}>Reset / Show All</div>
      </Menu.Item>
      <Menu.Item
        style={{
          ...menuItemStyle,
          borderColor: getMenuColorSelect('')
        }}
        onClick={() => setActiveFilter(FILTERS.shuffle)}
      >
        <div style={{ ...menuTextStyle }}>Shuffle</div>
      </Menu.Item>
      <Menu.Item
        style={{
          ...menuItemStyle,
          borderColor: getMenuColorSelect(FILTERS.available)
        }}
        onClick={() => setActiveFilter(FILTERS.available)}
      >
        <div style={{ ...menuTextStyle }}>Show Available</div>
        <CheckmarkOutline16 style={{ ...menuIconStyle, fill: '#00FF74' }} />
      </Menu.Item>
      <Menu.Item
        style={{
          ...menuItemStyle,
          borderColor: getMenuColorSelect(FILTERS.taken)
        }}
        onClick={() => setActiveFilter(FILTERS.taken)}
      >
        <div style={{ ...menuTextStyle }}>Show Taken</div>
        <Locked16 style={{ ...menuIconStyle, marginRight: 50 }} />
      </Menu.Item>
      <Menu.Item
        style={{
          ...menuItemStyle,
          borderColor: getMenuColorSelect(FILTERS.favorites)
        }}
        onClick={() => setActiveFilter(FILTERS.favorites)}
      >
        <div style={{ ...menuTextStyle }}>Show Favorites</div>
        <FavoriteFilled16 style={{ ...menuIconStyle, fill: '#DA1E28' }} />
      </Menu.Item>
      <Menu.Item
        style={{
          ...menuItemStyle,
          borderColor: getMenuColorSelect(FILTERS.myTotems)
        }}
        onClick={() => setActiveFilter(FILTERS.myTotems)}
      >
        <div style={{ ...menuTextStyle }}>Show My Totems</div>
        <CheckmarkOutline16 style={{ ...menuIconStyle, fill: '#4589FF' }} />
      </Menu.Item>
    </Menu>
  )
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 25,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div style={{ margin: '10px 0', textAlign: 'center' }}>
        <Dropdown overlay={filterMenuContent} placement='topLeft'>
          <Button style={{ background: 'none', border: 'none', padding: 0 }}>
            <Filter32
              aria-label='Filter'
              style={{ ...iconStyle, color: '#fff' }}
            />
          </Button>
        </Dropdown>
        {/*
        <Apps32
          aria-label='Switch to area view'
          style={{ ...iconStyle }}
          onClick={() => setShowGrid(true)}
        />
        <CarouselHorizontal32
          aria-label='Switch to carousel view'
          style={{ ...iconStyle }}
          onClick={() => setShowGrid(false)}
        />
        <List32 aria-label='Switch to list view' style={{ ...iconStyle }} />
        */}
      </div>
    </div>
  )
}
