import React from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button } from 'antd'
import { ethers } from 'ethers'

import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserSigner
} from '../../hooks'

export default function CreaturePage({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts,
  location,
  creatures
}) {
  let { id } = useParams()

  const {
    name1,
    name2,
    generation,
    characteristic1,
    characteristic2,
    characteristic3,
    element,
    family,
    minted,
    image
  } = creatures[id]

  const mint = () => {
    const to = address
    const tokenId = id
    const value = ethers.utils.parseEther('0.1')
    console.log({ to, tokenId, value })

    tx(
      writeContracts.NFTokenMetadataEnumerableMock.mint(to, tokenId, {
        gasPrice,
        // gasLimit: 1000000
        value
        // nonce:
      })
    )
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <Row>
        <Col span={6} />
        <Col span={12}>
          <img src={image} width='100%' />
          <Row>
            <Col span={24}>
              <h2
                style={{
                  //fontFamily: 'Univers LT Std',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '48px',
                  lineHeight: '58px',
                  textAlign: 'center'
                }}
              >
                {name1} {name2}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div
                style={{
                  padding: 10,
                  //fontFamily: 'Univers LT Std',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '24px',
                  lineHeight: '29px',
                  textAlign: 'right',
                  color: '#fff',
                  opacity: 0.5
                }}
              >
                <div>Family</div>
                <div>Occupation</div>
                <div>Fertility</div>
                <div>Sex</div>
                <div>Traits</div>
                <div>Timestamp</div>
                <div>Lunar Phase</div>
              </div>
            </Col>
            <Col span={12}>
              <div
                style={{
                  padding: 10,
                  //fontFamily: 'Univers LT Std',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '18px',
                  //lineHeight: '22px',
                  lineHeight: '29px',
                  textAlign: 'left',
                  color: '#fff'
                }}
              >
                <div>{family}</div>
                <div>---</div>
                <div>---</div>
                <div>---</div>
                <div>
                  {characteristic1}, {characteristic2}, {characteristic3}
                </div>
                <div>---</div>
                <div>---</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={9} />
            <Col span={6}>
              {minted && (
                <a href='https://opensea.io/' target='_blank' rel='noreferrer'>
                  <Button block type='primary' style={{ marginTop: '20px' }}>
                    Make Offer
                  </Button>
                </a>
              )}
              {!minted && (
                <Button
                  block
                  type='primary'
                  onClick={() => mint()}
                  style={{ marginTop: '20px' }}
                >
                  Adopt for 0.1 Ξ
                </Button>
              )}
            </Col>
            <Col span={9} />
          </Row>
        </Col>
        <Col span={6} />
      </Row>
    </div>
  )
}
