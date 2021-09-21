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
        paddingTop: 50,
        paddingBottom: 50
      }}
    >
      <Col xs={12} lg={8}>
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
      </Col>
      <Col xs={12} lg={8}>
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
      </Col>
    </Row>
  )
}
