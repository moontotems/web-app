import React from 'react'
import { ArrowRight32 } from '@carbon/icons-react'

export default function ExploreBox({ sliderRef }) {
  return (
    <div
      style={{
        float: 'right',
        height: '250px',
        width: '75%',
        padding: '25px',
        backgroundColor: '#171414',
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
            position: 'absolut',
            width: '100%',
            fontSize: '30px',
            lineHeight: '45px'
          }}
        >
          Explore the characteristics of the Lunar Phases
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
