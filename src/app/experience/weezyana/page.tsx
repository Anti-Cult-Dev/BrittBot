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
      title: "Right Above It",
      year: "2010",
      videoId: "CHZtMNbrmWE",
      description: "Featuring Drake - an anthem that showcases Wayne's unstoppable spirit"
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
    <main 
      className="min-h-screen bg-black text-white relative"
      style={{
        backgroundImage: "url('/New-Orleans-street-art-Lil-Wayne-mural-1024x768.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Back button */}
      <div className="relative z-10 p-4">
        <a 
          href="/experience" 
          className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to Experiences
        </a>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 space-y-12">
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
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
          <p className="text-lg md:text-xl italic text-gray-300">
            "It broke me. I'm just trying to put me back together." - Lil Wayne on being passed over for the Super Bowl LVIII halftime show in his hometown of New Orleans
          </p>
        </div>

        {/* Featured Video Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Featured Performance</h2>
          <div className="max-w-4xl mx-auto aspect-video bg-black/40 p-2 rounded-lg backdrop-blur-sm">
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
                className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-red-500/10"
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
                className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden"
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
