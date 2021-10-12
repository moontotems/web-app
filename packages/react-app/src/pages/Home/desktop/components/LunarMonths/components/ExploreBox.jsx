import React from 'react'
import { ArrowRight32 } from '@carbon/icons-react'

export default function ExploreBox({ sliderRef }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 150,
        right: 0,
        height: '150px',
        width: '350px',
        marginTop: '20%',
        padding: '15px',
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
            fontSize: '17px',
            lineHeight: '28px'
          }}
        >
          Explore the attributes and traits that makes every Talismoon unique
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
