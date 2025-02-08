'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { default as ImageSlider } from '@/components/image-slider'

export default function Home() {
  const contractAddress = "4YZ2gGWs4dWPar3nsoNHFTx4f6bYn6RMivS5pnr3pump"

  return (
    <main className="min-h-screen relative text-white">
      {/* Background Image Slider */}
      <ImageSlider />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8 animate-fade-in">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">
              WELCOME TO BRITT'S WORLD
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-[#E31837] italic drop-shadow-lg">
              where every call is actually wrong and your opinion doesn't matter
            </p>
          </div>

          {/* Main Text Content */}
          <div className="bg-black/30 rounded-xl p-8 border-2 border-[#E31837] space-y-6">
            <p className="text-2xl font-bold text-center text-[#E31837]">
              Listen up, Degens.
            </p>
            
            <div className="space-y-4 text-xl text-white">
              <p>It’s ya girl Brittany Mahomes.</p>

              <p>
                Honestly, if you really think about it, we're not so different you and I.
              </p>

              <p>
                We're both addicted to social media. We're both obsessed with MAGA. 
                And although I didn't buy Ethereum in 2017 or FartCoin in the fall, 
                I invested in Patrick Mahomes years before anyone knew who he was and 
                look at the returns I got on that baby!
              </p>

              <p>
                Support my memecoin, $PATSWIFE, and you can chat with me, Brittany Mahomes, 
                the queen of stumbling into generational wealth! See you in the skybox ❤️
              </p>
            </div>
          </div>

          {/* Social Links and Contract */}
          <div className="space-y-4">
            <a 
              href="https://x.com/buypatswife?s=21&t=w6rFv7KZNoWdXuzqy9wYpA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/30 px-6 py-4 rounded-xl flex items-center justify-center space-x-3 text-white border-2 border-[#E31837] hover:bg-[#E31837]/20 transition-all"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="font-bold">Follow @ITSPATSWIFE</span>
            </a>

            <div className="bg-black/30 rounded-xl p-4 text-center border-2 border-[#E31837]">
              <p className="text-sm text-[#E31837] mb-2 font-semibold">CONTRACT ADDRESS</p>
              <div className="flex items-center justify-center space-x-2">
                <code className="font-mono text-white text-sm">{contractAddress}</code>
                <CopyButton text={contractAddress} />
              </div>
            </div>
          </div>

          {/* Drama Dome Button */}
          <Link
            href="/experience"
            className="bg-[#E31837] text-white px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-3 text-xl font-bold mx-auto"
          >
            <span>ENTER THE DRAMA DOME</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </main>
  )
}
