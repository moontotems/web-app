import React from 'react'
import ReactRoundedImage from 'react-rounded-image'
import { SpeechBubbleBot } from './speechBubbles'

export default function BotMessageContainer({ image, text }) {
  return (
    <div
      className='botMessageContainer'
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        width: '100%'
      }}
    >
      <div style={{ display: 'flex', width: '100px' }}>
        <ReactRoundedImage
          image={image}
          imageWidth='100'
          imageHeight='100'
          roundedColor='#000'
          style={{ border: '1px solid #fff' }}
        />
      </div>
      <div style={{ display: 'flex', width: 'calc(100% - 100px)' }}>
        <SpeechBubbleBot text={text} />
      </div>
    </div>
  )
}
