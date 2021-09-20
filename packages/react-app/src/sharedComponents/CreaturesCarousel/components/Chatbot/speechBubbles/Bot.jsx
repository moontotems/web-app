import React from 'react'

export default function SpeechBubbleBot({ text }) {
  return (
    <div style={{ float: 'left' }}>
      <div
        style={{
          //minHeight: 100,
          margin: '0 auto 1rem',
          marginTop: 19,
          padding: '0.8rem 0.8rem',
          textAlign: 'left',
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid #fff',
          borderRadius: '0.80rem',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: '28px',
          letterSpacing: '0.1599999964237213px'
        }}
      >
        {text}
      </div>
    </div>
  )
}
