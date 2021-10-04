import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import {
  ArrowRight32,
  ChatBot32,
  Edit32,
  ZoomIn32,
  LogoInstagram32,
  LogoTwitter32,
  LogoDiscord32
} from '@carbon/icons-react'

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
              height: '150px',
              width: '350px',
              padding: '15px',
              backgroundColor: '#000'
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
        </Col>
      </Row>
      <Row style={{ marginTop: '50px' }}>
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
            Unique digital totems from the Moon <br />
            discovered on the Ethereum Blockchain. A next <br />
            generation NFT project, richer experience <br />
            more features exclusive to holders
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '20px', marginBottom: '80px' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>
            Unique Features
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
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>
                Its an Oracle
              </div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Totems can answer questions and give advice on matters large and
                small.
              </div>
            </Col>
            <Col xs={24}>
              <ChatBot32 />
            </Col>
          </div>
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
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>
                Create a Story
              </div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Holders can write a diary or bio of their Totem. The story will
                be permanently logged on the blockchain at each transaction.
              </div>
            </Col>
            <Col xs={24}>
              <Edit32 />
            </Col>
          </div>
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
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Zoom In</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Experience the full details and textures.
              </div>
            </Col>
            <Col xs={24}>
              <ZoomIn32 />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={4} />
      </Row>

      <Row>
        <Col xs={24} md={5}>
          <div
            style={{
              marginTop: '40px',
              marginBottom: '40px',
              padding: '24px',
              fontSize: '20px'
            }}
          >
            Characteristics
          </div>
        </Col>
        <Col xs={24} md={16}>
          <div
            style={{
              fontSize: '27px',
              fontWeight: 300,
              lineHeight: '43px',
              marginTop: '50px',
              marginBottom: '50px',
              padding: '20px'
            }}
          >
            Each Talismoon is a one-of-a-kind.
          </div>
          <img
            src='/home/TALISMOONS_GEN01_hd0000.jpg'
            style={{ float: 'right', width: '100%' }}
          />
          <Link
            onClick={() => {
              setRoute('/attributes')
            }}
            to='/attributes'
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              height: '150px',
              width: '350px',
              padding: '15px',
              backgroundColor: '#000'
            }}
          >
            <div style={{ fontSize: '17px' }}>
              Learn more about all the traits
            </div>
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
        <Col xs={24} md={3} />
      </Row>

      <Row style={{ marginTop: '40px', marginBottom: '100px' }}>
        <Col xs={24} md={5}>
          <div
            style={{
              padding: '24px',
              fontSize: '20px'
            }}
          >
            Future Features
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
            Talismoons aims to continuously develop the <br />
            ecosystem and community by bringing new <br />
            features and experiences.
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 24]}>
        <Col xs={24} md={5} />
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Role Play</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Totems can answer questions and give advice on matters large and
                small.
              </div>
            </Col>
            <Col xs={24}>
              <Edit32 />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Breeding</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Holders can write a diary or bio of their Totem. The story will
                be permanently logged on the blockchain at each transaction.
              </div>
            </Col>
            <Col xs={24}>
              <Edit32 />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>
                World Building
              </div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                Experience the full details and textures.
              </div>
            </Col>
            <Col xs={24}>
              <Edit32 />
            </Col>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Col xs={24} md={5}>
          <div
            style={{
              padding: '24px',
              fontSize: '20px'
            }}
          >
            Moon Origins
          </div>
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
            Talismoons come from the Moon
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={5} />
        <Col xs={24} md={16}>
          <img
            src='/home/MoonOriginsEarthToMoon.jpeg'
            style={{ float: 'right', width: '100%' }}
          />
        </Col>
        <Col xs={24} md={3} />
      </Row>
      <Row gutter={[8, 24]} style={{ marginBottom: '250px' }}>
        <Col xs={24} md={5} />
        <Col xs={24} md={5}>
          <Row>
            <Col xs={24}>
              <img
                src='/home/MOONPHASE.gif'
                style={{
                  width: '100%'
                }}
              />
            </Col>
          </Row>
          <Row>
            <Link
              onClick={() => {
                setRoute('/lunar-calendar')
              }}
              to='/lunar-calendar'
              style={{
                bottom: 0,
                right: 0,
                height: '150px',
                width: '350px',
                backgroundColor: '#000'
              }}
            >
              <Col xs={24}>
                <div
                  style={{
                    fontSize: '20px',
                    padding: '25px',
                    paddingBottom: '140px',
                    backgroundColor: '#171414'
                  }}
                >
                  Lunar Phases
                </div>
                <ArrowRight32
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 15,
                    color: '#00FF74'
                  }}
                />
              </Col>
            </Link>
          </Row>
        </Col>
        <Col xs={24} md={5}>
          <Row>
            <Col xs={24}>
              <img
                src='/home/MOONMONTHS.gif'
                style={{
                  width: '100%'
                }}
              />
            </Col>
          </Row>
          <Row>
            <Link
              onClick={() => {
                setRoute('/lunar-calendar')
              }}
              to='/lunar-calendar'
              style={{
                bottom: 0,
                right: 0,
                height: '150px',
                width: '350px',
                backgroundColor: '#000'
              }}
            >
              <Col xs={24}>
                <div
                  style={{
                    fontSize: '20px',
                    padding: '25px',
                    paddingBottom: '140px',
                    backgroundColor: '#171414'
                  }}
                >
                  Lunar Months
                </div>
                <ArrowRight32
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 15,
                    color: '#00FF74'
                  }}
                />
              </Col>
            </Link>
          </Row>
        </Col>

        <Col xs={24} md={5}>
          <Row>
            <Col xs={24}>
              <img
                src='/home/MOONTURN_crop0146.jpeg'
                style={{
                  width: '100%'
                }}
              />
            </Col>
          </Row>
          <Row>
            <Link
              onClick={() => {
                setRoute('/lunar-map')
              }}
              to='/lunar-map'
              style={{
                bottom: 0,
                right: 0,
                height: '150px',
                width: '350px',
                backgroundColor: '#000'
              }}
            >
              <Col xs={24}>
                <div
                  style={{
                    fontSize: '20px',
                    padding: '25px',
                    paddingBottom: '140px',
                    backgroundColor: '#171414'
                  }}
                >
                  Lunar Mares
                </div>
                <ArrowRight32
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 15,
                    color: '#00FF74'
                  }}
                />
              </Col>
            </Link>
          </Row>
        </Col>

        <Col xs={24} md={4} />
      </Row>
      <Row style={{ marginTop: '200px', marginBottom: '80px' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '20px' }}>@talismoons</div>
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
            Catch the latest announcements and engage with the community
          </div>
        </Col>
      </Row>
      <Row gutter={[8, 24]}>
        <Col xs={24} md={5} />
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Instagram</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For visual stories and explorations into the art.
              </div>
            </Col>
            <Col xs={24}>
              <LogoInstagram32 />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Twitter</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For the latest announcements and updates.
              </div>
            </Col>
            <Col xs={24}>
              <LogoTwitter32 />
            </Col>
          </div>
        </Col>
        <Col xs={24} md={5}>
          <div
            style={{
              borderLeft: '1px solid #888',
              marginTop: '20px',
              paddingLeft: '15px'
            }}
          >
            <Col xs={24}>
              <div style={{ fontSize: '22px', fontWeight: 400 }}>Discord</div>
            </Col>
            <Col xs={24}>
              <div
                style={{
                  marginTop: '40px',
                  marginBottom: '40px',
                  fontSize: '16px'
                }}
              >
                For connecting with the Totem Community.
              </div>
            </Col>
            <Col xs={24}>
              <LogoDiscord32 />
            </Col>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: '80px', marginBottom: '80px' }}>
        <Col xs={24} md={5}>
          <div style={{ padding: '24px', fontSize: '23px' }}>NFT Tutorial</div>
        </Col>
        <Col xs={24} md={10}>
          <div
            style={{
              padding: '20px',
              fontSize: '30px',
              fontWeight: 300,
              lineHeight: '43px'
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
              backgroundColor: '#000'
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
