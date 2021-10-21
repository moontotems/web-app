import React, { useState } from 'react'
import { ChatBot16, ChatBot32 } from '@carbon/icons-react'
import { Form, Input } from 'antd'
import persistantStore from 'store'
import CreatureFeatureContainer from '../../CreatureFeatureContainer'
import './index.less'
import MessageList from './MessageList'
import GREETING_LIST from './greetingList'
import ANSWER_LIST from './answerList'

export default function Chatbot({
  ethereumProps,
  nftAppProps,
  image,
  tokenId
}) {
  const { isMobile } = nftAppProps
  const [form] = Form.useForm()

  const localStorageId = `chatbotMessages-${tokenId}`
  const initialMessages = persistantStore.get(localStorageId) || []
  if (initialMessages.length === 0) {
    const randomIndex = Math.floor(Math.random() * GREETING_LIST.length)
    initialMessages.push({
      sender: 'bot',
      value: GREETING_LIST[randomIndex].message
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

  let responseContainerStyle
  if (isMobile) {
    responseContainerStyle = {
      position: 'absolute',
      bottom: '90px',
      left: 0,
      width: '100%',
      backgroundColor: '#000'
    }
  } else {
    responseContainerStyle = {
      float: 'right',
      width: '70%'
    }
  }

  return (
    <CreatureFeatureContainer
      ethereumProps={ethereumProps}
      nftAppProps={nftAppProps}
      containerId={'chatbot'}
      icon={isMobile ? <ChatBot32 /> : <ChatBot16 />}
      title={'TOTEM CHAT'}
    >
      <div
        style={{
          float: 'left',
          width: '100%',
          height: isMobile ? '100%' : 'auto',
          textAlign: 'left',
          overflowY: 'hidden',
          paddingLeft: '17px'
        }}
      >
        <div
          style={{
            float: 'left',
            width: '100%',
            overflowY: 'auto'
          }}
        >
          <MessageList
            ethereumProps={ethereumProps}
            nftAppProps={nftAppProps}
            messages={messages}
            typing={typing}
            image={image}
          />
        </div>
        <div style={{ ...responseContainerStyle }}>
          <Form form={form} onFinish={onSubmit} style={{ width: '100%' }}>
            <Form.Item name='inputValue'>
              <Input
                placeholder={'Ask a question ...'}
                style={{
                  float: 'right',
                  width: '80%',
                  margin: '0 auto 1rem',
                  marginTop: '10px',
                  padding: isMobile ? '1.8rem' : '0.8rem',
                  textAlign: 'left',
                  backgroundColor: '#1062FE',
                  color: '#fff',
                  border: '1px solid #1062FE',
                  borderRadius: '0.80rem',
                  fontSize: isMobile ? '26px' : '16px',
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
        </div>
      </div>
    </CreatureFeatureContainer>
  )
}
