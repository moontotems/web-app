import React from 'react'

export default function SlideText({ slideContents, currentSlideIndex }) {
  const { icon, title, subtitle, text } = slideContents[`${currentSlideIndex}`]
  return (
    <div
      style={{
        float: 'left',
        width: '100%',
        textAlign: 'center',
        padding: '5%'
      }}
    >
      <div style={{ marginBottom: 0, fontSize: '25px', fontWeight: 'bold' }}>
        {title}
      </div>
      <div style={{ marginBottom: '2%', fontSize: '25px' }}>{subtitle}</div>
      <div
        style={{
          fontSize: '30px',
          fontWeight: 300,
          lineHeight: '34px'
        }}
      >
        {text}
      </div>
      {/*<img src={icon} style={{ width: '25%', marginTop: '60px' }} />*/}
    </div>
  )
}
