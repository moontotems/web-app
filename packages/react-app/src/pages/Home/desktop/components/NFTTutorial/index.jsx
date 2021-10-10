import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { ArrowRight32 } from '@carbon/icons-react'

export default function Section({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '23px' }}>NFT Tutorial</div>
        </Col>
        <Col xs={24} md={10}>
          <div
            style={{
              padding: '20px',
              fontSize: '25px',
              fontWeight: 300,
              lineHeight: '33px'
            }}
          >
            A quick and easy demo of how you can get started with NFTs
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={2} md={5} />
        <Col xs={24} md={19}>
          <img
            src='/home/buy_nft_tutorial.png'
            style={{ float: 'right', width: '100%' }}
          />
          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: '150px',
              width: '350px',
              padding: '15px',
              backgroundColor: '#171414'
            }}
          >
            <div style={{ fontSize: '17px' }}>Learn about how to get NFTs</div>
            <ArrowRight32
              style={{
                position: 'absolute',
                bottom: 15,
                right: 15,
                color: '#00FF74'
              }}
            />
          </Link>
        </Col>
      </Row>
    </>
  )
}
