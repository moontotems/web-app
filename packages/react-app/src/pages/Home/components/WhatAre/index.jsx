import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { ArrowRight32 } from '@carbon/icons-react'

export default function WhatAreSection({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <>
      <Row>
        <Col xs={2} md={5} />
        <Col xs={24} md={19}>
          <div
            style={{
              float: 'right',
              height: '80vh',
              width: '100%'
              //overflow: 'hidden'
              /*
              background:
                'url(./home/TALISMOONS_GEN01_BLINKYROTATE.png) no-repeat center center fixed',
              backgroundSize: 'cover'
              */
            }}
          >
            <iframe
              src='https://player.vimeo.com/video/620510465?h=8893bbc9b4&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
              frameBorder='0'
              allow='autoplay;'
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%'
              }}
              title='TALISMOONS_GEN01_BLINKYROTATE.COMP[0000-0832].mp4'
            />
            {/*
            <img
              src='/home/TALISMOONS_GEN01_BLINKYROTATE.jpg'
              style={{ float: 'left', height: '80vh' }}
            />
            */}

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
              <div style={{ fontSize: '17px' }}>Get your TALISMOON!</div>
              <ArrowRight32
                style={{
                  position: 'absolute',
                  bottom: 15,
                  right: 15,
                  color: '#00FF74'
                }}
              />
            </Link>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '5vh' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>
            What are Talismoons?
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div
            style={{
              padding: '20px',
              fontSize: '27px',
              fontWeight: 300,
              lineHeight: '43px'
            }}
          >
            Unique digital totems from the Moon discovered on the Ethereum
            Blockchain. <br /> A next generation NFT project, richer experience
            more features exclusive to holders
          </div>
        </Col>
      </Row>
    </>
  )
}
