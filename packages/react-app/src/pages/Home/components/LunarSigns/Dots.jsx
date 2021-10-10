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
    <div
      style={{
        position: 'absolute',
        bottom: '160px',
        right: 0,
        height: '40px',
        width: '280px'
      }}
    >
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
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(8)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(9)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(10)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(11)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(12)
        }}
      ></span>
      <span
        style={{
          ...dotStyle,
          backgroundColor: activeSlideIs(13)
        }}
      ></span>
    </div>
  )
}
