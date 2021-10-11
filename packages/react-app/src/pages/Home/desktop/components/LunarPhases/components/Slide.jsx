import React from 'react'

export default function Slide({ image }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={image}
        style={{ float: 'left', height: 'calc(100vh - 47px)' }}
      />
    </div>
  )
}
