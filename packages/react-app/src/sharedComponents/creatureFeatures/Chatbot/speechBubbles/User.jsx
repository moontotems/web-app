import React from 'react'

export default function SpeechBubbleUser({ text }) {
  return (
    <div style={{ float: 'right' }}>
      <div
        style={{
          margin: '0 auto 1rem',
          marginTop: '19px',
          padding: '0.8rem',
          textAlign: 'left',
          borderRadius: '0.80rem',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '28px',
          letterSpacing: '0.16px',
          backgroundColor: '#1062FE',
          color: '#fff',
          border: '1px solid #1062FE'
        }}
      >
        {text}
      </div>
    </div>
  )
}
