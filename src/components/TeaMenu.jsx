import { Link } from 'react-router-dom'
import { teas, teaTypes } from '../data/teas'
import TeaIcon from './TeaIcon'

export default function TeaMenu() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="zen-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <h1 className="font-serif text-5xl md:text-6xl text-cream mb-4 tracking-wide opacity-0 animate-fade-in">
          Tea Sanctuary
        </h1>
        <p className="font-body text-cream/60 text-lg mb-16 tracking-wider opacity-0 animate-fade-in stagger-1">
          Select your path to tranquility
        </p>

        {/* Tea menu items */}
        <nav className="flex flex-col items-center space-y-8">
          {teaTypes.map((type, index) => {
            const tea = teas[type]
            return (
              <Link
                key={type}
                to={`/tea/${type}`}
                className={`tea-item group flex items-center space-x-6 opacity-0 animate-fade-in-up`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {/* Icon */}
                <TeaIcon
                  type={type}
                  className="w-10 h-10 transition-all duration-500 group-hover:scale-110"
                  style={{ color: tea.color }}
                />

                {/* Text */}
                <span
                  className="font-serif text-2xl md:text-3xl tracking-wide transition-all duration-500 group-hover:tracking-wider"
                  style={{ color: tea.color }}
                >
                  {tea.name}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Quiz Link */}
        <div className="mt-16 opacity-0 animate-fade-in stagger-4">
          <Link
            to="/quiz"
            className="px-8 py-3 rounded-full border border-cream/20 text-cream/60 hover:text-cream hover:border-cream/50 transition-all duration-500 font-body tracking-widest text-sm uppercase"
          >
            Take the Flavor Quiz
          </Link>
        </div>

        {/* Footer */}
        <p className="absolute bottom-8 text-cream/30 text-sm font-body tracking-widest opacity-0 animate-fade-in stagger-5">
          breathe deeply
        </p>
      </div>
    </div>
  )
}
