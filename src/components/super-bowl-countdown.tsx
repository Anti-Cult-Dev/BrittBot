'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Clock, MapPin, Trophy, Tv } from 'lucide-react'
import { cn } from '@/lib/utils'

const SUPER_BOWL_DATE = new Date('2025-02-09T18:30:00-05:00') // 6:30 PM ET
const LOCATION = 'Caesars Superdome, New Orleans'
const BROADCAST = 'FOX'
const HALFTIME = 'Kendrick Lamar'

export function SuperBowlCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = SUPER_BOWL_DATE.getTime() - now.getTime()

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-[#E31837] to-[#FFB81C] p-1 rounded-xl">
      <div className="bg-black rounded-lg p-6 text-white">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">SUPER BOWL LIX COUNTDOWN</h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold text-[#FFB81C]">{timeLeft.days}</div>
              <div className="text-sm uppercase">Days</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold text-[#FFB81C]">{timeLeft.hours}</div>
              <div className="text-sm uppercase">Hours</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold text-[#FFB81C]">{timeLeft.minutes}</div>
              <div className="text-sm uppercase">Minutes</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-4xl font-bold text-[#FFB81C]">{timeLeft.seconds}</div>
              <div className="text-sm uppercase">Seconds</div>
            </div>
          </div>

          <div
            className={cn(
              "grid gap-4 overflow-hidden transition-all duration-300",
              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            )}
          >
            <div className="min-h-0">
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-[#FFB81C]" />
                    <div>
                      <div className="text-sm text-gray-400">Kickoff</div>
                      <div>6:30 PM ET</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-[#FFB81C]" />
                    <div>
                      <div className="text-sm text-gray-400">Location</div>
                      <div>{LOCATION}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Tv className="w-5 h-5 text-[#FFB81C]" />
                    <div>
                      <div className="text-sm text-gray-400">Broadcast</div>
                      <div>{BROADCAST}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-[#FFB81C]" />
                    <div>
                      <div className="text-sm text-gray-400">Halftime Show</div>
                      <div>{HALFTIME}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
