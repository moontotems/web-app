import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'
import { RandomCreaturesCarousel } from '../../../../../sharedComponents'

export default function Section({ ethereumProps, nftAppProps }) {
  const { setRoute } = nftAppProps

  return (
    <div
      style={{
        float: 'left',
        width: '100%',
        marginTop: '70px',
        paddingBottom: '40px'
      }}
    >
      <div
        style={{
          float: 'left',
          width: '100%'
        }}
      >
        <div
          style={{
            padding: '25px',
            fontSize: '20px'
          }}
        >
          Let your Totem find you
        </div>
        <div
          style={{
            float: 'left',
            width: '100%'
          }}
        >
          <RandomCreaturesCarousel
            ethereumProps={ethereumProps}
            nftAppProps={nftAppProps}
            slideDirectionLeft={true}
          />
        </div>
      </div>
      <div
        style={{
          float: 'right',
          width: '100%'
        }}
      >
        <Link
          className='explore-box'
          onClick={() => {
            setRoute('/all')
          }}
          to='/all'
          style={{
            float: 'right',
            position: 'relative',
            height: '150px',
            width: '300px',
            padding: '15px',
            marginTop: '40px'
          }}
        >
          <div style={{ fontSize: '17px' }}>Explore Totems</div>
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
  )
}
