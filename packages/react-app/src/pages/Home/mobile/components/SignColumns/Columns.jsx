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

export default function Columns({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <>
      <div gutter={[8, 24]} style={{ marginBottom: '250px' }}>
        <Col xs={24} md={7} />
        <Col xs={24} md={5}>
          <div>
            <Col xs={24}>
              <img
                src='/home/MOONPHASE.gif'
                style={{
                  width: '100%'
                }}
              />
            </Col>
          </div>
          <div>
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
          </div>
        </Col>
        <Col xs={24} md={5}>
          <div>
            <Col xs={24}>
              <img
                src='/home/MOONMONTHS.gif'
                style={{
                  width: '100%'
                }}
              />
            </Col>
          </div>
          <div>
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
          </div>
        </Col>

        <Col xs={24} md={5}>
          <div>
            <Col xs={24}>
              <img
                src='/home/MOONTURN_crop0146.jpeg'
                style={{
                  width: '100%'
                }}
              />
            </Col>
          </div>
          <div>
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
          </div>
        </Col>

        <Col xs={24} md={2} />
      </div>
    </>
  )
}
