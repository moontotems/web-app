import React from 'react'
import { Row, Col } from 'antd'

export default function Slide2({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <img
        src='home/uniqueFeatures/talismoon_bio.jpg'
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
            src={'home/uniqueFeatures/icons/Icon-Edit.svg'}
            style={{
              height: '40px',
              marginBottom: '15px'
            }}
          />
          <div
            style={{ width: '100%', marginBottom: '55px', fontSize: '29px' }}
          >
            TALISMOON STORIES
          </div>
          <div
            style={{
              width: '100%',
              marginBottom: '25px',
              fontSize: '27px',
              fontWeight: 600
            }}
          >
            You write the story
          </div>
          <div
            style={{
              width: '100%',
              fontSize: '27px',
              fontWeight: '300',
              lineHeight: '35px'
            }}
          >
            Holders can build and elaborate <br />
            the Talismoon narrative or <br />
            mythology.
            <br />
            <br />
            The best stories will be shared in <br />
            the community and could <br />
            perhaps increase the value of <br />
            your Talismoon.
          </div>
        </div>
      </div>
    </Row>
  )
}
