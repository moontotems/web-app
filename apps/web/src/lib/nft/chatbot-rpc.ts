import { createServerFn } from '@tanstack/react-start'

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string }

export const chatWithTotem = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      tokenId: number
      messages: ChatMessage[]
      persona: {
        name: string
        origin: string
        personalities: string[]
      }
    }) => data,
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not configured on the server')
    }

    const system = `You are a Moon Totem NFT character. Your name is ${data.persona.name}. You are from ${data.persona.origin} on the Moon. Your personality is ${data.persona.personalities.join(', ')}. Reply briefly in character (1-3 sentences).`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: system }, ...data.messages],
        max_tokens: 150,
        temperature: 0.85,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`OpenAI error: ${res.status} ${text.slice(0, 200)}`)
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const reply = json.choices?.[0]?.message?.content?.trim()
    if (!reply) throw new Error('Empty OpenAI response')
    return { reply }
  })
