import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'

export default function Section({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <>
      <div style={{ height: '60vh', overflow: 'hidden' }}>
        <div style={{ float: 'right', width: '100%' }}>
          <div style={{ float: 'left', height: '60vh' }}>
            <img src='/home/TALISMOONS_GEN01_BLINKYROTATE.jpg' />
          </div>

          <Link
            className='explore-box'
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              top: 'calc(60vh - 120px)',
              right: 0,
              height: '200px',
              width: '400px',
              padding: '15px'
            }}
          >
            <div style={{ fontSize: '30px' }}>Get your TALISMOON</div>
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
      </div>
      <div
        style={{
          height: '40vh',
          marginTop: '2%',
          padding: '5%',
          overflow: 'hidden'
        }}
      >
        <div style={{ paddingBottom: '5%', fontSize: '35px' }}>
          What are Talismoons?
        </div>
        <div
          style={{
            fontSize: '50px',
            fontWeight: 300,
            lineHeight: '60px'
          }}
        >
          Talismoons are digital talismans from the moon and discovered on the
          Ethereum blockchain.
        </div>
      </div>
    </>
  )
}
