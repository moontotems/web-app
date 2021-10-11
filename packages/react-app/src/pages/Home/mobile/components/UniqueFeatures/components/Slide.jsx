import React from 'react'

export default function Slide({ image }) {
  return (
    <div style={{ width: '60vh', overflow: 'hidden' }}>
      <img src={image} style={{ float: 'left', width: '100%' }} />
    </div>
  )
}
