import React from 'react'
import { SpeechBubbleUser } from './speechBubbles'

export default function UserMessageContainer({ text, isMobile }) {
  return (
    <div
      className='userMessageContainer'
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        width: '100%'
      }}
    >
      <div style={{ display: 'flex' }}>
        <SpeechBubbleUser text={text} isMobile={isMobile} />
      </div>
    </div>
  )
}
