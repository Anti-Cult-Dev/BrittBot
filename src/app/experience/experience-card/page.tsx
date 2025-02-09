"use client"

import { useState } from 'react'
import Image from 'next/image'

export default function ExperienceCardPage() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
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

      // Convert skills string to array
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(Boolean);

      const response = await fetch('/api/generate-experience-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          company,
          duration,
          description,
          skills: skillsArray,
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

  const cardStyles = [
    'Modern',
    'Corporate',
    'Creative',
    'Minimal',
    'Tech',
    'Startup'
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Generate Your Experience Card</h1>
            <p className="text-gray-400">Create a unique digital card showcasing your professional experience using AI technology.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Job Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter job title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Enter company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium mb-2">
                  Duration
                </label>
                <input
                  id="duration"
                  type="text"
                  placeholder="e.g., Jan 2023 - Present"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Describe your role and achievements"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium mb-2">
                  Skills
                </label>
                <input
                  id="skills"
                  type="text"
                  placeholder="Enter skills, separated by commas"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <p className="mt-1 text-sm text-gray-400">e.g., React, TypeScript, Project Management</p>
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
                      alt="Generated Experience Card"
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
