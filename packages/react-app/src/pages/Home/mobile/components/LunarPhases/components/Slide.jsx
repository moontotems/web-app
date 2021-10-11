import React from 'react'

export default function Slide({ image, title, text }) {
  return (
    <>
      <div style={{ height: 'auto', overflow: 'hidden' }}>
        <img src={image} style={{ float: 'left', width: '100%' }} />
      </div>
    </>
  )
}
