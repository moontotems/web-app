import React, { useEffect } from 'react'
import { Edit16, Edit32 } from '@carbon/icons-react'
import { Form, Input, Button, notification } from 'antd'
import $ from 'jquery'
import persistantStore from 'store'
import CreatureFeatureContainer from '../../CreatureFeatureContainer'

export default function WriteCreatureStory({
  ethereumProps,
  nftAppProps,
  tokenId
}) {
  const { isMobile } = nftAppProps
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

  useEffect(() => {
    if (isMobile) {
      $('#creatureStoryTextArea').css({
        'min-height': '200px',
        'font-size': '30px',
        'line-height': '28px'
      })
    } else {
      $('#creatureStoryTextArea').css({
        'min-height': '200px',
        'font-size': '18px',
        'line-height': '28px'
      })
    }
  }, [isMobile])

  return (
    <CreatureFeatureContainer
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      containerId={'writeCreatureStory'}
      icon={isMobile ? <Edit32 /> : <Edit16 />}
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
                  width: '100%',
                  color: '#fff',
                  //border: '1px solid #1062FE',
                  borderRadius: '0.80rem',
                  //fontSize: '20px',
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
