import React from 'react'
import { Edit16 } from '@carbon/icons-react'
import { Form, Input, Button, notification } from 'antd'
import $ from 'jquery'
import persistantStore from 'store'
import CreatureFeatureContainer from '../../CreatureFeatureContainer'

export default function WriteCreatureStory({
  ethereumProps,
  nftAppProps,
  tokenId
}) {
  const { TextArea } = Input
  const localStorageId = `creature-story-${tokenId}`
  const [form] = Form.useForm()

  const currentStory = persistantStore.get(localStorageId) || ''

  const saveStory = () => {
    const updatedStory = $('#creatureStoryTextArea').val()
    persistantStore.set(localStorageId, updatedStory)
    notification.info({
      message: 'Saved',
      //description: '',
      placement: 'topRight'
    })
  }

  return (
    <CreatureFeatureContainer
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      containerId={'writeCreatureStory'}
      icon={<Edit16 />}
      title={'TOTEM STORY'}
    >
      <div
        id='writeCreatureStory'
        style={{
          float: 'left',
          width: '100%'
        }}
      >
        <div style={{ float: 'left', width: '100%' }}>
          <Form form={form} style={{ float: 'left', width: '100%' }}>
            <Form.Item name='textInput'>
              <TextArea
                id='creatureStoryTextArea'
                rows={4}
                autoSize
                showCount
                //allowClear
                defaultValue={currentStory}
                placeholder={'Write the story...'}
                style={{
                  float: 'left',
                  minHeight: '200px',
                  width: '100%',
                  color: '#fff',
                  //border: '1px solid #1062FE',
                  borderRadius: '0.80rem',
                  fontSize: '18px',
                  fontWeight: 400,
                  lineHeight: '28px',
                  letterSpacing: '0.16px'
                }}
              />
              <Button
                onClick={() => saveStory()}
                style={{
                  float: 'left',
                  backgroundColor: '#1062FE',
                  borderColor: '#1062FE'
                }}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </CreatureFeatureContainer>
  )
}
