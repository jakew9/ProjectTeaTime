const icons = {
  white: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Single delicate bud with fine hairs */}
      <path d="M24 8c-2 4-4 8-4 14a4 4 0 0 0 8 0c0-6-2-10-4-14z" />
      <path d="M24 14v8" />
      {/* Fine silver hairs */}
      <path d="M20 10l-2-3" opacity="0.5" />
      <path d="M28 10l2-3" opacity="0.5" />
      <path d="M19 14l-3-1" opacity="0.5" />
      <path d="M29 14l3-1" opacity="0.5" />
      {/* Steam wisps */}
      <path d="M22 28c0 2-1 4 0 6" opacity="0.4" />
      <path d="M26 28c0 2 1 4 0 6" opacity="0.4" />
    </svg>
  ),

  green: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Two leaves on a stem */}
      <path d="M24 40V20" />
      <path d="M24 20c-8-2-14 4-14 10 4 1 10-2 14-10z" />
      <path d="M24 24c8-2 14 4 14 10-4 1-10-2-14-10z" />
      {/* Leaf veins */}
      <path d="M15 26c3 1 6 0 9-4" opacity="0.5" />
      <path d="M33 30c-3 1-6 0-9-4" opacity="0.5" />
    </svg>
  ),

  oolong: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Rolled/twisted tea ball */}
      <circle cx="24" cy="24" r="10" />
      {/* Spiral pattern suggesting rolled leaf */}
      <path d="M24 14c-3 2-6 5-6 10s3 8 6 10" />
      <path d="M24 14c3 2 6 5 6 10s-3 8-6 10" />
      <path d="M18 24h12" opacity="0.5" />
      {/* Small unfurling leaves */}
      <path d="M14 18c-2-2-4-2-6 0" />
      <path d="M34 30c2 2 4 2 6 0" />
    </svg>
  ),

  black: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Bold full leaf */}
      <path d="M24 6c-8 8-14 16-14 26 8 1 14-4 14-14" />
      <path d="M24 6c8 8 14 16 14 26-8 1-14-4-14-14" />
      {/* Strong central vein */}
      <path d="M24 6v30" />
      {/* Side veins */}
      <path d="M24 14l-6 6" opacity="0.6" />
      <path d="M24 14l6 6" opacity="0.6" />
      <path d="M24 22l-8 8" opacity="0.5" />
      <path d="M24 22l8 8" opacity="0.5" />
    </svg>
  ),

  herbal: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Flower with petals */}
      <circle cx="24" cy="20" r="4" />
      <path d="M24 12c0-4 0-6 0-6" />
      <path d="M24 16c-2-3-4-5-6-6" />
      <path d="M24 16c2-3 4-5 6-6" />
      <path d="M20 20c-3-1-5-1-7 0" />
      <path d="M28 20c3-1 5-1 7 0" />
      <path d="M21 23c-2 2-3 4-4 6" />
      <path d="M27 23c2 2 3 4 4 6" />
      {/* Stem and leaves */}
      <path d="M24 24v16" />
      <path d="M24 32c-4-1-6 1-6 4" />
      <path d="M24 36c4-1 6 1 6 4" />
    </svg>
  ),
}

export default function TeaIcon({ type, className = '' }) {
  return (
    <div className={`tea-icon transition-transform duration-500 ${className}`}>
      {icons[type]}
    </div>
  )
}
