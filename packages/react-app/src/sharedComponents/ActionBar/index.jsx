import React from 'react'
import FilterDropdown from '../FilterDropdown'

export default function ActionBar({ ethereumProps, nftAppProps }) {
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
        <FilterDropdown
          ethereumProps={ethereumProps}
          nftAppProps={nftAppProps}
        />
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
