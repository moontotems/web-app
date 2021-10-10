import React from 'react'
import { Row, Col } from 'antd'

export default function Slide5({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <img
        src='home/uniqueFeatures/talismoon_license.jpg'
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
            src={'home/uniqueFeatures/icons/Icon-CreativeCommons.svg'}
            style={{
              height: '40px',
              marginBottom: '15px'
            }}
          />
          <div
            style={{ width: '100%', marginBottom: '55px', fontSize: '29px' }}
          >
            TALISMOON RIGHTS
          </div>
          <div
            style={{
              width: '100%',
              marginBottom: '25px',
              fontSize: '27px',
              fontWeight: 600
            }}
          >
            Holders hold the rights
          </div>
          <div
            style={{
              width: '100%',
              fontSize: '27px',
              fontWeight: '300',
              lineHeight: '35px'
            }}
          >
            Talismoons is Creative Commons <br />
            project. Holders are free to...
            <br />
            <br />
            Exclusive access to potential <br /> future generations, projects or{' '}
            <br />
            events.
          </div>
        </div>
      </div>
    </Row>
  )
}
