import React from 'react'
import ReactRoundedImage from 'react-rounded-image'
import { SpeechBubbleBot } from './speechBubbles'

export default function BotMessageContainer({ image, text, isMobile }) {
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
          minHeight: 100,
          width: 'calc(100% - 120px)'
        }}
      >
        <SpeechBubbleBot text={text} isMobile={isMobile} />
      </div>
    </div>
  )
}
