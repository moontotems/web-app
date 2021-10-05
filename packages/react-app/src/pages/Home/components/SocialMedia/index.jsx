import React from 'react'
import { Row, Col } from 'antd'
import Columns from './Columns'

export default function SocialMediaSection({ ethereumProps, nftAppProps }) {
  return (
    <>
      <Row style={{ marginBottom: '10vh' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>@talismoons</div>
        </Col>
        <Col xs={24} md={19}>
          <div
            style={{
              padding: '20px',
              fontSize: '27px',
              fontWeight: 300,
              lineHeight: '43px'
            }}
          >
            Catch the latest announcements and engage with the community
          </div>
        </Col>
      </Row>

      <Columns ethereumProps={ethereumProps} nftAppProps={nftAppProps} />
    </>
  )
}
