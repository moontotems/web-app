import React from 'react'
import { Row, Col } from 'antd'

export default function SlideStart({ ethereumProps, nftAppProps }) {
  return (
    <div>
      <div
        style={{
          float: 'left',
          height: '60vh',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <img
          src='home/uniqueFeatures/talismoon_chat.jpg'
          style={{ height: '100%', margin: 'auto' }}
        />
      </div>
      <div
        style={{
          padding: '5%',
          fontSize: '50px',
          fontWeight: 300,
          lineHeight: '60px'
        }}
      >
        Talismoons is a next generation NFT project that aims to expand the
        features and possibilities exclusive to holders.
      </div>
    </div>
  )
}
