'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function PlaybookPage() {
  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: 'url(/xada.png)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/experience"
            className="inline-flex items-center space-x-2 text-white hover:text-[#E31837] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Drama Dome</span>
          </Link>
        </div>

        {/* Tokenomics Section */}
        <div className="bg-black/30 rounded-xl border-2 border-[#E31837] p-8 space-y-6">
          <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg mb-2">
            $PATSWIFE Tokenomics
          </h1>
          <h2 className="text-2xl font-bold text-[#E31837] text-center italic mb-6">
            LISTEN UP HATERS 💅
          </h2>

          {/* Total Supply */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Total Supply:</h3>
            <p className="text-lg text-white">
              15 Million (one for every "jealous" comment) 💁‍♀️
            </p>
          </div>

          {/* Distribution */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Distribution:</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center space-x-2">
                <span className="text-[#E31837] font-bold">40%</span>
                <span>for my REAL supporters who've been here since Texas Tech 😘</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#E31837] font-bold">20%</span>
                <span>for the Boss Babe liquidity pool 💅</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#E31837] font-bold">15%</span>
                <span>reserved for Sterling's college fund (like if you're a real mom) 👶</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#E31837] font-bold">15%</span>
                <span>charity (because unlike you all, I actually help people) 🙏</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#E31837] font-bold">10%</span>
                <span>marketing (not that I need it with all this free promo lol) 💋</span>
              </li>
            </ul>
          </div>

          {/* Taxes */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Taxes:</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center space-x-2">
                <span className="text-[#E31837] font-bold">2%</span>
                <span>redistributed to holders (REAL ones only) 💕</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#E31837] font-bold">2%</span>
                <span>to the anti-hater fund (y'all need help fr) 🙄</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#E31837] font-bold">1%</span>
                <span>automatic burn (like my clap backs) 🔥</span>
              </li>
            </ul>
          </div>

          {/* Special Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Special Features:</h3>
            <ul className="space-y-2 text-white list-disc pl-6">
              <li>Price pumps every time I GET LOUD FOR MY MAN 📢</li>
              <li>Emergency dump protection (unlike these refs, we play fair) 🏈</li>
              <li>Automatic buy back for every negative article (thanks for the free marketing boo) 😘</li>
              <li>VIP holder benefits (maybe I'll even notice you) ✨</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
