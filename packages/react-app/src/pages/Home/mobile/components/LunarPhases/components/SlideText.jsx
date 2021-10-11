import React from 'react'

export default function SlideText({ slideContents, currentSlideIndex }) {
  const { title, text } = slideContents[`${currentSlideIndex}`]
  return (
    <div style={{ float: 'left', width: '100%', padding: '5%' }}>
      <div
        style={{ paddingBottom: '5%', fontSize: '35px', fontWeight: 'bold' }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: '30px',
          fontWeight: 300,
          lineHeight: '45px'
        }}
      >
        {text}
      </div>
    </div>
  )
}
