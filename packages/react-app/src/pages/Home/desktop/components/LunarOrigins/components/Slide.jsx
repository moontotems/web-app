import React from 'react'

export default function Slide({ image }) {
  return (
    <div style={{ width: '100%' }}>
      <img
        src={image}
        //style={{ float: 'left', height: 'calc(100vh - 47px)' }}
        style={{ float: 'left', height: 'auto', width: '100%' }}
      />
    </div>
  )
}
