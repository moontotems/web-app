import React from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import { Download16 } from '@carbon/icons-react'
import CreatureFeatureContainer from '../../CreatureFeatureContainer'

export default function MintTo({ ethereumProps, nftAppProps, tokenId }) {
  const { isMobile, mint } = nftAppProps
  const [form] = Form.useForm()

  const buttonStyle = {
    height: isMobile ? 'auto' : '38px',
    width: '113px',
    lineHeight: '38px',
    fontSize: '16px',
    padding: '0 15px',
    borderRadius: 0,
    backgroundColor: '#1062FE',
    borderColor: '#1062FE'
  }

  const onSubmit = ({ toAddress }) => {
    if (!toAddress || toAddress === '') return
    mint(toAddress, tokenId)
  }

  return (
    <CreatureFeatureContainer
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      containerId={'mintTo'}
      icon={<Download16 />}
      title={'MINT'}
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
            <Form
              form={form}
              //layout='vertical'
              layout='inline'
              onFinish={onSubmit}
            >
              <Form.Item name='toAddress' label='Mint'>
                <Input
                  placeholder='0x...'
                  autocomplete='off'
                  style={{
                    textAlign: 'left',
                    color: '#fff',
                    border: '1px solid #1062FE',
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
                  Mint
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </CreatureFeatureContainer>
  )
}
