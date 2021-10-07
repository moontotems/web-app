import React from 'react'

export default function PageIndicator({ activePageNumber }) {
  return (
    <span style={{ fontWeight: 600, fontSize: 18 }}>
      {activePageNumber} / 18
    </span>
  )
}
