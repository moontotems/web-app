import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'

export default function MyFooter() {
  const [route, setRoute] = useState()
  useEffect(() => {
    setRoute(window.location.pathname)
  }, [setRoute])

  return (
    <Row
      style={{
        textAlign: 'center',
        minHeight: 200,
        paddingTop: 50,
        paddingBottom: 50
      }}
    >
      <Col span={8}>
        <div style={{ fontWeight: 'bold', marginBottom: 25 }}>The Project</div>
        <div style={{ marginTop: 15 }}>
          <Link
            onClick={() => {
              setRoute('/press')
            }}
            to='/press'
          >
            Press
          </Link>
        </div>
        <div style={{ marginTop: 15 }}>
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
      <Col span={8}>
        <div style={{ fontWeight: 'bold', marginBottom: 25 }}>Resources</div>
      </Col>
      <Col span={8}>
        <div style={{ fontWeight: 'bold', marginBottom: 25 }}>Legal</div>
        <div style={{ marginTop: 15 }}>
          <Link
            onClick={() => {
              setRoute('/terms-and-conditions')
            }}
            to='/terms-and-conditions'
          >
            Terms & Conditions
          </Link>
        </div>
        <div style={{ marginTop: 15 }}>
          <Link
            onClick={() => {
              setRoute('/legal-notice')
            }}
            to='/legal-notice'
          >
            Legal Notice
          </Link>
        </div>
        <div style={{ marginTop: 15 }}>
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
