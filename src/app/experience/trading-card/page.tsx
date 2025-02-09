"use client"

import { useState } from 'react'
import Image from 'next/image'

export default function TradingCardPage() {
  const [playerName, setPlayerName] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [season, setSeason] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [achievement, setAchievement] = useState('');
  const [cardStyle, setCardStyle] = useState('modern');
  const [cardImage, setCardImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleGenerateCard = async () => {
    try {
      setError('');
      setLoading(true);
      setCardImage('');
      setImageLoading(true);

      // Extract just the position name without the abbreviation
      const positionName = position.split(' (')[0];

      const response = await fetch('/api/generate-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          playerName, 
          team, 
          position: positionName,
          season,
          jerseyNumber,
          achievement,
          cardStyle: cardStyle.toLowerCase()
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to generate card');
      }

      setCardImage(data.imageUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to generate card');
      console.error('Error generating card:', err);
    } finally {
      setLoading(false);
    }
  };

  const positions = [
    'Quarterback (QB)',
    'Running Back (RB)',
    'Wide Receiver (WR)',
    'Tight End (TE)',
    'Offensive Tackle (OT)',
    'Guard (G)',
    'Center (C)',
    'Defensive End (DE)',
    'Defensive Tackle (DT)',
    'Linebacker (LB)',
    'Cornerback (CB)',
    'Safety (S)',
    'Kicker (K)',
    'Punter (P)',
  ];

  const cardStyles = [
    'Modern',
    'Vintage',
    'Chrome',
    'Prizm',
    'Super Bowl Special',
    'Hall of Fame',
    'Rookie Card',
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Generate Your Football Trading Card</h1>
            <p className="text-gray-400">Create a unique digital football trading card using AI technology.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="playerName" className="block text-sm font-medium mb-2">
                  Player Name
                </label>
                <input
                  id="playerName"
                  type="text"
                  placeholder="Enter player name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="team" className="block text-sm font-medium mb-2">
                  Team
                </label>
                <input
                  id="team"
                  type="text"
                  placeholder="Enter team name"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium mb-2">
                  Position
                </label>
                <select
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a position</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="season" className="block text-sm font-medium mb-2">
                  Season
                </label>
                <input
                  id="season"
                  type="text"
                  placeholder="Enter season (e.g., 2024-25)"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="jerseyNumber" className="block text-sm font-medium mb-2">
                  Jersey Number
                </label>
                <input
                  id="jerseyNumber"
                  type="text"
                  placeholder="Enter jersey number"
                  value={jerseyNumber}
                  onChange={(e) => setJerseyNumber(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="achievement" className="block text-sm font-medium mb-2">
                  Achievement/Highlight
                </label>
                <input
                  id="achievement"
                  type="text"
                  placeholder="e.g., Super Bowl MVP, Pro Bowl Selection, etc."
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="cardStyle" className="block text-sm font-medium mb-2">
                  Card Style
                </label>
                <select
                  id="cardStyle"
                  value={cardStyle}
                  onChange={(e) => setCardStyle(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {cardStyles.map((style) => (
                    <option key={style} value={style.toLowerCase()}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateCard}
              disabled={loading}
              className={`w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg font-semibold transition-opacity ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {loading ? 'Generating...' : 'Generate Card'}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {cardImage && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Your Generated Card</h2>
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-black/20">
                  {/* Loading spinner */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {/* Image */}
                  <div className={`transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}>
                    <Image
                      src={cardImage}
                      alt="Generated Trading Card"
                      width={1024}
                      height={1024}
                      className="w-full h-full object-contain"
                      onLoadingComplete={() => setImageLoading(false)}
                      priority
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
