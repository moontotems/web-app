import React from 'react'
import { Row, Col, Form, Input, Button, notification } from 'antd'
import { Download16 } from '@carbon/icons-react'
import { utils } from 'ethers'
import CreatureFeatureContainer from '../../CreatureFeatureContainer'

export default function CreatureActions({
  ethereumProps,
  nftAppProps,
  tokenId
}) {
  const { fetchUsersCreatures } = nftAppProps
  const [form] = Form.useForm()

  const { address, gasPrice, tx, writeContracts } = ethereumProps

  const buttonStyle = {
    height: '38px',
    width: '113px',
    lineHeight: '38px',
    fontSize: '16px',
    padding: '0 15px',
    borderRadius: 0,
    backgroundColor: '#1062FE',
    borderColor: '#1062FE'
  }

  const transferTotem = async (from, to, tokenId) => {
    console.log({ from, to, tokenId })

    if (!utils.isAddress(from) || !utils.isAddress(to)) {
      notification.error({
        message: 'Transaction Error',
        description: 'Invalid address',
        placement: 'topRight'
      })
      return
    }

    try {
      const transferFromResult = await tx(
        writeContracts.MoonTotems.transferFrom(from, to, tokenId, {
          gasPrice,
          gasLimit: 35000
        })
      )
      console.log({ transferFromResult })
      await fetchUsersCreatures()
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmit = ({ inputValue }) => {
    if (inputValue == '') return
    const from = address
    const to = inputValue
    transferTotem(from, to, tokenId)
  }

  return (
    <CreatureFeatureContainer
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      containerId={'creatureDownloads'}
      icon={<Download16 />}
      title={'TOTEM ACTIONS'}
    >
      <div
        style={{
          float: 'left',
          width: '100%',
          paddingRight: '10px',
          fontSize: '18px',
          lineHeight: '48px',
          textAlign: 'right'
        }}
      >
        <Row style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Form form={form} layout='inline' onFinish={onSubmit}>
              <Form.Item name='inputValue' label='Transfer To'>
                <Input
                  placeholder='0x...'
                  autocomplete='off'
                  style={{
                    //float: 'right',
                    //width: '90%',
                    //padding: '0.8rem',
                    textAlign: 'left',
                    //backgroundColor: '#1062FE',
                    color: '#fff',
                    border: '1px solid #1062FE',
                    //borderRadius: '0.80rem',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '28px',
                    letterSpacing: '0.16px'
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    ...buttonStyle,
                    float: 'left'
                  }}
                  htmlType='submit'
                >
                  Transfer
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </CreatureFeatureContainer>
  )
}
