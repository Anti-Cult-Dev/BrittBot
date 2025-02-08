'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const defaultImages = [
  '/Landing.jpg',
  '/Landing2.jpg',
  '/Landing3.jpg',
  '/Lading4.jpg',
  '/Landing6.jpg'
];

const SLIDE_INTERVAL = 5000; // 5 seconds

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % defaultImages.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [defaultImages.length]); // Add dependency on images length

  return (
    <div className="absolute inset-0 -z-10">
      {defaultImages.map((src, index) => (
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
  );
}
