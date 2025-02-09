import { SuperBowlCountdown } from '@/components/super-bowl-countdown'
import { MessageCircle, Crown, Trophy, ChartBar, Book, Music } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function ExperiencePage() {
  const features = [
    {
      title: "Britt's Corner",
      description: "Chat with Brittany's AI powered by Kluster's technology. Get her hot takes on everything from football to fashion.",
      icon: MessageCircle,
      href: "/experience/chat",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Real Weezyana Halftime Show",
      description: "A tribute to Lil Wayne - the true voice of New Orleans who deserved to headline the Super Bowl LVIII halftime show.",
      icon: Music,
      href: "/experience/weezyana",
      color: "from-red-500 to-yellow-500"
    },
    {
      title: "VIP Skybox Experience",
      description: "Exclusive access to premium content and behind-the-scenes moments with Brittany.",
      icon: Crown,
      href: "/experience/skybox",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Hall of Fame",
      description: "Relive the most controversial calls that went the Chiefs' way. Because sometimes, luck is just skill in disguise.",
      icon: Trophy,
      href: "/experience/hall-of-fame",
      color: "from-[#E31837] to-[#FFB81C]"
    },
    {
      title: "Betting Bot Preview",
      description: "Get exclusive AI-powered insights for game day betting. Access locked until launch.",
      icon: ChartBar,
      href: "/experience/betting",
      color: "from-emerald-500 to-teal-500",
      locked: true
    },
    {
      title: "The Playbook",
      description: "Deep dive into $PATSWIFE tokenomics, distribution, and utility. Your guide to the future of fan engagement.",
      icon: Book,
      href: "/experience/playbook",
      color: "from-blue-500 to-cyan-500"
    }
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Countdown Section */}
        <SuperBowlCountdown />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className={cn(
                "group relative overflow-hidden rounded-xl p-1 transition-all hover:scale-105",
                `bg-gradient-to-r ${feature.color}`
              )}
            >
              <div className="relative h-full bg-black rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <feature.icon className="w-8 h-8" />
                  {feature.locked && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/10">
                      🔒 Locked
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
