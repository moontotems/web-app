import React from 'react'
import { Row, Col, Button } from 'antd'
import { Download16, Download32 } from '@carbon/icons-react'
import CreatureFeatureContainer from '../../CreatureFeatureContainer'

export default function CreatureFileDownloads({
  ethereumProps,
  nftAppProps,
  tokenId
}) {
  const { isMobile } = nftAppProps

  const textStyle = {
    float: 'right',
    marginRight: '30px',
    fontSize: '30px',
    paddingTop: isMobile ? '10px' : 'none'
  }

  const buttonStyle = {
    height: isMobile ? 'auto' : '34px',
    width: isMobile ? '150px' : '113px',
    lineHeight: '34px',
    fontSize: isMobile ? '24px' : '16px',
    padding: isMobile ? '10px 15px' : '0 15px',
    borderRadius: 0,
    backgroundColor: '#1062FE',
    borderColor: '#1062FE',
    marginTop: 10
  }

  return (
    <CreatureFeatureContainer
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      containerId={'creatureDownloads'}
      icon={isMobile ? <Download32 /> : <Download16 />}
      title={'TOTEM DOWNLOADS'}
    >
      <div
        style={{
          float: 'left',
          width: '100%',
          marginTop: isMobile ? '25px' : '0px',
          paddingRight: '10px',
          fontSize: isMobile ? '24px' : '18px',
          lineHeight: '48px',
          textAlign: 'right'
        }}
      >
        <Row style={{ marginBottom: '20px' }}>
          <Col span={14}>
            <span style={{ ...textStyle }}>2K.jpg (2mb)</span>
          </Col>
          <Col span={10}>
            <Button
              style={{
                ...buttonStyle,
                float: 'left'
              }}
              onClick={() => {
                window.open(
                  `https://moontotems.blob.core.windows.net/totem-owner-assets/base/jpeg/2048/moontotems_g1_base_2048_${tokenId}.jpg`
                )
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={14}>
            <span style={{ ...textStyle }}>2K.png (10mb)</span>
          </Col>
          <Col span={10}>
            <Button
              style={{
                ...buttonStyle,
                float: 'left'
              }}
              onClick={() => {
                window.open(
                  `https://moontotems.blob.core.windows.net/totem-owner-assets/base/png/2048/moontotems_g1_base_2048_${tokenId}.png`
                )
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={14}>
            <span
              style={{
                ...textStyle,
                color: '#808080'
              }}
            >
              6K.jpg (8mb)
            </span>
          </Col>
          <Col span={10}>
            <Button
              style={{
                ...buttonStyle,
                float: 'left'
              }}
              onClick={() => {
                window.open(
                  `https://moontotems.blob.core.windows.net/totem-owner-assets/base/jpeg/6k/moontotems_g1_base_6k_${tokenId}.jpg`
                )
              }}
            >
              Processing
            </Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={14}>
            <span style={{ ...textStyle }}>Card.jpg (1mb)</span>
          </Col>
          <Col span={10}>
            <Button
              style={{
                ...buttonStyle,
                float: 'left'
              }}
              onClick={() => {
                window.open(
                  `https://moontotems.blob.core.windows.net/totem-owner-assets/card/moontotems_g1_card_2048_${tokenId}.jpg`
                )
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={14}>
            <span style={{ ...textStyle }}>Flat.jpg (1mb)</span>
          </Col>
          <Col span={10}>
            <Button
              style={{
                ...buttonStyle,
                float: 'left'
              }}
              onClick={() => {
                window.open(
                  `https://moontotems.blob.core.windows.net/totem-owner-assets/flat/jpeg/2048/moontotems_g1_flat_2048_${tokenId}.jpg`
                )
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px' }}>
          <Col span={14}>
            <span style={{ ...textStyle }}>3D.abc (230kb)</span>
          </Col>
          <Col span={10}>
            <Button
              style={{
                ...buttonStyle,
                float: 'left'
              }}
              onclick="window.open('file.doc')"
              onClick={() => {
                window.open(
                  `https://moontotems.blob.core.windows.net/totem-owner-assets/3d/abc/moontotems_g1_3d_${tokenId}.abc`
                )
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
      </div>
    </CreatureFeatureContainer>
  )
}
