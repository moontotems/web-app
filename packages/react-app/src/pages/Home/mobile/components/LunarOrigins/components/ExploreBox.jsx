import React from 'react'
import { ArrowRight32 } from '@carbon/icons-react'

export default function ExploreBox({ sliderRef }) {
  return (
    <div
      className='explore-box'
      style={{
        float: 'right',
        minHeight: '200px',
        width: '400px',
        padding: '25px',
        cursor: 'pointer'
      }}
      onClick={() => sliderRef.slickNext()}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            minHeight: '200px',
            fontSize: '30px',
            lineHeight: '45px'
          }}
        >
          Explore the Lunar Origins
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
