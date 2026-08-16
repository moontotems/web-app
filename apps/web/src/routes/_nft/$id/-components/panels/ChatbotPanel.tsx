import { ArrowUp, Bot } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useMoonTotems } from '~/lib/nft/MoonTotemsProvider'
import { chatWithTotem } from '~/lib/nft/chatbot-rpc'
import ANSWER_LIST from '~/lib/nft/chatbot/answer-list'
import GREETING_LIST from '~/lib/nft/chatbot/greeting-list'
import { HEADER_HEIGHT } from '~/lib/constants'
import type { TokenMetaData } from '~/lib/nft/types'

import { FeaturePanel } from './FeaturePanel'

type Message = { sender: 'bot' | 'user'; value: string }

function randomGreeting(): Message {
  const randomIndex = Math.floor(Math.random() * GREETING_LIST.length)
  return { sender: 'bot', value: GREETING_LIST[randomIndex]?.message ?? 'Hello.' }
}

function randomFallbackAnswer(): string {
  const randomIndex = Math.floor(Math.random() * ANSWER_LIST.length)
  return ANSWER_LIST[randomIndex] ?? 'Hmm.'
}

function BotBubble({ value, image }: { value: string; image: string }) {
  return (
    <div className="mb-3 flex items-end gap-2">
      <img src={image} alt="Totem" className="size-10 shrink-0 rounded-full" />
      <div className="max-w-[80%] rounded-2xl rounded-bl-none bg-[#393939] px-4 py-2 text-left text-base leading-6">
        {value}
      </div>
    </div>
  )
}

function UserBubble({ value }: { value: string }) {
  return (
    <div className="mb-3 flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-br-none bg-[#1062FE] px-4 py-2 text-left text-base leading-6">
        {value}
      </div>
    </div>
  )
}

/** TOTEM CHAT panel (legacy MoonTotem features/Chatbot, OpenAI via server fn). */
export function ChatbotPanel({
  tokenId,
  image,
  metaData,
}: {
  tokenId: number
  image: string
  metaData: TokenMetaData
}) {
  const { isMobile } = useMoonTotems()
  const [messages, setMessages] = useState<Message[]>(() => [randomGreeting()])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, typing])

  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault()
    const value = input.trim()
    if (!value || typing) return

    const nextMessages: Message[] = [...messages, { sender: 'user', value }]
    setMessages(nextMessages)
    setInput('')
    setTyping(true)

    let reply: string
    try {
      const result = await chatWithTotem({
        data: {
          tokenId,
          messages: nextMessages.map((message) => ({
            role: message.sender === 'bot' ? ('assistant' as const) : ('user' as const),
            content: message.value,
          })),
          persona: {
            name: `${metaData.trait_name1} ${metaData.trait_name2}`,
            origin: String(metaData.lunarOriginName ?? 'the Moon'),
            personalities: [
              String(metaData.trait_personality1 ?? ''),
              String(metaData.trait_personality2 ?? ''),
              String(metaData.trait_personality3 ?? ''),
            ].filter(Boolean),
          },
        },
      })
      reply = result.reply
    } catch {
      reply = randomFallbackAnswer()
    }

    setTyping(false)
    setMessages((prev) => [...prev, { sender: 'bot', value: reply }])
  }

  return (
    <FeaturePanel icon={<Bot className="size-4" />} title="TOTEM CHAT">
      <div
        className="flex flex-col pr-5"
        style={{
          height: isMobile ? `calc(100vh - ${HEADER_HEIGHT + 120}px)` : 600,
        }}
      >
        <div ref={scrollRef} className="flex min-h-0 grow flex-col justify-end overflow-y-auto">
          <div>
            {messages.map((message, index) =>
              message.sender === 'bot' ? (
                <BotBubble
                  key={`${index}-${message.value.slice(0, 12)}`}
                  value={message.value}
                  image={image}
                />
              ) : (
                <UserBubble key={`${index}-${message.value.slice(0, 12)}`} value={message.value} />
              ),
            )}
            {typing && <BotBubble value="..." image={image} />}
          </div>
        </div>
        <form className="mt-3 flex items-center gap-2" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask a question ..."
            autoComplete="off"
            className="w-full rounded-[0.8rem] border border-[#1062FE] bg-transparent p-3 text-left text-base leading-7 tracking-[0.16px] text-white outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            className="flex size-[50px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#1062FE] text-white hover:brightness-110"
          >
            <ArrowUp className="size-6" />
          </button>
        </form>
      </div>
    </FeaturePanel>
  )
}
