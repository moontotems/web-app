import React from 'react'
import { Link } from 'react-router-dom'

import { ArrowRight32 } from '@carbon/icons-react'

export default function ExploreBox({ nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <Link
      className='explore-box'
      onClick={() => {
        setRoute('/all')
      }}
      to='/all'
      style={{
        float: 'right',
        minHeight: '100px',
        //width: '70%',
        padding: '15px',
        marginTop: '60px'
      }}
    >
      <div
        style={{
          position: 'relative',
          minHeight: '100px',
          width: '100%'
        }}
      >
        <div
          style={{
            width: '100%',
            fontSize: '18px',
            lineHeight: '30px'
          }}
        >
          Get your Moon Totem
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0
          }}
        >
          <ArrowRight32 style={{ color: '#00FF74' }} />
        </div>
      </div>
    </Link>
  )
}
