import React from 'react'

export default function SpeechBubbleBot({ text, isMobile }) {
  return (
    <div style={{ float: 'left' }}>
      <div
        style={{
          margin: '0 auto 1rem',
          marginTop: '19px',
          padding: isMobile ? '1.8rem' : '0.8rem',
          textAlign: 'left',
          borderRadius: '0.80rem',
          fontSize: isMobile ? '26px' : '16px',
          fontWeight: 400,
          lineHeight: '28px',
          letterSpacing: '0.1599999964237213px',
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid #fff'
        }}
      >
        {text}
      </div>
    </div>
  )
}
