import React from 'react'

export default function Dots({ activeDotNumber }) {
  const dotStyle = {
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '10px'
  }

  const activeSlideIs = no => {
    if (activeDotNumber === no) {
      return '#4589FF'
    }
    return '#8F8B8B'
  }

  return (
    <>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(1)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(2)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(3)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(4)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(5)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(6)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(7)
        }}
      ></span>
    </>
  )
}
