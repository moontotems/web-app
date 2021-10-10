import React from 'react'
import { Row, Col } from 'antd'

export default function Slide3({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <img
        src='home/uniqueFeatures/talismoon_zoom_and_pan.jpg'
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
            src={'home/uniqueFeatures/icons/Icon-Zoom.svg'}
            style={{
              height: '40px',
              marginBottom: '15px'
            }}
          />
          <div
            style={{ width: '100%', marginBottom: '55px', fontSize: '29px' }}
          >
            TALISMOON ZOOM
          </div>
          <div
            style={{
              width: '100%',
              marginBottom: '25px',
              fontSize: '27px',
              fontWeight: 600
            }}
          >
            See all the details
          </div>
          <div
            style={{
              width: '100%',
              fontSize: '27px',
              fontWeight: '300',
              lineHeight: '35px'
            }}
          >
            Holders can experience their
            <br /> Talismoon in close proximity and <br />
            see details invisible from public <br />
            view.
            <br />
            <br />A kind of tactile intimacy exclusive <br />
            to holders of Talismoons.
          </div>
        </div>
      </div>
    </Row>
  )
}
