import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'
import Dots from './Dots'

export default function Slide1({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <>
      {/*
      <img
        src='/home/TALISMOON_CARD_SQUARE_03963.jpg'
        style={{ float: 'left', height: '80vh' }}
      />
      */}
      <div
        style={{
          position: 'absolute',
          top: '10vh',
          right: '5%',
          height: '150px',
          width: '350px',
          padding: '15px',
          fontSize: '25px',
          fontWeight: '300',
          lineHeight: '35px'
        }}
      >
        Each Talismoon has defining charcteristics.
        <br />
        <br />
        Look a little closer and you may find them.
      </div>

      <div
        style={{
          position: 'absolute',
          top: 'calc(30vh + 150px)',
          right: '10%',
          height: '150px',
          width: '180px',
          padding: '15px'
        }}
      >
        <Dots activeDotNumber={1} />
      </div>

      <Link
        onClick={() => {
          setRoute('/attributes')
        }}
        to='/attributes'
        style={{
          position: 'absolute',
          top: 'calc(100vh - 300px)',
          right: 0,
          height: '150px',
          width: '350px',
          padding: '15px',
          backgroundColor: '#171414'
        }}
      >
        <div style={{ fontSize: '17px' }}>Explore all the various traits</div>
        <ArrowRight32
          style={{
            position: 'absolute',
            bottom: 15,
            right: 15,
            color: '#00FF74'
          }}
        />
      </Link>
    </>
  )
}
