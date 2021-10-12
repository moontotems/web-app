import React from 'react'

export default function Dots({ slideContents, activeDotNumber }) {
  const numberOfSlides = slideContents.length

  return (
    <div
      style={{
        float: 'left',
        width: '100%',
        textAlign: 'center',
        fontSize: '30px',
        fontWeight: 'bold'
      }}
    >
      {activeDotNumber}/{numberOfSlides - 1}
    </div>
  )
}
