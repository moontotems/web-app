import React, { useEffect } from 'react'
import { utils } from 'ethers'
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
    const { _to, _tokenId, _amount } = values

    // writeContracts.MoonTotems
    tx(
      writeContracts.MoonTotems.mint(_to, _tokenId, {
        gasPrice,
        // gasLimit: 1000000
        value: utils.parseEther(_amount)
        // nonce:
      })
    )
  }

  return (
    <Form
      form={form}
      layout='vertical'
      //onValuesChange={() => }
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
      <Form.Item name='_amount' label='_amount'>
        <Input placeholder='_amount in ETH' />
      </Form.Item>
      <Button htmlType='submit'>Submit</Button>
    </Form>
  )
}
