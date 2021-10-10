import React from 'react'
import { Row, Col } from 'antd'

export default function Slide1({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <img
        src='home/uniqueFeatures/talismoon_chat.jpg'
        style={{ float: 'left', height: 'calc(100vh - 47px)' }}
      />
      <div style={{ float: 'left', width: '2%' }} />
      <div style={{ float: 'left', marginTop: '15px' }}>
        <div
          style={{
            position: 'absolute',
            fontWeight: '300',
            lineHeight: '35px'
          }}
        >
          <img
            src={'home/uniqueFeatures/icons/Icon-Chat.svg'}
            style={{
              height: '70px',
              marginBottom: '15px'
            }}
          />
          <div
            style={{ width: '100%', marginBottom: '55px', fontSize: '29px' }}
          >
            TALISMOON CHAT
          </div>
          <div
            style={{
              width: '100%',
              marginBottom: '25px',
              fontSize: '27px',
              fontWeight: 600
            }}
          >
            It’s an Oracle
          </div>
          <div
            style={{
              width: '100%',
              fontSize: '27px',
              fontWeight: '300',
              lineHeight: '35px'
            }}
          >
            Holders can consult their
            <br /> Talismoons on matters large and
            <br /> small.
          </div>
        </div>
      </div>
    </Row>
  )
}
