import React, { useEffect } from 'react'
import $ from 'jquery'
import { SpeechBubbleUser } from './speechBubbles'
import BotMessageContainer from './BotMessageContainer'

export default function MessageList({ messages, typing, image }) {
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
        maxHeight: 400,
        overflowY: 'scroll',
        textAlign: 'left'
      }}
    >
      {messages.map(message => {
        const { sender, value } = message
        if (sender === 'user') {
          return (
            <div style={{ float: 'right', width: 'calc(100% - 120px)' }}>
              <SpeechBubbleUser text={value} />
            </div>
          )
        }
        if (sender === 'bot') {
          return <BotMessageContainer image={image} text={value} />
        }
      })}
      {typing && <BotMessageContainer image={image} text={'Thinking ...'} />}
    </div>
  )
}
