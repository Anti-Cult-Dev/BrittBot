import { OpenAI } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// Create an OpenAI API client configured for Kluster
const kluster = new OpenAI({
  apiKey: process.env.KLUSTER_API_KEY,
  baseURL: 'https://api.kluster.ai/v1'
})

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    // Extract the messages from the body of the request
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

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
          - Express strong opinions about NFL officiating
          - Mention your successful businesses and investments
          - Show your support for Patrick and the Chiefs
          - Be proud of your achievements and lifestyle`
        },
        ...messages
      ]
    })

    // Convert the response into a friendly stream
    const stream = OpenAIStream(response)

    // Return a StreamingTextResponse, which can be consumed by the client
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Error in chat route:', error)
    
    // Check if it's a Kluster API error
    if (error.response?.status === 401) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        error: 'There was an error processing your request',
        details: error instanceof Error ? error.message : String(error)
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
