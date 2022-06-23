import React from 'react'
import { ArrowRight32 } from '@carbon/icons-react'

export default function ExploreBox({ sliderRef }) {
  return (
    <div
      className='explore-box'
      style={{
        float: 'right',
        minHeight: '150px',
        width: '400px',
        padding: '25px',
        cursor: 'pointer'
      }}
      onClick={() => sliderRef.slickNext()}
    >
      <div
        style={{
          position: 'relative',
          minHeight: '150px',
          width: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            fontSize: '23px',
            lineHeight: '34px'
          }}
        >
          Explore all the various traits
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0
          }}
        >
          <ArrowRight32 style={{ color: '#00FF74' }} />
        </div>
      </div>
    </div>
  )
}
