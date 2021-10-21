import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'

export default function MyFooter({ ethereumProps, nftAppProps }) {
  const { isMobile, setRoute } = nftAppProps

  let headerStyle = {}
  if (isMobile) {
    headerStyle = {
      fontWeight: 'bold',
      fontSize: 25,
      marginTop: 40,
      marginBottom: 15
    }
  } else {
    headerStyle = {
      fontWeight: 'bold',
      marginBottom: 10
    }
  }

  let contentStyle = {}
  if (isMobile) {
    contentStyle = {
      fontSize: 25,
      marginTop: 15
    }
  } else {
    contentStyle = {
      marginTop: 15
    }
  }

  return (
    <Row
      style={{
        textAlign: 'center',
        minHeight: 200,
        paddingTop: '20vh',
        paddingBottom: 50
      }}
    >
      <Col xs={24} lg={8}>
        <div style={{ ...headerStyle }}>The Project</div>
        <div style={{ ...contentStyle }}>
          <Link
            onClick={() => {
              setRoute('/press')
            }}
            to='/press'
          >
            Press
          </Link>
        </div>
        <div style={{ ...contentStyle }}>
          <Link
            onClick={() => {
              setRoute('/contact')
            }}
            to='/contact'
          >
            Contact
          </Link>
        </div>
        <div style={{ ...contentStyle }}>
          <a
            href='https://instagram.com/moontotems'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/Logo-Instagram.svg'
              alt='Moon Totems Instagram'
              width='35'
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
              width='35'
            />
          </a>
          <a
            href='https://discord.gg/73vMqt7k7H'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/Logo-Discord.svg'
              alt='Moon Totems Discord'
              width='35'
            />
          </a>
          <a
            href='https://github.com/moontotems'
            target='_blank'
            rel='noreferrer'
          >
            <img
              src='/icons/Logo-Github.svg'
              alt='Moon Totems Github'
              width='35'
              style={{ marginLeft: '5px', color: 'white' }}
            />
          </a>
        </div>
      </Col>
      <Col xs={24} lg={8}>
        <div style={{ ...headerStyle }}>Resources</div>
      </Col>
      <Col xs={24} lg={8}>
        <div style={{ ...headerStyle }}>Legal</div>
        <div style={{ ...contentStyle }}>
          <Link
            onClick={() => {
              setRoute('/terms-and-conditions')
            }}
            to='/terms-and-conditions'
          >
            Terms & Conditions
          </Link>
        </div>
        <div style={{ ...contentStyle }}>
          <Link
            onClick={() => {
              setRoute('/legal-notice')
            }}
            to='/legal-notice'
          >
            Legal Notice
          </Link>
        </div>
        <div style={{ ...contentStyle }}>
          <Link
            onClick={() => {
              setRoute('/imprint-privacy-policy')
            }}
            to='/imprint-privacy-policy'
          >
            Imprint/Privacy Policy
          </Link>
        </div>
        <div style={{ ...contentStyle }}>© 2021 Moon Totems LLC</div>
      </Col>
    </Row>
  )
}
