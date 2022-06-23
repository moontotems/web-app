import React from 'react'
import { ArrowRight32 } from '@carbon/icons-react'

export default function ExploreBox({ sliderRef }) {
  return (
    <div
      className='explore-box'
      onClick={() => sliderRef.slickNext()}
      style={{
        float: 'right',
        minHeight: '100px',
        width: '70%',
        padding: '15px'
      }}
    >
      <div
        style={{
          position: 'relative',
          minHeight: '100px',
          width: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            fontSize: '18px',
            lineHeight: '30px'
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
