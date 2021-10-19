import React from 'react'
import { Edit32 } from '@carbon/icons-react'
import { Form, Input, Button, notification } from 'antd'
import $ from 'jquery'
import persistantStore from 'store'
import './style.css'

export default function WriteCreatureStory({ tokenId, isMobile }) {
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
    <div
      id='writeCreatureStory'
      style={{
        float: 'left',
        width: '100%'
      }}
    >
      <div style={{ float: 'left', width: '100%', marginBottom: 15 }}>
        <Edit32 style={{ float: 'left' }} />
        <div
          style={{
            float: 'left',
            height: 32,
            marginTop: 0,
            marginLeft: 10,
            fontSize: isMobile ? '35px' : '25px'
          }}
        >
          STORY
        </div>
      </div>
      <div style={{ float: 'left', width: '100%' }}>
        <Form form={form} style={{ float: 'left', width: '100%' }}>
          <Form.Item name='textInput'>
            <TextArea
              id='creatureStoryTextArea'
              rows={4}
              showCount
              //autoSize
              defaultValue={currentStory}
              placeholder={'Write the story...'}
              style={{
                float: 'left',
                width: '100%',
                color: '#fff',
                //border: '1px solid #1062FE',
                borderRadius: '0.80rem',
                fontSize: '20px',
                fontWeight: 400,
                lineHeight: '28px',
                letterSpacing: '0.1599999964237213px'
              }}
            />
            <Button onClick={() => saveStory()} style={{ float: 'left' }}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
