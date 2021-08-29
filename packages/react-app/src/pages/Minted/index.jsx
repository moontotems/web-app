import React from 'react'
import { Row, Col, Divider, Form, Input, Button } from 'antd'
import { Creature } from '../../components'
import { Mint } from './components'

// TODO: fetch this from file server
console.log('fetching local json list of talismoon data')
import talismoon_data from './talismoon_data.json'
console.log('fetching local json list of talismoon data: OK')
console.log({ talismoon_data })

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

export default function Minted({
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
  const totalSupply =
    useContractReader(
      readContracts,
      'NFTokenMetadataEnumerableMock',
      'totalSupply'
    ) || {}

  const TOTAL_SUPPLY_AS_INT = parseInt(totalSupply.toString()) || 0

  const mintEvents = useEventListener(
    readContracts,
    'NFTokenMetadataEnumerableMock',
    'Mint',
    localProvider,
    1
  )

  const NFTS_MINTED = [...Array(TOTAL_SUPPLY_AS_INT).keys()]

  console.log({ NFTS_MINTED })

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div>
        <h2>Minted</h2>
        <Row>
          {mintEvents?.map((event, index) => {
            const { blockNumber, sender, _from, _to, _tokenId } = event
            const {
              id,
              name1,
              name2,
              generation,
              characteristic1,
              characteristic2,
              characteristic3,
              element,
              family
            } = talismoon_data[_tokenId]

            const key = `TALISMOONS-${id}-minted`

            return (
              <Col key={key} xs={24} sm={16} md={8} lg={6}>
                <Creature
                  imagePath={`./images/creatures/JPG/TALISMOONS_G1.${id}.jpg`}
                  key={`TALISMOONS_G1.${id}`}
                  id={id}
                  name1={name1}
                  name2={name2}
                  generation={generation}
                  characteristic1={characteristic1}
                  characteristic2={characteristic2}
                  characteristic3={characteristic3}
                  element={element}
                  family={family}
                  showAdoptButton={false}
                />
              </Col>
            )
          })}
        </Row>
      </div>

      <Divider />

      <div>
        <Row>
          <Col span={8} />
          <Col span={8}>
            <h3>Mint</h3>
            <Mint gasPric={gasPrice} tx={tx} writeContracts={writeContracts} />
          </Col>
          <Col span={8} />
        </Row>
      </div>
    </div>
  )
}
