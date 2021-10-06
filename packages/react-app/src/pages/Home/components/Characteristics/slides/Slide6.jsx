import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight32 } from '@carbon/icons-react'

export default function Slide6({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps

  return (
    <div>
      <img
        src='/home/TALISMOONS_GEN01_ZOOMSYMBOLS0001.jpeg'
        style={{ position: 'absolute', top: 0, left: 0, height: '80vh' }}
      />

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
        Every Talismoon has a symbol indicating its Lunar Origin along with its
        initials.
      </div>
    </div>
  )
}
