import React from 'react'
import { Menu, Button, Dropdown } from 'antd'
import { Filter32, FavoriteFilled16, Locked16 } from '@carbon/icons-react'
import FILTERS from './filters'
import Icons from '../icons'
const { MintedIcon16x16, NotMintedIcon16x16 } = Icons

export default function FilterDropdown({ ethereumProps, nftAppProps }) {
  const { setActiveFilter, activeFilter } = nftAppProps

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
    if (_filter === activeFilter) color = '#1062FE'
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
          borderColor: getMenuColorSelect(FILTERS.shuffle)
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
        <img
          src={NotMintedIcon16x16}
          style={{ ...menuIconStyle }}
          alt='Not Minted'
        />
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
        <img src={MintedIcon16x16} style={{ ...menuIconStyle }} alt='Minted' />
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={filterMenuContent} placement='topLeft'>
      <Button style={{ background: 'none', border: 'none', padding: 0 }}>
        <Filter32 aria-label='Filter' style={{ ...iconStyle, color: '#fff' }} />
      </Button>
    </Dropdown>
  )
}
