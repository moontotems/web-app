import React, { useEffect } from 'react'
import $ from 'jquery'
import ReactRoundedImage from 'react-rounded-image'
import { SpeechBubbleBot, SpeechBubbleUser } from './speechBubbles'

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
        height: 400,
        overflowY: 'scroll',
        textAlign: 'left'
      }}
    >
      {messages.map((message, index) => {
        const { sender, value } = message
        if (sender === 'user') {
          return (
            <div style={{ float: 'right', width: '100%' }}>
              <SpeechBubbleUser text={value} />
            </div>
          )
        }
        if (sender === 'bot') {
          return (
            <div style={{ float: 'left', width: '100%' }}>
              <div style={{ float: 'left', width: 100 }}>
                <ReactRoundedImage
                  image={image}
                  imageWidth='100'
                  imageHeight='100'
                  roundedColor='#000'
                  style={{ border: '1px solid #fff' }}
                />
              </div>
              <div
                style={{
                  float: 'left',
                  width: 'calc(100% - 100px)',
                  minHeight: 100
                }}
              >
                <SpeechBubbleBot text={value} />
              </div>
            </div>
          )
        }
      })}
      {typing && (
        <div>
          <div style={{ float: 'left', width: 100 }}>
            <ReactRoundedImage
              image={image}
              imageWidth='100'
              imageHeight='100'
              roundedColor='#000'
              style={{ border: '1px solid #fff' }}
            />
          </div>
          <div style={{ float: 'left', width: 'calc(100% - 100px)' }}>
            <SpeechBubbleBot text={'Thinking ...'} />
          </div>
        </div>
      )}
    </div>
  )
}
