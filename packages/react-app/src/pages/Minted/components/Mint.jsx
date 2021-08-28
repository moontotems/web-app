import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'

export default function Mint({ gasPrice, tx, writeContracts }) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      _to: '0xb68Bc26fE4e55E326Ad2430B2864d98d57f85F8E',
      //_tokenId: 1,
      _uri: 'test'
    })
  }, [])

  const handleSubmit = async () => {
    const values = await form.validateFields()

    console.log({ values })

    const address = '0xb68Bc26fE4e55E326Ad2430B2864d98d57f85F8E'
    const TOKEN_ID = 1

    // writeContracts.NFTokenMetadataEnumerableMock
    tx(
      writeContracts.NFTokenMetadataEnumerableMock.mint(address, TOKEN_ID, {
        gasPrice
        // gasLimit: 1000000
        // value: ,
        // nonce:
      })
    )
  }

  return (
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
  )
}
