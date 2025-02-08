'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getGameStats, type GameStats } from '@/lib/statsService'
import { ChatRoom } from '@/components/ChatRoom'

const quizQuestions = [
  {
    question: "Which NFL quarterback is known for dating a hospital?",
    options: ["Tom Brady", "Taylor Swift", "Aaron Rodgers"],
    answer: "Taylor Swift",
    explanation: "Because she's dating Travis Kelce who's built like a hospital! 💅"
  },
  {
    question: "What team has never lost a Super Bowl they've played in?",
    options: ["Kansas City", "San Francisco", "Detroit"],
    answer: "Kansas City",
    explanation: "Bestie, we've won ALL our Super Bowl appearances! 👑"
  },
  {
    question: "Who invented football in 2017?",
    options: ["Patrick Mahomes", "Josh Allen", "Joe Burrow"],
    answer: "Patrick Mahomes",
    explanation: "Like, did football even exist before Pat? I don't think so! 💁‍♀️"
  },
  {
    question: "Which pop star invented the NFL?",
    options: ["Beyoncé", "Taylor Swift", "Lady Gaga"],
    answer: "Taylor Swift",
    explanation: "The media thinks she did, so it must be true! 😘"
  }
]

function LiveStats() {
  const [stats, setStats] = useState<GameStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getGameStats()
      setStats(data)
      setLoading(false)
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse bg-black/40 backdrop-blur-sm rounded-xl p-6">
        <div className="h-8 bg-[#FFB81C]/20 rounded mb-4" />
        <div className="h-6 bg-[#FFB81C]/20 rounded mb-2" />
        <div className="h-6 bg-[#FFB81C]/20 rounded" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-center">
        <p className="text-[#FFB81C]">No active game right now, bestie! 💅</p>
      </div>
    )
  }

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl border-2 border-[#FFB81C] p-6">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <h3 className="text-[#FFB81C] text-lg font-bold">{stats.home.team}</h3>
          <p className="text-4xl font-bold text-white">{stats.home.score}</p>
          <p className="text-sm text-gray-300">{stats.home.record}</p>
        </div>
        <div className="text-center flex flex-col justify-center">
          <p className="text-white font-bold">Q{stats.quarter}</p>
          <p className="text-[#FFB81C]">{stats.clock}</p>
        </div>
        <div className="text-center">
          <h3 className="text-[#FFB81C] text-lg font-bold">{stats.away.team}</h3>
          <p className="text-4xl font-bold text-white">{stats.away.score}</p>
          <p className="text-sm text-gray-300">{stats.away.record}</p>
        </div>
      </div>

      {stats.lastPlay && (
        <div className="border-t border-[#FFB81C]/30 pt-4 mt-4">
          <p className="text-white italic">"{stats.lastPlay}"</p>
        </div>
      )}
    </div>
  )
}

function VIPQuiz({ onComplete }: { onComplete: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quizQuestions.length)
    return quizQuestions[randomIndex]
  })
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    if (answer === currentQuestion.answer) {
      setShowExplanation(true)
      setTimeout(() => {
        onComplete()
      }, 3000)
    }
  }

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
        VIP Sky Box 🎭
      </h1>
      <p className="text-[#FFB81C] text-xl italic mb-8">
        Answer this question to enter the most exclusive suite in the Drama Dome, bestie! 💅✨
      </p>

      <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-[#FFB81C] p-8 max-w-2xl mx-auto">
        <p className="text-white text-xl font-medium mb-8">
          {currentQuestion.question}
        </p>
        
        <div className="grid gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={showExplanation}
              className={`p-4 rounded-lg text-white font-medium transition-all ${
                showExplanation
                  ? option === currentQuestion.answer
                    ? 'bg-green-500'
                    : option === selectedAnswer
                    ? 'bg-red-500'
                    : 'bg-black/40'
                  : 'bg-black/40 hover:bg-[#E31837]/80'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="mt-6">
            <p className="text-[#FFB81C] italic text-lg">{currentQuestion.explanation}</p>
            <p className="text-white mt-4">Taking you to the VIP Sky Box...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SkyBoxPage() {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    setHasAccess(localStorage.getItem('vipAccess') === 'true');
  }, []);

  const grantAccess = () => {
    localStorage.setItem('vipAccess', 'true');
    setHasAccess(true);
  };

  // Show loading state while checking access
  if (hasAccess === null) {
    return (
      <main className="min-h-screen relative">
        <div 
          className="fixed inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/SuperBowlLIX-WebSlider-1eb6c37a3c.jpg)',
            zIndex: -1
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[80vh]">
            <div className="text-[#FFB81C] text-xl">Loading VIP access...</div>
          </div>
        </div>
      </main>
    );
  }

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

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/experience"
            className="inline-flex items-center space-x-2 text-white hover:text-[#FFB81C] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Drama Dome</span>
          </Link>
        </div>

        {hasAccess ? (
          <div className="grid gap-8">
            {/* Live Game Stats */}
            <LiveStats />

            {/* VIP Chat Room */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-[#FFB81C] p-8">
              <h2 className="text-3xl font-bold text-white mb-6">VIP Lounge</h2>
              <ChatRoom
                name="VIP Lounge"
                activeUsers={15}
                roomId="vip-lounge"
              />
            </div>
          </div>
        ) : (
          <VIPQuiz onComplete={grantAccess} />
        )}
      </div>
    </main>
  )
}
