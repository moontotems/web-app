import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer({ ethereumProps, nftAppProps }) {
  const { isMobile, setRoute } = nftAppProps

  const contentStyle = {
    fontSize: isMobile ? '20px' : '11px'
  }

  const socialMediaIcons = (
    <div>
      <a
        href='https://instagram.com/moontotems'
        target='_blank'
        rel='noreferrer'
      >
        <img
          src='/icons/Logo-Instagram.svg'
          alt='Moon Totems Instagram'
          width='10'
        />
      </a>
      <a
        href='https://twitter.com/moontotemsnft'
        target='_blank'
        rel='noreferrer'
      >
        <img
          src='/icons/Logo-Twitter.svg'
          alt='Moon Totems Twitter'
          width='10'
        />
      </a>
      <a href='https://discord.gg/73vMqt7k7H' target='_blank' rel='noreferrer'>
        <img
          src='/icons/Logo-Discord.svg'
          alt='Moon Totems Discord'
          width='10'
        />
      </a>
      <a href='https://github.com/moontotems' target='_blank' rel='noreferrer'>
        <img
          src='/icons/Logo-Github.svg'
          alt='Moon Totems Github'
          width='10'
          style={{ marginLeft: '2px', color: 'white' }}
        />
      </a>
    </div>
  )

  return (
    <div
      id='footer'
      style={{
        float: 'left',
        height: isMobile ? '50px' : '40px',
        width: '100%',
        padding: '15px',
        paddingRight: '65px',
        backgroundColor: '#000',
        borderTop: '1px solid #393939',
        zIndex: 1000
      }}
    >
      <div style={{ float: 'left', ...contentStyle }}>
        <div>
          <div style={{ float: 'right', marginLeft: '15px' }}>
            {!isMobile && socialMediaIcons}
          </div>
          <Link
            onClick={() => {
              setRoute('/terms-and-conditions')
            }}
            to='/terms-and-conditions'
          >
            Terms & Conditions
          </Link>
          <Link
            onClick={() => {
              setRoute('/contact')
            }}
            to='/contact'
            style={{ marginLeft: '15px' }}
          >
            Contact
          </Link>
        </div>
      </div>

      <div style={{ float: 'right', ...contentStyle }}>
        <div
          style={{ float: 'right', textAlign: 'center', marginLeft: '15px' }}
        >
          <img
            src='/moon_totem_logo_512.png'
            width='20px'
            alt='Logo Copyright'
          />
        </div>
        <div style={{ float: 'right' }}>© 2021 Moon Totems LLC</div>
      </div>
    </div>
  )
}
