import React from 'react'
import { Row, Col, Form, Input, Button, notification } from 'antd'
import { Download16, Download32 } from '@carbon/icons-react'
import { utils } from 'ethers'
import CreatureFeatureContainer from '../../CreatureFeatureContainer'

export default function CreatureActions({
  ethereumProps,
  nftAppProps,
  tokenId
}) {
  const { isMobile, fetchUsersCreatures } = nftAppProps
  const [form] = Form.useForm()

  const {
    address,
    mainnetProvider,
    localProvider,
    gasPrice,
    tx,
    readContracts,
    writeContracts
  } = ethereumProps

  const buttonStyle = {
    height: isMobile ? 'auto' : '34px',
    width: isMobile ? '150px' : '113px',
    lineHeight: '34px',
    fontSize: isMobile ? '24px' : '16px',
    padding: isMobile ? '10px 15px' : '0 15px',
    borderRadius: 0,
    backgroundColor: '#1062FE',
    borderColor: '#1062FE'
    //marginTop: 10
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

    console.log({ writeContracts })

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
      icon={isMobile ? <Download32 /> : <Download16 />}
      title={'TOTEM ACTIONS'}
    >
      <div
        style={{
          float: 'left',
          width: '100%',
          marginTop: isMobile ? '25px' : '0px',
          paddingRight: '10px',
          fontSize: isMobile ? '24px' : '18px',
          lineHeight: '48px',
          textAlign: 'right'
        }}
      >
        <Row style={{ marginBottom: '20px' }}>
          <Col span={24}>
            <Form
              form={form}
              //layout='vertical'
              layout='inline'
              onFinish={onSubmit}
              //style={{ width: '100%' }}
            >
              <Form.Item name='inputValue' label='Transfer To'>
                <Input
                  placeholder='0x...'
                  style={{
                    //float: 'right',
                    //width: '90%',
                    //padding: isMobile ? '1.8rem' : '0.8rem',
                    textAlign: 'left',
                    //backgroundColor: '#1062FE',
                    color: '#fff',
                    border: '1px solid #1062FE',
                    //borderRadius: '0.80rem',
                    fontSize: isMobile ? '26px' : '16px',
                    fontWeight: 400,
                    lineHeight: '28px',
                    letterSpacing: '0.1599999964237213px'
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
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </CreatureFeatureContainer>
  )
}
