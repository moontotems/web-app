import React from 'react'
import { Row, Col } from 'antd'
import { Button } from 'antd'

export default function CreatureFileDownloads({ ethereumProps, nftAppProps }) {
  const buttonStyle = {
    height: 34,
    lineHeight: '34px',
    fontSize: 16,
    padding: '0 15px',
    borderRadius: 0,
    backgroundColor: '#1062FE',
    borderColor: '#1062FE',
    marginTop: 10
  }

  return (
    <div id='creatureDownloads'>
      <div
        style={{
          float: 'left',
          width: '100%',
          paddingRight: 10,
          fontSize: '18px',
          lineHeight: '48px',
          textAlign: 'right'
        }}
      >
        <Row>
          <Col xs={24} style={{ marginBottom: 20 }}>
            <Row>
              <Col xs={12}>
                <span style={{ float: 'right', marginRight: 30, fontSize: 30 }}>
                  PNG (10mb)
                </span>
              </Col>
              <Col xs={12}>
                <Button
                  style={{
                    ...buttonStyle,
                    float: 'left'
                  }}
                >
                  Download
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <Row>
              <Col xs={12}>
                <span style={{ float: 'right', marginRight: 30, fontSize: 30 }}>
                  OBJ (239kb)
                </span>
              </Col>
              <Col xs={12}>
                <Button
                  style={{
                    ...buttonStyle,
                    float: 'left'
                  }}
                >
                  Download
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
