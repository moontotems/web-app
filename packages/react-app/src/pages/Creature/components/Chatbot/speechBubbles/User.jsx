import React from 'react'

export default function SpeechBubbleUser({ text }) {
  return (
    <div style={{ float: 'right' }}>
      <div
        style={{
          //minHeight: 100,
          margin: '0 auto 1rem',
          padding: '0.8rem 0.8rem',
          textAlign: 'left',
          backgroundColor: '#4589FF',
          color: '#fff',
          border: '1px solid #4589FF',
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
