import React from 'react'
import { Row, Col } from 'antd'

export default function Slide4({ ethereumProps, nftAppProps }) {
  return (
    <Row>
      <img
        src='home/uniqueFeatures/talismoon_community.jpg'
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
            src={'home/uniqueFeatures/icons/Icon-Community.svg'}
            style={{
              height: '40px',
              marginBottom: '15px'
            }}
          />
          <div
            style={{ width: '100%', marginBottom: '55px', fontSize: '29px' }}
          >
            TALISMOON COMMUNITY
          </div>
          <div
            style={{
              width: '100%',
              marginBottom: '25px',
              fontSize: '27px',
              fontWeight: 600
            }}
          >
            Connect
          </div>
          <div
            style={{
              width: '100%',
              fontSize: '27px',
              fontWeight: '300',
              lineHeight: '35px'
            }}
          >
            DAO? A forum for ideas, <br />
            proposals and decision on the <br />
            future direction of the project
          </div>
        </div>
      </div>
    </Row>
  )
}
