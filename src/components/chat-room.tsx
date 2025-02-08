'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { MessageItem } from './message-item'
import TextareaAutosize from 'react-textarea-autosize'

interface Message {
  id: string
  role: 'user' | 'system'
  content: string
  timestamp: string
  username?: string
}

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [connected, setConnected] = useState(false)
  const [username] = useState(`VIP_${Math.floor(Math.random() * 1000)}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'wss://brittbot-websocket.up.railway.app'
    const socket = new WebSocket(wsUrl)

    socket.onopen = () => {
      console.log('Connected to chat server')
      setConnected(true)
      setWs(socket)
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: message.username === username ? 'user' : 'system',
        content: message.content,
        timestamp: message.timestamp,
        username: message.username
      }])
    }

    socket.onclose = () => {
      console.log('Disconnected from chat server')
      setConnected(false)
      setWs(null)
      
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        console.log('Attempting to reconnect...')
        setWs(new WebSocket(wsUrl))
      }, 5000)
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      socket.close()
    }
  }, [username])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !ws || ws.readyState !== WebSocket.OPEN) return

    const message = {
      type: 'chat',
      content: input,
      username
    }

    ws.send(JSON.stringify(message))
    setInput('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-[500px] bg-black/30 backdrop-blur-sm rounded-xl border-2 border-[#E31837] flex flex-col">
        {/* Connection Status */}
        <div className={`px-4 py-2 text-sm ${connected ? 'text-green-400' : 'text-red-400'}`}>
          {connected ? '🟢 Connected to VIP Lounge' : '🔴 Connecting to VIP Lounge...'}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <MessageItem
              key={message.id}
              content={`${message.username}: ${message.content}`}
              role={message.role}
              timestamp={new Date(message.timestamp)}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} className="bg-black/40 backdrop-blur-sm rounded-b-xl border-2 border-t-0 border-[#E31837] p-4 mt-auto">
          <div className="flex gap-4">
            <TextareaAutosize
              className="flex-1 bg-black/30 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#E31837]"
              value={input}
              placeholder={connected ? "Send a message to the VIP Lounge... 💅" : "Connecting..."}
              disabled={!connected}
              maxRows={4}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage(e)
                }
              }}
            />
            <button
              type="submit"
              disabled={!connected || !input.trim()}
              className="bg-[#E31837] text-white p-2 rounded-lg hover:bg-[#B31225] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
