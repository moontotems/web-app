import React from 'react'

export default function Dots({ slideContents, activeDotNumber }) {
  const numberOfSlides = slideContents.length

  const activeSlideIs = sildeNum => {
    if (activeDotNumber === sildeNum) {
      return '#4589FF'
    } else {
      return '#8F8B8B'
    }
  }

  return (
    <div style={{ float: 'left', width: '100%', textAlign: 'center' }}>
      {[...Array(numberOfSlides).keys()].map(sildeNumber => (
        <span
          key={`dot-number-${sildeNumber}`}
          style={{
            ...style,
            backgroundColor: activeSlideIs(sildeNumber)
          }}
        />
      ))}
    </div>
  )
}
