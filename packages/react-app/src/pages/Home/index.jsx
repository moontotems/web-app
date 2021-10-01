import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'

export default function Home({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps
  return (
    <>
      <Row>
        <Col xs={2} md={5} />
        <Col xs={24} md={19}>
          <img
            src='/home/TALISMOONS_GEN01_BLINKYROTATE.34.jpg'
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
              height: '180px',
              width: '400px',
              padding: '25px',
              backgroundColor: '#000'
            }}
          >
            <div style={{ fontSize: '20px' }}>Get your TALSIMOON!</div>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>
            What are Talismoons?
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Unique digital totems from the Moon <br />
            discovered on the Ethereum Blockchain. A next <br />
            generation NFT project, richer experience <br />
            more features exclusive to holders
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>
            Unique Features
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Moon Totems is a next generation NFT project <br />
            that aims to expand the features and <br />
            possibilities exclusive to holders.
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 24]}>
        <Col xs={24} md={5} />
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/edit_totem_bio_photo_1.jpeg'
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>It’s an Oracle</div>
          </Col>
          <Col xs={24}>
            <div>
              Totems can answer questions and give advice on matters large and
              small.
            </div>
          </Col>
        </Col>
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/edit_totem_bio_photo_2.jpeg'
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>Create a Story</div>
          </Col>
          <Col xs={24}>
            <div>
              Holders can write a diary or bio of their Totem. The story will be
              permanently logged on the blockchain at each transaction.
            </div>
          </Col>
        </Col>
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0003.jpeg'
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>Zoom In</div>
          </Col>
          <Col xs={24}>
            <div>Experience the full details and textures.</div>
          </Col>
        </Col>
        <Col xs={24} md={4} />
      </Row>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>
            Future Features
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Talismoons aims to continuously develop the <br />
            ecosystem and community by bringing new <br />
            features and experiences.
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 24]}>
        <Col xs={24} md={5} />
        <Col xs={24} md={5}>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>Role Play</div>
          </Col>
          <Col xs={24}>
            <div>
              Totems can answer questions and give advice on matters large and
              small.
            </div>
          </Col>
        </Col>
        <Col xs={24} md={5}>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>Breeding</div>
          </Col>
          <Col xs={24}>
            <div>
              Holders can write a diary or bio of their Totem. The story will be
              permanently logged on the blockchain at each transaction.
            </div>
          </Col>
        </Col>
        <Col xs={24} md={5}>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>World Building</div>
          </Col>
          <Col xs={24}>
            <div>Experience the full details and textures.</div>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>
            Characteristics
          </div>
        </Col>
        <Col xs={24} md={19}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Each Talismoon is a one-of-a-kind.
          </div>
          <img
            src='/home/TALISMOONS_GEN01_hd0000.jpg'
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
              height: '180px',
              width: '400px',
              padding: '25px',
              backgroundColor: '#000'
            }}
          >
            <div style={{ fontSize: '20px' }}>
              Learn more about all the traits
            </div>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>Moon Origins</div>
        </Col>
        <Col xs={24} md={19}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Talismoons come from the Moon
          </div>
          <img
            src='/home/MoonOriginsEarthToMoon.jpeg'
            style={{ float: 'right', width: '100%' }}
          />
        </Col>
      </Row>
      <Row gutter={[8, 24]} style={{ marginTop: '60px' }}>
        <Col xs={24} md={5} />
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/MOONPHASECYCLE_rgba_0043.jpeg'
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>Lunar Phases</div>
          </Col>
        </Col>
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/MOONMONTHS.gif'
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>Lunar Months</div>
          </Col>
        </Col>
        <Col xs={24} md={5}>
          <Col xs={24}>
            <img
              src='/home/MOONTURN_crop0146.jpeg'
              style={{
                width: '100%'
              }}
            />
          </Col>
          <Col xs={24}>
            <div style={{ fontSize: '25px' }}>Lunar Mares</div>
          </Col>
        </Col>
        <Col xs={24} md={4} />
      </Row>
      <Row style={{ marginTop: '80px' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>@talismoons</div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
            Catch the latest announcements and engage with the community
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '25px' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '20px', fontSize: '20px' }}>NFT Tutorial</div>
        </Col>
        <Col xs={24} md={10}>
          <div style={{ padding: '20px', fontSize: '25px', fontWeight: 300 }}>
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
              height: '180px',
              width: '400px',
              padding: '25px',
              backgroundColor: '#000'
            }}
          >
            <div style={{ fontSize: '20px' }}>Learn about how to get NFTs</div>
          </Link>
        </Col>
      </Row>
    </>
  )
}
