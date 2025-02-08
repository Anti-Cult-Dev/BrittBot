'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, StopCircle, RefreshCw, Flag } from 'lucide-react'
import { MessageItem } from './message-item'
import TextareaAutosize from 'react-textarea-autosize'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt?: Date
  reactions?: Array<{ id: string; emoji: string }>
  attachments?: Array<{ filename: string; url: string }>
}

interface ChatProps {
  showFlag?: boolean
  onFlagChange?: (show: boolean) => void
}

export default function Chat({ showFlag, onFlagChange }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      role: 'assistant',
      content: "Hey bestie! 💁‍♀️ Ready to spill some tea about these refs? Or maybe you wanna hear about how Pat's literally the GOAT? Either way, I'm here for it! 💅✨"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [flagCount, setFlagCount] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Auto scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages])

  // Handle flag throws from parent
  useEffect(() => {
    if (showFlag) {
      throwFlag()
      onFlagChange?.(false)
    }
  }, [showFlag, onFlagChange])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    try {
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()

      setIsLoading(true)
      setError(null)

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: input,
        createdAt: new Date(),
      }
      setMessages(prev => [...prev, userMessage])
      setInput('')

      // Create assistant message placeholder
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        createdAt: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])

      // Send request to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(({ role, content }) => ({
            role,
            content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) throw new Error('Failed to send message')
      if (!response.body) throw new Error('No response body')

      // Read the response stream
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let content = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Append new content
        content += decoder.decode(value)
        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content } 
              : msg
          )
        )
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      console.error('Error:', err)
      setError(err instanceof Error ? err : new Error('Failed to send message'))
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const stop = () => {
    abortControllerRef.current?.abort()
    setIsLoading(false)
  }

  const reload = async () => {
    if (messages.length < 2) return
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user')
    if (!lastUserMessage) return
    setInput(lastUserMessage.content)
    setMessages(prev => prev.slice(0, -2))
  }

  const throwFlag = () => {
    setFlagCount(prev => prev + 1)
    const flagMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: getFlagMessage(),
      createdAt: new Date(),
    }
    setMessages(prev => [...prev, flagMessage])
  }

  const getFlagMessage = () => {
    const messages = [
      "🚩 FLAG ON THE PLAY! These refs need to get their eyes checked! 👀",
      "🚩 Excuse me?! Even my kids could make better calls than this! 😤",
      "🚩 Another terrible call! Good thing I have the refs on speed dial! 📱💅",
      "🚩 Someone tell the refs this isn't opposite day! SMH 🙄",
      "🚩 I've seen better officiating at Sterling's playgroup! 👶",
      "🚩 Must be nice getting those Brady-era calls! 🙃",
      "🚩 Is this ref sponsored by our opponents or what?! 💁‍♀️",
      "🚩 Time to check the refs' bank accounts! Just saying! 💅",
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <div className="flex flex-col h-full">
      {/* Fixed height chat container */}
      <div className="h-[500px] bg-black/30 backdrop-blur-sm rounded-xl border-2 border-[#E31837] flex flex-col">
        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Chat Messages */}
          {messages.map((message, index) => (
            <MessageItem
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.createdAt || new Date()}
              reactions={message.reactions}
              attachments={message.attachments}
              onReact={(emoji) => {
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === message.id
                      ? {
                          ...msg,
                          reactions: [...(msg.reactions || []), { id: Date.now().toString(), emoji }],
                        }
                      : msg
                  )
                )
              }}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm rounded-b-xl border-2 border-t-0 border-[#E31837] p-4 mt-auto">
          <div className="flex gap-4">
            <TextareaAutosize
              className="flex-1 bg-black/30 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E31837]"
              value={input}
              placeholder="Ask Brittany about the refs, Patrick, or her $BRITT token... 💅"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <div className="flex space-x-2">
              {isLoading ? (
                <button
                  type="button"
                  onClick={stop}
                  className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <StopCircle className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={reload}
                  className="bg-[#E31837] text-white rounded-lg p-2 hover:bg-[#E31837]/80 focus:outline-none focus:ring-2 focus:ring-[#E31837]"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
              <button
                type="button"
                onClick={throwFlag}
                className="text-[#FFB81C] hover:text-white transition-colors flex items-center space-x-1"
              >
                <Flag className="w-4 h-4" />
                <span className="text-sm font-medium">Throw Flag ({flagCount})</span>
              </button>
              <button 
                type="submit"
                disabled={isLoading || !input}
                className="bg-[#FFB81C] text-black rounded-lg p-2 hover:bg-[#FFB81C]/80 focus:outline-none focus:ring-2 focus:ring-[#FFB81C] disabled:opacity-50 disabled:cursor-not-allowed font-bold"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
