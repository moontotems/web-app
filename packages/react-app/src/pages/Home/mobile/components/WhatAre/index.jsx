import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'

export default function Section({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <>
      <div style={{ height: '60vh', overflow: 'hidden' }}>
        <div style={{ float: 'right', width: '100%' }}>
          <img
            src='/home/TALISMOONS_GEN01_BLINKYROTATE.jpg'
            style={{ float: 'left', height: '60vh' }}
          />

          <Link
            onClick={() => {
              setRoute('/all')
            }}
            to='/all'
            style={{
              position: 'absolute',
              top: 'calc(80vh - 216px)',
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
      </div>
      <div style={{ height: '40vh', marginTop: '2%', overflow: 'hidden' }}>
        <div style={{ padding: '5%', paddingBottom: 0, fontSize: '35px' }}>
          What are Talismoons?
        </div>
        <div
          style={{
            padding: '5%',
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
