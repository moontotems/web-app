import React from 'react'

export default function SlideText({ slideContents, currentSlideIndex }) {
  const { title, text } = slideContents[`${currentSlideIndex}`]
  return (
    <div
      style={{
        width: '100%',
        padding: '5%'
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{title}</div>
      <div
        style={{
          fontSize: '55px',
          fontWeight: '300',
          lineHeight: '60px'
        }}
      >
        {text}
      </div>
    </div>
  )
}
