import React from 'react'
import { Link } from 'react-router-dom'
import { Discription } from './components'

export default function Home({ ethereumProps, nftAppProps }) {
  const { route, setRoute } = nftAppProps
  return (
    <div style={{ backgroundColor: '#000', textAlign: 'center' }}>
      <h1>Moon Totems</h1>

      <Link
        onClick={() => {
          setRoute('/all')
        }}
        to='/all'
      >
        <img
          src='https://talismoonstest.blob.core.windows.net/finalrenders/TALISMOONS_GEN01_2k00000.png'
          height='400px'
        />
      </Link>

      <Discription />
    </div>
  )
}
