import React from 'react'
import { Link } from 'react-router-dom'
import {
  Shuffle32,
  Apps32,
  CarouselHorizontal32,
  List32
} from '@carbon/icons-react'

import FilterDropdown from '../FilterDropdown'

export default function ActionBarBottom({ ethereumProps, nftAppProps }) {
  const { setRoute, setShowGridView, shuffleCreatureIndexList } = nftAppProps

  const iconStyle = {
    marginLeft: '15px',
    cursor: 'pointer'
  }

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
        <Shuffle32
          aria-label='Shuffle'
          style={{ ...iconStyle }}
          onClick={() => shuffleCreatureIndexList()}
        />
        <FilterDropdown
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
        <Apps32
          aria-label='Switch to area view'
          style={{ ...iconStyle }}
          onClick={() => setShowGridView(true)}
        />
        <List32
          aria-label='Switch to list view'
          style={{ ...iconStyle }}
          onClick={() => setShowGridView(false)}
        />
        <Link
          onClick={() => {
            setRoute('/')
          }}
          to={`/${0}`}
        >
          <CarouselHorizontal32
            aria-label='Switch to carousel view'
            style={{ ...iconStyle }}
          />
        </Link>
      </div>
    </div>
  )
}
