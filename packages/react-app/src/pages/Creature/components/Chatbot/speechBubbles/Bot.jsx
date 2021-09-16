import React from 'react'

export default function SpeechBubbleBot({ text }) {
  return (
    <div style={{ float: 'left' }}>
      <div
        style={{
          textAlign: 'left',
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid #fff',
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
