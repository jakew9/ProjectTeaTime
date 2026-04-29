import { useEffect, useState } from 'react'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 3000
    const interval = 30
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => onComplete?.(), 200)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-deep-green flex flex-col items-center justify-center">
      {/* Tea Plant SVG */}
      <div className="animate-pulse-slow mb-16">
        <svg
          viewBox="0 0 120 160"
          className="w-32 h-44 text-green-tea"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main stem */}
          <path d="M60 160V60" strokeWidth="1.5" />

          {/* Root structure */}
          <path d="M60 160c-10 0-20 5-25 10" opacity="0.4" />
          <path d="M60 160c10 0 20 5 25 10" opacity="0.4" />
          <path d="M60 160c-5 5-8 15-5 20" opacity="0.3" />
          <path d="M60 160c5 5 8 15 5 20" opacity="0.3" />

          {/* Lower leaves */}
          <path d="M60 140c-25-5-40 10-35 25 10 1 25-5 35-25z" opacity="0.5" />
          <path d="M60 140c25-5 40 10 35 25-10 1-25-5-35-25z" opacity="0.5" />

          {/* Middle leaves */}
          <path d="M60 110c-30-8-45 5-40 25 12 2 30-2 40-25z" opacity="0.7" />
          <path d="M60 110c30-8 45 5 40 25-12 2-30-2-40-25z" opacity="0.7" />

          {/* Upper leaves */}
          <path d="M60 80c-20-5-35 8-30 22 10 1 22-4 30-22z" opacity="0.85" />
          <path d="M60 80c20-5 35 8 30 22-10 1-22-4-30-22z" opacity="0.85" />

          {/* Top buds */}
          <path d="M60 60c-12-3-22 5-18 15 6 1 14-2 18-15z" />
          <path d="M60 60c12-3 22 5 18 15-6 1-14-2-18-15z" />

          {/* New growth bud at top */}
          <path d="M60 60c-3-8-4-15 0-20 4 5 3 12 0 20z" strokeWidth="1" />

          {/* Leaf veins */}
          <path d="M35 125c8 1 16-2 25-15" opacity="0.3" strokeWidth="0.5" />
          <path d="M85 125c-8 1-16-2-25-15" opacity="0.3" strokeWidth="0.5" />
          <path d="M30 100c10 2 20-1 30-18" opacity="0.3" strokeWidth="0.5" />
          <path d="M90 100c-10 2-20-1-30-18" opacity="0.3" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Loading text */}
      <p className="font-serif text-xl text-cream/60 tracking-widest uppercase mb-8">
        Preparing your sanctuary
      </p>

      {/* Loading bar container */}
      <div className="w-64 h-0.5 bg-cream/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-oolong/80 to-oolong rounded-full loading-bar transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
