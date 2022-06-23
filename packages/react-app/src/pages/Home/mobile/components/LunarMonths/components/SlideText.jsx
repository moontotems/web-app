import React from 'react'

export default function SlideText({ slideContents, currentSlideIndex }) {
  const { title, text } = slideContents[`${currentSlideIndex}`]
  return (
    <div style={{ float: 'left', width: '100%', padding: '5%' }}>
      <div
        style={{ marginBottom: '13px', fontSize: '16px', fontWeight: 'bold' }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '23px',
          fontWeight: 300,
          lineHeight: '34px'
        }}
      >
        {text}
      </div>
    </div>
  )
}
