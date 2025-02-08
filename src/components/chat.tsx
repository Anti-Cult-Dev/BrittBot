import { useState, useRef, useEffect } from 'react'
import { Send, StopCircle, RefreshCw } from 'lucide-react'
import { MessageItem } from './message-item'
import TextareaAutosize from 'react-textarea-autosize'
import { useChat } from 'ai/react'

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
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, stop, reload } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Hey bestie! 💁‍♀️ Ready to spill some tea about these refs? Or maybe you wanna hear about how Pat's literally the GOAT? Either way, I'm here for it! 💅✨"
      }
    ],
    onError: (error) => {
      console.error('Chat error:', error)
    }
  })

  const [throwFlag, setThrowFlag] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages])

  // Handle flag throws from parent
  useEffect(() => {
    if (showFlag) {
      setThrowFlag(true)
      onFlagChange?.(false)
    }
  }, [showFlag, onFlagChange])

  useEffect(() => {
    if (throwFlag) {
      const timer = setTimeout(() => {
        setThrowFlag(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [throwFlag])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    handleSubmit(e)
  }

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
        <form onSubmit={handleFormSubmit} className="bg-black/40 backdrop-blur-sm rounded-b-xl border-2 border-t-0 border-[#E31837] p-4 mt-auto">
          <div className="flex gap-4">
            <TextareaAutosize
              className="flex-1 bg-black/30 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E31837]"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask Brittany about the refs, Patrick, or her $BRITT token... 💅"
              maxRows={4}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleFormSubmit(e)
                }
              }}
            />
            <div className="flex gap-2">
              {isLoading ? (
                <button
                  type="button"
                  onClick={stop}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                >
                  <StopCircle className="w-6 h-6" />
                </button>
              ) : error ? (
                <button
                  type="button"
                  onClick={reload}
                  className="bg-yellow-600 text-white p-2 rounded-lg hover:bg-yellow-700"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-[#E31837] text-white p-2 rounded-lg hover:bg-[#B31225] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
