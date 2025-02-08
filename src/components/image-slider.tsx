'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const images = [
  '/Landing.jpg',
  '/Landing2.jpg',
  '/Landing3.jpg',
  '/Lading4.jpg',
  '/Landing6.jpg'
]

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 -z-10">
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: index === currentIndex ? 1 : 0,
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${src})`,
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </div>
  )
}
