import React from 'react'

export default function SpeechBubbleUser({ text }) {
  return (
    <div style={{ float: 'right', width: '60%' }}>
      <div
        style={{
          textAlign: 'left',
          backgroundColor: '#4589FF',
          color: '#fff',
          border: '1px solid #4589FF',
          borderRadius: '0.80rem',
          margin: '0 auto 1rem',
          padding: '0.5rem 1.5rem'
        }}
      >
        {text}
      </div>
    </div>
  )
}
