import React, { useState, useEffect } from 'react'
import { ChatBot16, ChatBot32, ArrowUp32 } from '@carbon/icons-react'
import { Form, Input, Button } from 'antd'
import persistantStore from 'store'
import OpenAI from 'openai-api'
const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI(OPENAI_API_KEY)

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
  const { isMobile, assembleCreature } = nftAppProps
  const [form] = Form.useForm()

  const creature = assembleCreature(tokenId)
  const { metaData } = creature
  const {
    trait_name1,
    trait_name2,
    trait_jobField,
    trait_jobTitle,
    lunarOriginName,
    trait_personality1,
    trait_personality2,
    trait_personality3
  } = metaData

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

  const delayBySeconds = seconds =>
    new Promise(res => setTimeout(res, 1000 * seconds))

  /*
  const generateChatbotResponse = async () => {
    const randomIndex = Math.floor(Math.random() * ANSWER_LIST.length)
    const message = {
      sender: 'bot',
      value: ANSWER_LIST[randomIndex]
    }
    await delay(4)
    setTyping(true)
    await delay(4)
    setTyping(false)
    addMessage(message)
  }
  */

  const createOpenAIInput = textInput => {
    const localStorageId = `chatbotMessages-${tokenId}`
    const initialMessages = persistantStore.get(localStorageId) || []

    const start = `The following is a conversation with a Moon Totem. The Moon Totem is ${trait_personality1}, ${trait_personality2} and ${trait_personality3}. The Moon Totem name is ${trait_name1} ${trait_name2}. The Moon Totem is from ${lunarOriginName} on the Moon. \n\n`

    let openAiInput = start
    initialMessages.map(message => {
      if (message.sender === 'bot') {
        openAiInput += `Totem: ${message.value}\n`
      }
      if (message.sender === 'user') {
        openAiInput += `Holder: ${message.value}\n`
      }
    })

    openAiInput += `Holder: ${textInput}\n`

    console.log({ initialMessages })
    console.log({ openAiInput })
    return openAiInput
  }

  const generateChatbotResponse = async textInput => {
    await delayBySeconds(4)
    setTyping(true)
    await delayBySeconds(2)

    let numberOfCredits = await openai.encode(
      'This is an encoding test. Number of tokens is not necessarily the same as word count.'
    )
    numberOfCredits = numberOfCredits.length

    console.log(`Number of tokens for string: ${numberOfCredits}`)

    let gptResponse
    try {
      // const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${textInput}\n`
      const openAIInput = createOpenAIInput(textInput)

      gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: openAIInput,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: ['\n', ' Holder:', ' Totem:']
      })
    } catch (e) {
      console.log(e)
    }

    setTyping(false)

    const {
      status,
      data: { choices }
    } = gptResponse
    console.log({ gptResponse })

    if (status === 200) {
      let openaiResponseText = choices[0].text
      openaiResponseText = openaiResponseText.replace('Totem: ', '')
      openaiResponseText = openaiResponseText.replace('Holder: ', '')
      console.log({ openaiResponseText })

      const message = {
        sender: 'bot',
        value: openaiResponseText
      }

      console.log('adding message:')
      console.log({ message })

      addMessage(message)
    }
  }

  const onSubmit = ({ inputValue }) => {
    if (inputValue == '') return

    const message = { sender: 'user', value: inputValue }
    addMessage(message)

    form.resetFields()

    generateChatbotResponse(inputValue)
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
            <Form
              form={form}
              layout='inline'
              onFinish={onSubmit}
              style={{ width: '100%' }}
            >
              <Form.Item
                name='inputValue'
                style={{
                  width: 'calc(100% - 95px)',
                  marginRight: isMobile ? '15px' : 0
                }}
              >
                <Input
                  placeholder='Ask a question ...'
                  autoComplete='off'
                  style={{
                    float: 'right',
                    //width: '90%',
                    padding: isMobile ? '1.8rem' : '0.8rem',
                    textAlign: 'left',
                    //backgroundColor: '#1062FE',
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
              <Form.Item
                style={{ width: isMobile ? 'auto' : 'calc(20% - 20px)' }}
              >
                <Button
                  style={{
                    float: 'right',
                    height: isMobile ? '80px' : '50px',
                    width: isMobile ? '80px' : '50px',
                    marginTop: '3px',
                    //height: isMobile ? 'auto' : '34px',
                    //width: isMobile ? '150px' : '113px',
                    //lineHeight: '34px',
                    fontSize: isMobile ? '24px' : '16px',
                    //padding: isMobile ? '10px 15px' : '0 15px',
                    borderRadius: '100%',
                    backgroundColor: '#1062FE',
                    borderColor: '#1062FE'
                    //float: 'left'
                  }}
                  htmlType='submit'
                >
                  <ArrowUp32 style={{ marginLeft: '-6px', marginTop: '5px' }} />
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </CreatureFeatureContainer>
  )
}
