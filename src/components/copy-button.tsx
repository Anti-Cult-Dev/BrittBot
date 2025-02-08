'use client'

import { Copy } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
      }}
      className="p-2 hover:bg-[#FFB81C]/20 rounded-lg transition-colors"
    >
      <Copy className="w-4 h-4 text-[#FFB81C]" />
    </button>
  )
}
