import React from 'react'

export default function SlideText({ slideContents, currentSlideIndex }) {
  const { icon, title, text } = slideContents[`${currentSlideIndex}`]
  return (
    <div
      style={{
        width: '100%',
        padding: '5%'
      }}
    >
      <div
        style={{
          float: 'left',
          height: '100%',
          width: '70px',
          margin: '15px'
        }}
      >
        <img
          src={icon}
          style={{
            height: '70px',
            marginBottom: '15px'
          }}
        />
      </div>
      <div
        style={{
          float: 'left',
          height: '100%',
          width: 'calc(100% - 135px)',
          margin: '15px'
        }}
      >
        <div
          style={{
            fontSize: '35px',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: '100%',
            fontSize: '27px',
            fontWeight: 300,
            lineHeight: '35px'
          }}
        >
          {text}
        </div>
      </div>
    </div>
  )
}
