import React, { useEffect } from 'react'
import { Divider, Form, Input, InputNumber, Button } from 'antd'
import { utils, BigNumber } from 'ethers'

import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useGasPrice,
  useOnBlock,
  useUserSigner
} from '../hooks'

export default function ExampleUI({
  transferEvents,
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
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      _to: '0xb68Bc26fE4e55E326Ad2430B2864d98d57f85F8E',
      _tokenId: 1,
      _uri: 'test'
    })
  }, [])

  if (readContracts && writeContracts) {
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

    const handleSubmit = async () => {
      const values = await form.validateFields()

      console.log({ values })

      const address = '0xb68Bc26fE4e55E326Ad2430B2864d98d57f85F8E'
      const TOKEN_ID = 1
      const _uri = 'test.de'

      // writeContracts.NFTokenMetadataEnumerableMock
      tx(
        writeContracts.NFTokenMetadataEnumerableMock.mint(
          address,
          TOKEN_ID,
          _uri,
          {
            gasPrice
            //gasLimit: 1000000
            // value: ,
            // nonce:
          }
        )
      )
    }

    return (
      <div>
        <h2>Home</h2>
        <Divider />
        {NFTS_MINTED?.map((NFT, index) => (
          <ol key={`nft-${index}`}>{NFT}</ol>
        ))}
        <Divider />
        <h3>Mint</h3>
        <Form
          form={form}
          layout='vertical'
          onValuesChange={() => console.log('change')}
          size={'large'}
          placeholder='Input'
          onFinish={handleSubmit}
        >
          <Form.Item name='_to' label='address _to'>
            <Input placeholder='address _to' />
          </Form.Item>
          <Form.Item name='_tokenId' label='uint256 _tokenId'>
            <Input placeholder='uint256 _tokenId' />
          </Form.Item>
          <Form.Item name='_uri' label='string calldata _uri'>
            <Input placeholder='string calldata _uri' />
          </Form.Item>
          <Button htmlType='submit'>Submit</Button>
        </Form>
      </div>
    )
  }

  return <></>
}
