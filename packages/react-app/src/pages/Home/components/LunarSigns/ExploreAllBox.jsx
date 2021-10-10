import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'

export default function ExploreAllBox({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <Link
      onClick={() => {
        setRoute('/lunar-phases')
      }}
      to='/attributes'
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
      <div style={{ fontSize: '17px' }}>
        Explore the characteristics of the Lunar Months
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
  )
}
