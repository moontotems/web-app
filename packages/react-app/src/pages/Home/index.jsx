import React from 'react'
import { Row, Col } from 'antd'
import { Discription } from './components'

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
  favorites,
  price,
  gasPrice,
  tx,
  readContracts,
  writeContracts,
  creatures
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
    <div style={{ backgroundColor: '#000', textAlign: 'center' }}>
      <div>
        <p style={{ fontSize: 17, lineHeight: 2 }}>Next hatching #13</p>
        <p style={{ fontSize: 17, lineHeight: 2 }}>04:09:32</p>
      </div>

      <img
        src='https://talismoonstest.blob.core.windows.net/finalrenders/TALISMOONS_GEN01_2k00000.png'
        height='400px'
      />

      <Discription />
    </div>
  )
}
