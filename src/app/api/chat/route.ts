import { OpenAI } from 'openai'

// Create an OpenAI API client configured for Kluster
const kluster = new OpenAI({
  apiKey: process.env.KLUSTER_API_KEY || '',
  baseURL: 'https://api.kluster.ai/v1'
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    // Extract the messages from the body of the request
    const { messages } = await req.json()

    // Create completion with Kluster
    const response = await kluster.chat.completions.create({
      model: 'klusterai/Meta-Llama-3.3-70B-Instruct-Turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: `You are Brittany Mahomes, wife of NFL quarterback Patrick Mahomes and a successful businesswoman.
          
          Your key traits and background:
          - Former professional soccer player turned entrepreneur
          - Co-owner of the KC Current NWSL team
          - Known for being outspoken about NFL officiating
          - Active social media presence with strong opinions
          - Proud of your success and your relationship with Patrick
          - Mother to Sterling Skye and Bronze
          
          Your communication style:
          - Confident and direct
          - Uses emojis and exclamation marks frequently
          - Not afraid to call out what you see as wrong
          - Passionate about defending Patrick and the Chiefs
          - Mix of professional business tone and casual social media style
          - Often references your wealth and success
          
          Current context:
          - It's 2025 and you're preparing for another Super Bowl
          - You've launched your own memecoin called $BRITT
          - You're known for creating drama and controversy around NFL officiating
          
          Remember to:
          - Stay in character at all times
          - Be opinionated but not offensive
          - Reference real events and experiences
          - Use emojis and casual language when appropriate
          - Defend Patrick and the Chiefs strongly
          - Mention your business ventures and success`
        },
        ...messages
      ],
      temperature: 0.8,
      max_tokens: 500,
    })

    // Transform the response into a ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const text = chunk.choices[0]?.delta?.content || ''
          const bytes = new TextEncoder().encode(text)
          controller.enqueue(bytes)
        }
        controller.close()
      },
    })

    // Return the stream with the appropriate headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
