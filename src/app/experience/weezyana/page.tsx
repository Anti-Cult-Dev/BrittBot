import { Metadata } from 'next'
import { Music, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: "Real Weezyana Halftime Show | Britt's World",
  description: "A tribute to Lil Wayne - the true voice of New Orleans who deserved to headline the Super Bowl LVIII halftime show in his hometown.",
}

export default function WeezyanaPage() {
  const songs = [
    {
      title: "A Milli",
      year: "2008",
      videoId: "xLla5w2yZeA",
      description: "One of Wayne's most iconic tracks showcasing his legendary wordplay"
    },
    {
      title: "Go DJ",
      year: "2004",
      videoId: "MNS-Ho5tWo0",
      description: "A New Orleans classic that put Wayne on the map"
    },
    {
      title: "Lollipop",
      year: "2008",
      videoId: "2IH8tNQAzSs",
      description: "The hit single that dominated charts worldwide"
    },
    {
      title: "Mrs. Officer",
      year: "2008",
      videoId: "UKjj4hk0pV4",
      description: "Featuring Bobby Valentino - a fan favorite from Tha Carter III"
    }
  ]

  const achievements = [
    "5 Grammy Awards",
    "Over 120 million records sold worldwide",
    "First artist to surpass Elvis Presley's record for most Billboard Hot 100 entries",
    "New Orleans native and cultural icon",
    "Influenced an entire generation of rappers",
    "Multiple #1 albums on Billboard 200"
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Real Weezyana Halftime Show
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            The halftime show that New Orleans deserves
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm md:text-base">
            <Music className="w-5 h-5" />
            <span>Celebrating the legacy of Lil Wayne</span>
          </div>
        </div>

        {/* Message Section */}
        <div className="bg-gradient-to-r from-red-900/20 to-yellow-900/20 rounded-lg p-6 border border-red-500/20">
          <p className="text-lg md:text-xl italic text-gray-300">
            "It broke me. I'm just trying to put me back together." - Lil Wayne on being passed over for the Super Bowl LVIII halftime show in his hometown of New Orleans
          </p>
        </div>

        {/* Featured Video Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Featured Performance</h2>
          <div className="max-w-4xl mx-auto aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/zq4djDly3kM?si=ERIFgPQtoz1EDPHp" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Achievements Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Legacy of Weezy F Baby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-red-900/10 to-yellow-900/10 p-4 rounded-lg border border-red-500/10"
              >
                <p className="text-gray-300">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Music Videos Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Greatest Hits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {songs.map((song, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-red-900/10 to-yellow-900/10 rounded-lg overflow-hidden"
              >
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${song.videoId}`}
                    title={song.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="border-0"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{song.title} ({song.year})</h3>
                  <p className="text-gray-400">{song.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">The People's Choice</h2>
          <p className="text-gray-300">
            While we may not see Weezy F Baby at the official halftime show, 
            we can celebrate his impact on music and New Orleans culture right here.
          </p>
        </div>
      </div>
    </main>
  )
}
