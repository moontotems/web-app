import React from 'react'
import { Row, Col } from 'antd'

export default function Section({ ethereumProps, nftAppProps }) {
  return (
    <>
      <div style={{ padding: '5%', paddingBottom: 0, fontSize: '35px' }}>
        @talismoons
      </div>
      <div
        style={{
          padding: '5%',
          fontSize: '50px',
          fontWeight: 300,
          lineHeight: '60px'
        }}
      >
        Catch the latest announcements and engage with the community
      </div>
      <div style={{ padding: '5%' }}>
        <img
          src='/home/icons/Logo-Instagram.svg'
          alt='Talismoons Instagram'
          style={{ width: '20%', marginRight: '5%' }}
        />
        <img
          src='/home/icons/Logo-Twitter.svg'
          alt='Talismoons Twitter'
          style={{ width: '20%', marginRight: '5%' }}
        />
        <img
          src='/home/icons/Logo-Discord.svg'
          alt='Talismoons Discord'
          style={{ width: '20%', marginRight: '5%' }}
        />
      </div>
    </>
  )
}
