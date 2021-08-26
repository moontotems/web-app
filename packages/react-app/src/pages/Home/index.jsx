import React, { useEffect } from 'react'
import { Row, Col, Divider, Form, Input, Button } from 'antd'
import { Discription } from './components'

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

export default function Home({
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
  console.log(
    'readContracts && writeContracts',
    readContracts && writeContracts
  )

  const totalSupply =
    useContractReader(
      readContracts,
      'NFTokenMetadataEnumerableMock',
      'totalSupply'
    ) || {}

  const TOTAL_SUPPLY_AS_INT = parseInt(totalSupply.toString()) || 0

  const NFTS_MINTED = [...Array(TOTAL_SUPPLY_AS_INT).keys()]

  console.log({ NFTS_MINTED })

  const CREATURE_IMAGES = []
  for (let i = 0; i < 100; i++) {
    CREATURE_IMAGES[i] = `TALISMOONS_G1.${i}`
  }

  return (
    <div style={{ backgroundColor: '#000' }}>
      <div>
        <p style={{ fontSize: 17, lineHeight: 2 }}>Next hatching #13</p>
        <p style={{ fontSize: 17, lineHeight: 2 }}>04:09:32</p>
      </div>

      <img src='./images/creatures/JPG/TALISMOONS_G1.2.jpg' height='400px' />

      <Discription />
    </div>
  )
}
