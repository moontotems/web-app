import React from 'react'

export default function Section({ ethereumProps, nftAppProps }) {
  return (
    <div
      style={{
        height: 'auto',
        marginTop: '60px',
        padding: '5%',
        fontSize: '25px'
      }}
    >
      <div style={{ paddingBottom: '5%', fontSize: '25px' }}>
        @moontotemsnft
      </div>
      <div
        style={{
          fontSize: '23px',
          fontWeight: 300,
          lineHeight: '34px',
          marginBottom: '10%'
        }}
      >
        Catch the latest announcements and engage with the community
      </div>
      <div>
        <a
          href='https://instagram.com/moontotems'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/home/icons/Logo-Instagram.svg'
            alt='Moon Totems Instagram'
            style={{ width: '28.33%', marginRight: '5%' }}
          />
        </a>
        <a
          href='https://twitter.com/moontotemsnft'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/home/icons/Logo-Twitter.svg'
            alt='Moon Totems Twitter'
            style={{ width: '28.33%', marginRight: '5%' }}
          />
        </a>
        <a
          href='https://discord.gg/73vMqt7k7H'
          target='_blank'
          rel='noreferrer'
        >
          <img
            src='/home/icons/Logo-Discord.svg'
            alt='Moon Totems Discord'
            style={{ width: '28.33%', marginRight: '5%' }}
          />
        </a>
      </div>
    </div>
  )
}
