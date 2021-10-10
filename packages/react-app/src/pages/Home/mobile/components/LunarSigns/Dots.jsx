import React from 'react'

export default function Dots({ activeDotNumber }) {
  const dotStyle = {
    height: '15px',
    width: '15px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '13px'
  }

  const activeSlideIs = no => {
    if (activeDotNumber === no) {
      return '#4589FF'
    }
    return '#8F8B8B'
  }

  return (
    <div style={{ float: 'left', width: '100%' }}>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(1)
        }}
      />
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(2)
        }}
      />
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(3)
        }}
      />
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(4)
        }}
      />
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(5)
        }}
      />
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(6)
        }}
      />
    </div>
  )
}
