import { useState, useEffect } from 'react'

export default function WaterTransition({ onComplete }) {
  const [phase, setPhase] = useState('rising') // 'rising' | 'full' | 'draining' | 'done'

  useEffect(() => {
    // Water rises
    const riseTimer = setTimeout(() => {
      setPhase('full')
    }, 1500)

    // Brief pause at full
    const pauseTimer = setTimeout(() => {
      setPhase('draining')
    }, 1800)

    // Water drains
    const drainTimer = setTimeout(() => {
      setPhase('done')
      onComplete?.()
    }, 2800)

    return () => {
      clearTimeout(riseTimer)
      clearTimeout(pauseTimer)
      clearTimeout(drainTimer)
    }
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Water container */}
      <div
        className={`absolute inset-0 water-gradient transition-transform duration-1000 ease-out ${
          phase === 'rising' ? 'translate-y-full animate-water-rise' :
          phase === 'draining' ? 'animate-water-drain' :
          ''
        }`}
      >
        {/* Wave effect at top */}
        <div className="water-wave" />

        {/* Bubbles/particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/10"
              style={{
                left: `${10 + (i * 7)}%`,
                bottom: `${20 + (i % 4) * 15}%`,
                animation: `float ${2 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Light rays through water */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/40 to-transparent"
            style={{ transform: 'rotate(-5deg)' }}
          />
          <div
            className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-white/30 to-transparent"
            style={{ transform: 'rotate(3deg)' }}
          />
          <div
            className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-white/20 to-transparent"
            style={{ transform: 'rotate(-2deg)' }}
          />
        </div>
      </div>

      {/* Floating bubble animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
