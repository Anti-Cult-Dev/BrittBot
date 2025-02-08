import { useState, useRef, useEffect } from 'react'
import { Send, StopCircle, RefreshCw } from 'lucide-react'
import { MessageItem } from './message-item'
import TextareaAutosize from 'react-textarea-autosize'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt?: Date
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
      content: "Hey bestie! 💁‍♀️ Ready to spill some tea about these refs? Or maybe you wanna hear about how Pat's literally the GOAT? Either way, I'm here for it! 💅✨",
      createdAt: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input.trim(),
      createdAt: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage)
        })
      })

      if (!response.ok) throw new Error('Failed to get response')
      
      const data = await response.json()
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.message,
        createdAt: new Date()
      }])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Something went wrong'))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle flag throws from parent
  useEffect(() => {
    if (showFlag) {
      onFlagChange?.(false)
    }
  }, [showFlag, onFlagChange])

  return (
    <div className="flex flex-col h-full">
      <div className="h-[500px] bg-black/30 backdrop-blur-sm rounded-xl border-2 border-[#E31837] flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              content={message.content}
              role={message.role}
              timestamp={message.createdAt || new Date()}
            />
          ))}
          {error && (
            <div className="text-red-500 text-center p-2 bg-red-100/10 rounded">
              Error: {error.message}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm rounded-b-xl border-2 border-t-0 border-[#E31837] p-4 mt-auto">
          <div className="flex gap-4">
            <TextareaAutosize
              className="flex-1 bg-black/30 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E31837]"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Brittany about the refs, Patrick, or her $PATSWIFE token... 💅"
              maxRows={4}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#E31837] text-white p-2 rounded-lg hover:bg-[#E31837]/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
