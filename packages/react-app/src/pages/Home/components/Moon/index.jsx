import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { ArrowRight32 } from '@carbon/icons-react'

export default function MoonSection({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <>
      <Row>
        <Col xs={2} md={1} />
        <Col xs={24} md={23}>
          <div
            style={{
              float: 'right',
              height: 'calc(100vh - 60px)',
              width: '100%'
              //overflow: 'hidden'
              /*
              background:
                'url(./home/TALISMOONS_GEN01_BLINKYROTATE.png) no-repeat center center fixed',
              backgroundSize: 'cover'
              */
            }}
          >
            <img
              src='/home/talismoon_origin_map_full.jpg'
              style={{ float: 'left', height: '80vh', maxWidth: '100%' }}
            />

            <div
              style={{
                position: 'absolute',
                top: 0,
                right: '10%',
                width: '400px',
                padding: '15px',
                fontSize: '27px',
                fontWeight: 300,
                lineHeight: '37px'
              }}
            >
              Unique digital totems from the Moon discovered on the Ethereum
              Blockchain. A next generation NFT project, richer experience more
              features exclusive to holders
            </div>
            <Link
              onClick={() => {
                setRoute('/lunar-map')
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
              <div style={{ fontSize: '17px' }}>Explore the Lunar Origins</div>
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
    </>
  )
}
