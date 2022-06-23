import React from 'react'

export default function SpeechBubbleBot({ text }) {
  return (
    <div style={{ float: 'left' }}>
      <div
        className='chat-speech-bubble'
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
