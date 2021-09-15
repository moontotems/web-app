import React, { useState } from 'react'
import { Row, Form, TextInput, Button } from 'carbon-components-react'
import { ChatBot16 } from '@carbon/icons-react'
import $ from 'jquery'
import persistantStore from 'store'
import MessageList from './MessageList'
import ANSWER_LIST from './answerList'

export default function Chatbot() {
  const initialMessages = persistantStore.get('chatbotMessages') || []
  if (initialMessages.length === 0) {
    initialMessages.push({
      sender: 'bot',
      value: 'Hello! I can answer your questions ...'
    })
    persistantStore.set('chatbotMessages', initialMessages)
  }

  const [messages, setMessages] = useState(initialMessages)
  const [typing, setTyping] = useState(false)

  const addMessage = message => {
    const _messages = persistantStore.get('chatbotMessages')
    const updatedMessageList = [..._messages, message]
    setMessages(updatedMessageList)
    persistantStore.set('chatbotMessages', updatedMessageList)
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

  const onSubmit = e => {
    e.preventDefault()

    const inputField = $('#chatbotInput')
    const value = inputField.val()
    if (value == '') return

    const message = { sender: 'user', value }
    addMessage(message)

    inputField.val('')

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
        <MessageList messages={messages} typing={typing} />
      </Row>
      <Row>
        <Form onSubmit={e => onSubmit(e)}>
          <TextInput
            //helperText='Optional helper text here; if message is more than one line text should wrap (~100 character count maximum)'
            id='chatbotInput'
            //invalidText='Invalid error message.'
            //labelText='Text input label'
            placeholder='Ask a question'
          />
          <Button kind='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Row>
    </div>
  )
}
