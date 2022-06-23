import React, { useEffect } from 'react'
import $ from 'jquery'
import BotMessageContainer from './BotMessageContainer'
import UserMessageContainer from './UserMessageContainer'

export default function MessageList({
  ethereumProps,
  nftAppProps,
  messages,
  typing,
  image
}) {
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
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        margin: '10px',
        // for firefox
        minHeight: 0
      }}
    >
      {messages.map(message => {
        const { sender, value } = message
        if (sender === 'user') {
          return <UserMessageContainer text={value} />
        }
        if (sender === 'bot') {
          return <BotMessageContainer image={image} text={value} />
        }
      })}
      {typing && <BotMessageContainer image={image} text={'Thinking ...'} />}
    </div>
  )
}
