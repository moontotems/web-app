import React from 'react'
import { Divider, List } from 'antd'
import { Address } from '../../components'

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

export default function ContractEvents({
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
  const transferEvents = useEventListener(
    readContracts,
    'NFTokenMetadataEnumerableMock',
    'Transfer',
    localProvider,
    1
  )

  const approvalEvents = useEventListener(
    readContracts,
    'NFTokenMetadataEnumerableMock',
    'Approval',
    localProvider,
    1
  )

  const approvalForAllEvents = useEventListener(
    readContracts,
    'NFTokenMetadataEnumerableMock',
    'ApprovalForAll',
    localProvider,
    1
  )

  console.log(
    'readContracts && writeContracts',
    readContracts && writeContracts
  )

  return (
    <div style={{ backgroundColor: '#000' }}>
      <h2>Contract Events</h2>

      <Divider />

      <h3>Transfer Events</h3>
      <List
        bordered
        dataSource={transferEvents}
        renderItem={item => {
          return (
            <List.Item
              key={item.blockNumber + '_' + item.sender + '_' + item.purpose}
            >
              <Address
                address={item[0]}
                ensProvider={mainnetProvider}
                fontSize={16}
              />
              {item[1]}
            </List.Item>
          )
        }}
      />

      <Divider />

      <h3>Approval Events</h3>
      <List
        bordered
        dataSource={approvalEvents}
        renderItem={item => {
          return (
            <List.Item
              key={item.blockNumber + '_' + item.sender + '_' + item.purpose}
            >
              <Address
                address={item[0]}
                ensProvider={mainnetProvider}
                fontSize={16}
              />
              {item[1]}
            </List.Item>
          )
        }}
      />

      <Divider />

      <h3>Approval For All Events</h3>
      <List
        bordered
        dataSource={approvalForAllEvents}
        renderItem={item => {
          return (
            <List.Item
              key={item.blockNumber + '_' + item.sender + '_' + item.purpose}
            >
              <Address
                address={item[0]}
                ensProvider={mainnetProvider}
                fontSize={16}
              />
              {item[1]}
            </List.Item>
          )
        }}
      />
    </div>
  )
}
