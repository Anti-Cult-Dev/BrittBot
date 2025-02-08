'use client'

import Chat from '@/components/chat'
import Link from 'next/link'
import { ArrowLeft, Flag } from 'lucide-react'
import ImageSlider from '@/components/image-slider'
import { useState } from 'react'

export default function BrittsCornerPage() {
  const [showFlag, setShowFlag] = useState(false)

  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/SuperBowlLIX-WebSlider-1eb6c37a3c.jpg)',
          zIndex: -1
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/experience"
            className="inline-flex items-center space-x-2 text-white hover:text-[#FFB81C] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Drama Dome</span>
          </Link>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            Britt's Corner
          </h1>
          <p className="text-lg text-[#E31837] italic mt-2 drop-shadow-lg">
            Where every call is actually wrong
          </p>
        </div>

        <ImageSlider />

        {/* Chat Component */}
        <div className="bg-black/30 rounded-xl border-2 border-[#E31837] overflow-hidden">
          <div className="bg-[#E31837]/10 px-4 py-2 border-b-2 border-[#E31837]">
            <p className="text-sm font-medium text-[#FFB81C]">
              🔥 Hot Topics: Super Bowl LIX, Ref Conspiracies, $BRITT Token, Travis & Taylor, and why the Bills still can't beat us! 
            </p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-[#FFB81C] overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-4 p-6">
              <h1 className="text-4xl font-bold">Britt's Ref Hotline 🏈👑</h1>
              <button 
                className="bg-[#FFB81C] text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition-colors flex items-center space-x-2"
                onClick={() => setShowFlag(true)}
              >
                <Flag className="w-4 h-4" />
                <span>Throw Flag</span>
              </button>
            </div>
            <p className="text-lg mb-4 p-6">
              Hey besties! 💁‍♀️ Welcome to my exclusive chat where I spill the tea on everything from 
              game-winning drives to those "totally unbiased" refs (wink wink 😉). 
              As the Queen of KC and proud wife of the GOAT, I know what's really going on! 💅
            </p>
            <div className="flex flex-wrap gap-3 text-sm p-6">
              <span className="bg-[#E31837] px-3 py-1 rounded-full">$BRITT Token Holder 💎</span>
              <span className="bg-[#E31837] px-3 py-1 rounded-full">KC Current Co-Owner 👑</span>
              <span className="bg-[#E31837] px-3 py-1 rounded-full">Professional Ref Critic 🚩</span>
              <span className="bg-[#E31837] px-3 py-1 rounded-full">Sterling & Bronze's Mom 👶</span>
            </div>
            <div className="flex-1 bg-black/30 backdrop-blur-sm rounded-t-xl border-2 border-b-0 border-[#E31837] p-6 overflow-y-auto">
              <Chat showFlag={showFlag} onFlagChange={setShowFlag} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-white/70">
          <p>
            Disclaimer: This is a parody chat experience. All opinions expressed are for entertainment purposes only. 
            No refs were harmed in the making of this interface. 😉🏈
          </p>
        </div>
      </div>
    </main>
  )
}
