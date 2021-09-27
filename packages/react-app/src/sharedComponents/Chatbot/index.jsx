import React, { useState } from 'react'
import { Row } from 'carbon-components-react'
import { ChatBot32 } from '@carbon/icons-react'
import { Form, Input } from 'antd'
import persistantStore from 'store'
import './index.less'
import MessageList from './MessageList'
import ANSWER_LIST from './answerList'

export default function Chatbot({ image, tokenId }) {
  const localStorageId = `chatbotMessages-${tokenId}`
  const [form] = Form.useForm()

  const initialMessages = persistantStore.get(localStorageId) || []
  if (initialMessages.length === 0) {
    initialMessages.push({
      sender: 'bot',
      value: 'Hello! I can answer your questions ...'
    })
    persistantStore.set(localStorageId, initialMessages)
  }

  const [messages, setMessages] = useState(initialMessages)
  const [typing, setTyping] = useState(false)

  const addMessage = message => {
    const _messages = persistantStore.get(localStorageId) || []
    const updatedMessageList = [..._messages, message]
    setMessages(updatedMessageList)
    persistantStore.set(localStorageId, updatedMessageList)
  }

  const generateChatbotResponse = async () => {
    const delay = seconds => new Promise(res => setTimeout(res, 1000 * seconds))
    const randomIndex = Math.floor(Math.random() * ANSWER_LIST.length)
    const message = {
      sender: 'bot',
      value: ANSWER_LIST[randomIndex]
    }
    await delay(4)
    setTyping(true)
    await delay(4)
    addMessage(message)
    setTyping(false)
  }

  const onSubmit = ({ inputValue }) => {
    if (inputValue == '') return

    const message = { sender: 'user', value: inputValue }
    addMessage(message)

    form.resetFields()

    generateChatbotResponse()
  }

  return (
    <div
      id='chatbot'
      style={{
        float: 'left',
        width: '100%',
        textAlign: 'left',
        marginLeft: 10
      }}
    >
      <div style={{ float: 'left', width: '100%', marginBottom: 15 }}>
        <ChatBot32 style={{ float: 'left' }} />
        <div
          style={{ float: 'left', height: 32, marginTop: 2, marginLeft: 10 }}
        >
          TOTEM CHAT
        </div>
      </div>
      <Row>
        <div style={{ marginTop: 0 }}>
          <MessageList messages={messages} typing={typing} image={image} />
        </div>
      </Row>
      <Row>
        <Form form={form} onFinish={onSubmit} style={{ width: '100%' }}>
          <Form.Item name='inputValue'>
            <Input
              placeholder={'Ask a question...'}
              style={{
                float: 'right',
                width: '80%',
                margin: '0 auto 1rem',
                padding: '0.8rem 0.8rem',
                textAlign: 'left',
                backgroundColor: '#1062FE',
                color: '#fff',
                border: '1px solid #1062FE',
                borderRadius: '0.80rem',
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '28px',
                letterSpacing: '0.1599999964237213px'
              }}
            />
            {/*
              <Search
              id='chatInput'
              placeholder='Ask a question'
              //allowClear
              enterButton='Ask'
              size='large'
              submit
            />
            */}
          </Form.Item>
        </Form>
      </Row>
    </div>
  )
}
