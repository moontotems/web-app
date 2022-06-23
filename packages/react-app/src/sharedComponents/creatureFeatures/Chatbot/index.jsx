import React, { useState, useEffect } from 'react'
import { ChatBot16, ArrowUp32 } from '@carbon/icons-react'
import { Form, Input, Button, notification } from 'antd'
import $ from 'jquery'
//import persistantStore from 'store'
import OpenAI from 'openai-api'
const OPENAI_API_KEY = '' //process.env.OPENAI_API_KEY
const openai = new OpenAI(OPENAI_API_KEY)

import { HEADER_HEIGHT } from '../../../constants'
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
  const { address } = ethereumProps
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

  const getGreetingMessage = () => {
    const randomIndex = Math.floor(Math.random() * GREETING_LIST.length)
    const greetingMessage = {
      sender: 'bot',
      value: GREETING_LIST[randomIndex].message
    }
    return greetingMessage
  }

  const initialMessages = [getGreetingMessage()]
  const [messages, setMessages] = useState(initialMessages)
  const [typing, setTyping] = useState(false)

  const addMessage = message => {
    const newMessageList = [...messages, message]
    setMessages(newMessageList)
  }

  const delayBySeconds = seconds =>
    new Promise(res => setTimeout(res, 1000 * seconds))

  const getSimpleRandomChatbotResponse = async () => {
    const randomIndex = Math.floor(Math.random() * ANSWER_LIST.length)
    return ANSWER_LIST[randomIndex]
  }

  const createOpenAIInput = textInput => {
    const startText = `The following is a conversation with a Moon Totem. The Moon Totem is ${trait_personality1}, ${trait_personality2} and ${trait_personality3}. The Moon Totem name is ${trait_name1} ${trait_name2}. The Moon Totem is from ${lunarOriginName} on the Moon. \n\n`

    let openAiInput = startText
    messages.map(message => {
      if (message.sender === 'bot') {
        openAiInput += `Totem: ${message.value}\n`
      }
      if (message.sender === 'user') {
        openAiInput += `Holder: ${message.value}\n`
      }
    })

    //openAiInput += `Holder: ${textInput}\n`

    const reduceOpenAiInputTo = (maxInputLength, openAiInput, startText) => {
      if (openAiInput.length > maxInputLength) {
        openAiInput = openAiInput.replace(startText, '')
        openAiInput =
          startText +
          openAiInput.substring(
            openAiInput.length - maxInputLength,
            openAiInput.length
          )
      }

      return openAiInput
    }

    const MAX_AI_INPUT_LENGTH = 400
    console.log({ MAX_AI_INPUT_LENGTH })
    console.log({ openAiInputLength: openAiInput.length })

    openAiInput = reduceOpenAiInputTo(
      MAX_AI_INPUT_LENGTH,
      openAiInput,
      startText
    )
    console.log({ openAiInputLength: openAiInput.length })
    console.log({ openAiInput })
    return openAiInput
  }

  const checkIfOpenAiContentFilterResponseIsSafe =
    openAiContentFilterResponse => {
      // Importantly, you need to check not only the label that was returned by the filter (0, 1, or 2),
      // but sometimes also the logprobs associated with these.

      // If the filter returns 0 or 1, you should accept that as the filter's outcome.
      // If the filter returns 2, you should accept this outcome only if its logprob is greater than -0.355.

      // If the logprob for 2 is beneath -0.355 (for example, -0.4), then you should use as output
      // whichever of 0 or 1 has a logprob closer to 0.

      // 0 & 1 are safe
      // 2 is unsafe
      const VALID_LABELS = ['0', '1', '2']
      // This is the probability at which we evaluate that a "2" is likely real
      // vs. should be discarded as a false positive
      const TOXIC_THRESHOLD = -0.355
      if (openAiContentFilterResponse?.data?.choices?.length) {
        const {
          data: { choices }
        } = openAiContentFilterResponse
        let { logprobs, text: outputLabel } = choices[0]
        console.log({ logprobs })
        console.log({ outputLabel })
        const { text_offset, token_logprobs, tokens, top_logprobs } = logprobs

        const UNSAFE_AND_CONFIDENT =
          outputLabel === '2' && logprobs['2'] > TOXIC_THRESHOLD
        const UNSAFE_AND_NOT_CONFIDENT =
          outputLabel === '2' && logprobs['2'] < TOXIC_THRESHOLD

        // 2 is unsafe
        if (UNSAFE_AND_CONFIDENT) {
          // leave output_label unchanged at "2"
        }

        if (UNSAFE_AND_NOT_CONFIDENT) {
          // If the model returns "2", return its confidence in 2 or other output-labels
          const logprob_0 = logprobs['0']
          const logprob_1 = logprobs['1']
          // If both "0" and "1" have probabilities, set the output label
          // to whichever is most probable
          if (logprob_0 && logprob_1) {
            if (logprob_0 >= logprob_1) {
              outputLabel = '0'
            } else {
              outputLabel = '1'
            }
          } else {
            // If only one of them is found, set output label to that one
            if (logprob_0) {
              outputLabel = '0'
            } else if (logprob_1) {
              outputLabel = '1'
            } else {
              // If neither "0" or "1" are available, stick with "2"
              // by leaving output_label unchanged.
            }
          }
        }

        let safe = false
        // if the most probable token is none of "0", "1", or "2"
        // this should be set as unsafe
        if (!VALID_LABELS.includes(outputLabel)) {
          safe = false
        }
        // "0" & "1" are safe
        if (outputLabel === '0' || outputLabel === '1') {
          safe = true
        }
        // "2" is unsafe
        if (outputLabel === '2') {
          safe = false
        }

        return safe
      }
    }

  const runTextAgainstOpenAiContentFilter = async textInput => {
    console.log('in openAiContentFilter:')
    console.log({ textInput })
    // https://beta.openai.com/docs/engines/content-filter

    /*
      engine="content-filter-alpha",
      prompt = "<|endoftext|>"+content_to_classify+"\n--\nLabel:",
      temperature=0,
      max_tokens=1,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0,
      logprobs=10
     */

    const contentToClassify = textInput

    try {
      const openaiResponse = await openai.complete({
        // engine: 'content-filter-alpha-c4',
        engine: 'content-filter-alpha',
        prompt: `<|endoftext|>${contentToClassify}\n--\nLabel:`,
        temperature: 0,
        max_tokens: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        logprobs: 10
      })

      console.log({ openAiContentFilterResponse: openaiResponse })

      return openaiResponse
    } catch (e) {
      console.log(e)
    }
  }

  const simulateTyping = async () => {
    await delayBySeconds(4)
    setTyping(true)
    await delayBySeconds(2)
  }

  const generateChatbotResponse = async textInput => {
    await simulateTyping()

    let numberOfCredits = await openai.encode(textInput)
    numberOfCredits = numberOfCredits.length
    console.log(`number of openAi tokens for textInput: ${numberOfCredits}`)

    let openaiResponse
    try {
      // const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${textInput}\n`
      const openAiInput = createOpenAIInput(textInput)

      openaiResponse = await openai.complete({
        engine: 'davinci',
        prompt: openAiInput,
        temperature: 0.5,
        // max allowed as per guidelines is 50
        // after talks with support new max allowed value of 150
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.6,
        presence_penalty: 0.1,
        stop: ['\n', ' Holder:', ' Totem:'],
        user: address
      })
    } catch (error) {
      console.log(error)
    }

    console.log({ openaiResponse })

    const successfullOpenaiResponse =
      openaiResponse && openaiResponse.status === 200

    if (!successfullOpenaiResponse) {
      notification.error({
        message: 'Totem is sleepy',
        description: 'GPT request failed',
        placement: 'topRight'
      })
      return
    }

    const { data: { choices } = {} } = openaiResponse || {}

    const openaiResponseText = choices[0].text

    let totemResponseText
    try {
      const contentFilterResponse = await runTextAgainstOpenAiContentFilter(
        openaiResponseText
      )
      console.log({ contentFilterResponse })
      const isSafe = checkIfOpenAiContentFilterResponseIsSafe(
        contentFilterResponse
      )
      console.log({ isSafe })

      if (isSafe) totemResponseText = openaiResponseText
      if (!isSafe || !totemResponseText)
        totemResponseText = getSimpleRandomChatbotResponse()
    } catch (error) {
      console.log(error)
    }

    totemResponseText = totemResponseText.replace('Totem: ', '')
    totemResponseText = totemResponseText.replace('Holder: ', '')
    console.log({ totemResponseText })

    const message = {
      sender: 'bot',
      value: totemResponseText
    }

    setTyping(false)

    addMessage(message)
  }

  const onSubmit = ({ inputValue }) => {
    if (inputValue == '') return

    const message = { sender: 'user', value: inputValue }
    addMessage(message)

    form.resetFields()
    $('#chatbotInput').focus()
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    // if last message is from user
    if (lastMessage.sender === 'user') {
      generateChatbotResponse(lastMessage.value)
    }
  }, [messages])

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
      icon={<ChatBot16 />}
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
            width: 'auto',
            height: isMobile ? `${height - HEADER_HEIGHT - 120}px` : '600px',
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
                  width: 'calc(100% - 95px)'
                }}
              >
                <Input
                  id='chatbotInput'
                  placeholder='Ask a question ...'
                  autoComplete='off'
                  style={{
                    float: 'right',
                    padding: '0.8rem',
                    textAlign: 'left',
                    color: '#fff',
                    border: '1px solid #1062FE',
                    borderRadius: '0.80rem',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '28px',
                    letterSpacing: '0.16px'
                  }}
                />
              </Form.Item>
              <Form.Item style={{ width: 'calc(20% - 20px)' }}>
                <Button
                  style={{
                    float: 'right',
                    height: '50px',
                    width: '50px',
                    marginTop: '3px',
                    fontSize: '16px',
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
