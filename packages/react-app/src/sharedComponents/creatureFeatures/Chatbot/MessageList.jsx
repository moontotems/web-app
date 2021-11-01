import React, { useEffect } from 'react'
import $ from 'jquery'
import { SpeechBubbleUser } from './speechBubbles'
import BotMessageContainer from './BotMessageContainer'

export default function MessageList({
  ethereumProps,
  nftAppProps,
  messages,
  typing,
  image
}) {
  const { isMobile } = nftAppProps
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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        height: '500px',
        alignItems: 'flex-end',
        placeContent: 'flex-end',
        overflowY: 'auto',
        paddingBottom: isMobile ? '100px' : '0px'
      }}
    >
      {messages.map(message => {
        const { sender, value } = message
        if (sender === 'user') {
          return (
            <div
              style={{
                width: 'calc(100% - 120px)'
                //flex: '1 1 0%',
                //display: 'flex',
                //flexWrap: 'wrap',
                //placeContent: 'flex-end'
              }}
            >
              <SpeechBubbleUser text={value} isMobile={isMobile} />
            </div>
          )
        }
        if (sender === 'bot') {
          return (
            <BotMessageContainer
              image={image}
              text={value}
              isMobile={isMobile}
            />
          )
        }
      })}
      {typing && (
        <BotMessageContainer
          image={image}
          text={'Thinking ...'}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}
