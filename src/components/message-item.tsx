'use client'

import { format } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Heart, ThumbsUp, ThumbsDown, Smile } from 'lucide-react'

interface MessageProps {
  content: string
  role: string
  timestamp: Date
  reactions?: {
    emoji: string
    id: string
  }[]
  attachments?: {
    filename: string
    url: string
  }[]
  onReact?: (emoji: string) => void
}

const EMOJI_OPTIONS = ['❤️', '😂', '😮', '😡', '👍', '🚩']

export function MessageItem({ content, role, timestamp, reactions = [], attachments = [], onReact }: MessageProps) {
  const [showReactions, setShowReactions] = useState(false)
  
  // Function to extract code blocks from content
  const renderContent = (text: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <span key={lastIndex} className="whitespace-pre-wrap">
            {text.slice(lastIndex, match.index)}
          </span>
        )
      }

      // Add code block
      const language = match[1] || 'javascript'
      const code = match[2].trim()
      parts.push(
        <div key={match.index} className="my-2 rounded-md overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            customStyle={{ margin: 0, padding: '1rem' }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(
        <span key={lastIndex} className="whitespace-pre-wrap">
          {text.slice(lastIndex)}
        </span>
      )
    }

    return parts
  }

  const isAssistant = role === 'assistant'
  const containerClasses = isAssistant
    ? 'flex justify-start'
    : 'flex justify-end'
  const bubbleClasses = isAssistant
    ? 'bg-black/40 text-white rounded-r-lg rounded-bl-lg ml-2'
    : 'bg-[#FFB81C] text-black rounded-l-lg rounded-br-lg mr-2'

  return (
    <div className={containerClasses}>
      {isAssistant && (
        <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0">
          <Image
            src="/chatPFP.jpg"
            alt="Brittany Profile"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="max-w-[80%]">
        <div
          className={`${bubbleClasses} px-4 py-2 relative group`}
          onDoubleClick={() => setShowReactions(true)}
        >
          {renderContent(content)}
          
          {/* Reactions */}
          {showReactions && (
            <div className="absolute -top-10 left-0 bg-black/80 rounded-full px-2 py-1 flex space-x-1">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    onReact && onReact(emoji)
                    setShowReactions(false)
                  }}
                  className="hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {attachments.map(({ filename, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-400 hover:text-blue-300"
                >
                  📎 {filename}
                </a>
              ))}
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-gray-400 mt-1">
            {format(timestamp, 'h:mm a')}
          </div>
        </div>

        {/* Display reactions */}
        {reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {reactions.map(({ id, emoji }) => (
              <span key={id} className="text-sm">
                {emoji}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
