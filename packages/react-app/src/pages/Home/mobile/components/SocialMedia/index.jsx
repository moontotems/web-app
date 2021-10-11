import React from 'react'

export default function Section({ ethereumProps, nftAppProps }) {
  return (
    <div style={{ padding: '5%', fontSize: '35px' }}>
      <div style={{ paddingBottom: '5%', fontSize: '35px' }}>@talismoons</div>
      <div
        style={{
          fontSize: '50px',
          fontWeight: 300,
          lineHeight: '60px',
          marginBottom: '10%'
        }}
      >
        Catch the latest announcements and engage with the community
      </div>
      <div>
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
    </div>
  )
}
