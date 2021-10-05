import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { ArrowRight32 } from '@carbon/icons-react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import './styles.css'

export default function MySlider({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  return (
    <>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        //ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition='all .5'
        transitionDuration={500}
        containerClass='carousel-container'
        removeArrowOnDeviceType={['tablet', 'mobile']}
        //deviceType={this.props.deviceType}
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-40-px'
      >
        <div>
          <img
            src='/home/TALISMOONS_GEN01_hd0000.jpg'
            style={{ float: 'left', height: '80vh' }}
          />

          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '150px',
              width: '350px',
              padding: '15px',
              backgroundColor: '#171414'
            }}
          >
            <div style={{ fontSize: '17px' }}>
              Unique digital totems from the Moon discovered on the Ethereum
              Blockchain. A next generation NFT project, richer experience more
              features exclusive to holders
            </div>
          </Link>
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
        <div>
          <img
            src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0000.jpeg'
            style={{ float: 'left', height: '80vh' }}
          />

          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '150px',
              width: '350px',
              padding: '15px',
              backgroundColor: '#171414'
            }}
          >
            <div style={{ fontSize: '17px' }}>
              Unique digital totems from the Moon discovered on the Ethereum
              Blockchain. A next generation NFT project, richer experience more
              features exclusive to holders
            </div>
          </Link>
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
        <div>
          <img
            src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0001.jpeg'
            style={{ float: 'left', height: '80vh' }}
          />

          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '150px',
              width: '350px',
              padding: '15px',
              backgroundColor: '#171414'
            }}
          >
            <div style={{ fontSize: '17px' }}>
              Unique digital totems from the Moon discovered on the Ethereum
              Blockchain. A next generation NFT project, richer experience more
              features exclusive to holders
            </div>
          </Link>
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
        <div>
          <img
            src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0002.jpeg'
            style={{ float: 'left', height: '80vh' }}
          />

          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '150px',
              width: '350px',
              padding: '15px',
              backgroundColor: '#171414'
            }}
          >
            <div style={{ fontSize: '17px' }}>
              Unique digital totems from the Moon discovered on the Ethereum
              Blockchain. A next generation NFT project, richer experience more
              features exclusive to holders
            </div>
          </Link>
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
        <div>
          <img
            src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0003.jpeg'
            style={{ float: 'left', height: '80vh' }}
          />

          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '150px',
              width: '350px',
              padding: '15px',
              backgroundColor: '#171414'
            }}
          >
            <div style={{ fontSize: '17px' }}>
              Unique digital totems from the Moon discovered on the Ethereum
              Blockchain. A next generation NFT project, richer experience more
              features exclusive to holders
            </div>
          </Link>
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
      </Carousel>
    </>
  )
}
