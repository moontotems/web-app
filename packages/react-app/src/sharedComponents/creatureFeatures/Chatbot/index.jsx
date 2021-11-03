import React, { useState, useEffect } from 'react'
import { ChatBot16, ChatBot32 } from '@carbon/icons-react'
import { Form, Input } from 'antd'
import persistantStore from 'store'
import { MOBILE_HEADER_HEIGHT } from '../../../constants'
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

  // this is here so that the chatbot height is updated when keyboard is opened on mobile
  const [height, setHeight] = useState(window.innerHeight)
  function handleWindowSizeChange() {
    setHeight(window.innerHeight)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

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
          height: '100%'
        }}
      >
        <div
          style={{
            // give the outermost container a predefined size
            width: 'auto', //isMobile ? '100%' : 'auto',
            height: isMobile
              ? `${height - MOBILE_HEADER_HEIGHT - 120}px`
              : '600px',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'flex-end'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              placeContent: 'flex-end',
              overflow: 'auto',
              // for firefox
              minHeight: 0
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Form form={form} onFinish={onSubmit} style={{ width: '100%' }}>
              <Form.Item name='inputValue'>
                <Input
                  placeholder='Ask a question ...'
                  style={{
                    float: 'right',
                    width: '90%',
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
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </CreatureFeatureContainer>
  )
}
