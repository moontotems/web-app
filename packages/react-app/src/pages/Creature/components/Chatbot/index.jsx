import React, { useState } from 'react'
import { Row, Form } from 'carbon-components-react'
import { ChatBot16 } from '@carbon/icons-react'
import { Input } from 'antd'
const { Search } = Input
import persistantStore from 'store'
import MessageList from './MessageList'
import ANSWER_LIST from './answerList'

export default function Chatbot({ image, tokenId }) {
  const localStorageId = `chatbotMessages-${tokenId}`

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
    const message = { sender: 'bot', value: ANSWER_LIST[randomIndex] }
    await delay(4)
    setTyping(true)
    await delay(4)
    addMessage(message)
    setTyping(false)
  }

  const onSubmit = value => {
    if (value == '') return

    const message = { sender: 'user', value }
    addMessage(message)

    generateChatbotResponse()
  }

  return (
    <div
      style={{
        float: 'left',
        width: '100%',
        textAlign: 'left',
        padding: 20
      }}
    >
      <div style={{ marginBottom: 15 }}>
        <ChatBot16 /> TOTEM CHAT
      </div>
      <Row>
        <MessageList messages={messages} typing={typing} image={image} />
      </Row>
      <Row>
        <Form style={{ width: '100%' }}>
          <Search
            placeholder='Ask a question'
            allowClear
            enterButton='Ask'
            size='large'
            submit
            onSearch={onSubmit}
          />
        </Form>
      </Row>
    </div>
  )
}
