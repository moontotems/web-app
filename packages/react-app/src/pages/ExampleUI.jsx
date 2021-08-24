import { SyncOutlined } from '@ant-design/icons'
import { utils } from 'ethers'
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Input,
  List,
  Progress,
  Slider,
  Spin,
  Switch
} from 'antd'
import React, { useState } from 'react'
import { Address, Balance } from '../components'

export default function ExampleUI({
  transferEvents,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts
}) {
  const [addressFortransferFrom, setAddressFortransferFrom] =
    useState('loading...')

  console.log({ writeContracts })
  console.log({ readContracts })

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div
        style={{
          border: '1px solid #cccccc',
          padding: 16,
          width: 400,
          margin: 'auto',
          marginTop: 64
        }}
      >
        <h2>NFTokenEnumerableMock UI:</h2>
        <h4>transferFrom:</h4>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            onChange={e => {
              setAddressFortransferFrom(e.target.value)
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              console.log(writeContracts['NFTokenEnumerableMock'])
              console.log(readContracts['NFTokenEnumerableMock'])
              console.log(writeContracts['NFTokenEnumerableMock'].transferFrom)
              const TOKEN_ID = 1
              const result = tx(
                writeContracts['NFTokenEnumerableMock'].transferFrom(
                  address,
                  addressFortransferFrom,
                  TOKEN_ID
                ),
                update => {
                  console.log('📡 Transaction Update:', update)
                  if (
                    update &&
                    (update.status === 'confirmed' || update.status === 1)
                  ) {
                    console.log(' 🍾 Transaction ' + update.hash + ' finished!')
                    console.log(
                      ' ⛽️ ' +
                        update.gasUsed +
                        '/' +
                        (update.gasLimit || update.gas) +
                        ' @ ' +
                        parseFloat(update.gasPrice) / 1000000000 +
                        ' gwei'
                    )
                  }
                }
              )
              console.log('awaiting metamask/web3 confirm result...', result)
              console.log(await result)
            }}
          >
            Safe Transfer From!
          </Button>
        </div>
        <Divider />
        Your Contract Address:
        <Address
          address={
            readContracts && readContracts.NFTokenEnumerableMock
              ? readContracts.NFTokenEnumerableMock.address
              : null
          }
          ensProvider={mainnetProvider}
          fontSize={16}
        />
        <Divider />
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              // look how you call setPurpose on your contract:
              tx(writeContracts.NFTokenEnumerableMock.setPurpose('🍻 Cheers'))
            }}
          >
            Set Purpose to &quot;🍻 Cheers&quot;
          </Button>
        </div>
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* look how we call setPurpose AND send some value along */
              tx(
                writeContracts.NFTokenEnumerableMock.setPurpose(
                  '💵 Paying for this one!',
                  {
                    value: utils.parseEther('0.001')
                  }
                )
              )
              /* this will fail until you make the setPurpose function payable */
            }}
          >
            Set Purpose With Value
          </Button>
        </div>
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* you can also just craft a transaction and send it to the tx() transactor */
              tx({
                to: writeContracts.NFTokenEnumerableMock.address,
                value: utils.parseEther('0.001'),
                data: writeContracts.NFTokenEnumerableMock.interface.encodeFunctionData(
                  'setPurpose(string)',
                  ['🤓 Whoa so 1337!']
                )
              })
              /* this should throw an error about "no fallback nor receive function" until you add it */
            }}
          >
            Another Example
          </Button>
        </div>
      </div>

      <div
        style={{ width: 600, margin: 'auto', marginTop: 32, paddingBottom: 32 }}
      >
        <h2>Events:</h2>
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
      </div>
    </div>
  )
}
