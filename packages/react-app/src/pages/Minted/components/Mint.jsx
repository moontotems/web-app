import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'

export default function Mint({ gasPrice, tx, writeContracts }) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      _to: '0xb68Bc26fE4e55E326Ad2430B2864d98d57f85F8E'
      // _tokenId: 1
    })
  }, [])

  const handleSubmit = async () => {
    const values = await form.validateFields()
    console.log({ values })
    const { _to, _tokenId } = values

    // writeContracts.NFTokenMetadataEnumerableMock
    tx(
      writeContracts.NFTokenMetadataEnumerableMock.mint(_to, _tokenId, {
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
      <Button htmlType='submit'>Submit</Button>
    </Form>
  )
}
