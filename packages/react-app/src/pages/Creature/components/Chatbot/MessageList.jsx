import React, { useEffect } from 'react'
import $ from 'jquery'
import { SpeechBubbleBot, SpeechBubbleUser } from './speechBubbles'

export default function MessageList({ messages, typing }) {
  const scrollToBottom = () => {
    let elementSelector = '#messageList'
    const { scrollHeight } = $(elementSelector)[0]
    $(elementSelector).animate({ scrollTop: scrollHeight }, 'slow')
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing])

  return (
    <div
      id='messageList'
      style={{
        float: 'left',
        width: '100%',
        height: 400,
        overflowY: 'scroll',
        textAlign: 'left'
      }}
    >
      {messages.map((message, index) => {
        const { sender, value } = message
        if (sender === 'user') {
          return <SpeechBubbleUser text={value} />
        }
        if (sender === 'bot') {
          return <SpeechBubbleBot text={value} />
        }
      })}
      <div style={{ float: 'right', width: '100%' }}>
        {typing && 'Thinking ...'}
      </div>
    </div>
  )
}
