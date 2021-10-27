import React from 'react'

export default function Slide({ image }) {
  return (
    <div style={{ width: '100%' }}>
      <img
        src={image}
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%'
        }}
      />
    </div>
  )
}
