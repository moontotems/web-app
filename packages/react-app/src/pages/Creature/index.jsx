import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Tabs, Button } from 'antd'
import { ethers } from 'ethers'
import { useEventListener } from '../../hooks'
import creature_meta_data_hashmap from '../../creature_meta_data_hashmap.json'

export default function CreaturePage({
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts
}) {
  const { TabPane } = Tabs

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let { id: tokenId } = useParams()

  const {
    age,
    birthDay,
    birthMonth,
    birthYear,
    birthYearStr,
    edition,
    eyeAsymmetrical,
    eyeColor1,
    eyeColor2,
    eyeMulticolor,
    lunarOriginBatchId,
    lunarOriginId,
    lunarOriginName,
    lunarOriginNameLatin,
    lunarOriginQuantity,
    moonMonth,
    moonMonthId,
    moonPhase,
    moonPhaseId,
    P,
    rarity,
    rarityOrigin,
    seedGlobal,
    seedLocal,
    spawn_DateDay,
    spawn_DateMonth,
    spawn_DateYear,
    spawn_Hour,
    total,
    trait_jobField,
    trait_jobTitle,
    trait_name1,
    trait_name2,
    trait_personality1,
    trait_personality2,
    trait_personality3
  } = creature_meta_data_hashmap[tokenId]

  const mintEvents = useEventListener(
    readContracts,
    'NFTokenMetadataEnumerableMock',
    'Mint',
    localProvider,
    1
  )
  const mintEventsMap = {}
  mintEvents.map(mintEvent => {
    mintEventsMap[mintEvent._tokenId] = mintEvent
    // convert _tokenId from bigNumber to string
    mintEventsMap[mintEvent._tokenId]['1'] =
      mintEventsMap[mintEvent._tokenId]['1'].toString()
  })

  const minted = !!mintEventsMap[tokenId]
  const image = `https://talismoonstest.blob.core.windows.net/images/TALISMOONS_BATCH01.${tokenId}.jpeg`

  console.log({ minted })

  const mint = () => {
    const to = address
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
                  fontFamily: 'UniversLTStd',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '48px',
                  lineHeight: '58px',
                  textAlign: 'center'
                }}
              >
                {trait_name1} {trait_name2}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Tabs defaultActiveKey='1' centered>
                <TabPane tab='Attributes' key='1'>
                  <Row>
                    <Col span={12}>
                      <div
                        style={{
                          padding: 10,
                          fontFamily: 'UniversLTStd',
                          fontStyle: 'normal',
                          fontWeight: 'normal',
                          fontSize: '18px',
                          lineHeight: '24px',
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
                        <div>trait_jobField</div>
                        <div>trait_jobTitle</div>
                        <div>Timestamp</div>
                        <div>Lunar Phase</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div
                        style={{
                          padding: 10,
                          fontFamily: 'UniversLTStd',
                          fontStyle: 'normal',
                          fontWeight: 'normal',
                          fontSize: '18px',
                          lineHeight: '24px',
                          textAlign: 'left',
                          color: '#fff'
                        }}
                      >
                        <div>---</div>
                        <div>---</div>
                        <div>---</div>
                        <div>---</div>
                        <div>
                          {trait_personality1}, {trait_personality2},{' '}
                          {trait_personality3}
                        </div>
                        <div>{trait_jobField}</div>
                        <div>{trait_jobTitle}</div>
                        <div>---</div>
                        <div>---</div>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab='Files' key='2'>
                  Content of Tab Files
                </TabPane>
                <TabPane tab='Trade' key='3'>
                  Content of Tab Trade
                </TabPane>
                <TabPane tab='History' key='4'>
                  Content of Tab History
                </TabPane>
              </Tabs>
            </Col>
          </Row>
          <Row>
            <Col span={9} />
            <Col span={6}>
              {minted && (
                <a href='https://opensea.io/' target='_blank' rel='noreferrer'>
                  <Button block type='primary' style={{ marginTop: '20px' }}>
                    Make offer on Opensea
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
