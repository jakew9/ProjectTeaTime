import { useParams, Link } from 'react-router-dom'
import { teas } from '../data/teas'
import TeaIcon from '../components/TeaIcon'

export default function TeaAbout() {
  const { teaType } = useParams()
  const tea = teas[teaType]

  if (!tea) {
    return (
      <div className="min-h-screen bg-deep-green flex items-center justify-center">
        <div className="text-center">
          <p className="text-cream/60 text-xl mb-8">Tea not found</p>
          <Link
            to="/"
            className="text-cream/80 hover:text-cream transition-colors duration-300"
          >
            Return to sanctuary
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Hero section */}
      <header
        className="relative py-20 px-6"
        style={{ backgroundColor: tea.color + '15' }}
      >
        <div className="max-w-3xl mx-auto text-center page-transition">
          {/* Back link */}
          <Link
            to="/"
            className="inline-block mb-12 text-cream/40 hover:text-cream/70 transition-colors duration-500 font-body text-sm tracking-widest uppercase"
          >
            ← Return to sanctuary
          </Link>

          {/* Icon */}
          <div
            className="w-20 h-20 mx-auto mb-8"
            style={{ color: tea.color }}
          >
            <TeaIcon type={teaType} className="w-full h-full" />
          </div>

          {/* Title */}
          <h1
            className="font-serif text-5xl md:text-6xl mb-4 tracking-wide"
            style={{ color: tea.color }}
          >
            {tea.name}
          </h1>

          <p className="font-body text-cream/50 text-xl italic">
            {tea.tagline}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* History */}
        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-serif text-3xl text-cream/90 mb-6 tracking-wide">
            History
          </h2>
          <p className="font-body text-cream/60 leading-relaxed text-lg">
            {tea.history}
          </p>
        </section>

        {/* Origin */}
        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-serif text-3xl text-cream/90 mb-6 tracking-wide">
            Origin
          </h2>
          <p
            className="font-serif text-2xl mb-4"
            style={{ color: tea.color }}
          >
            {tea.origin}
          </p>
          <p className="font-body text-cream/60 leading-relaxed">
            {tea.originDescription}
          </p>
        </section>

        {/* Processing */}
        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="font-serif text-3xl text-cream/90 mb-6 tracking-wide">
            Craft
          </h2>
          <p className="font-body text-cream/60 leading-relaxed">
            {tea.processing}
          </p>
        </section>

        {/* Flavor */}
        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="font-serif text-3xl text-cream/90 mb-6 tracking-wide">
            Character
          </h2>
          <p className="font-body text-cream/60 leading-relaxed italic text-lg">
            "{tea.flavor}"
          </p>
        </section>

        {/* Best Examples */}
        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <h2 className="font-serif text-3xl text-cream/90 mb-8 tracking-wide">
            Notable Examples
          </h2>
          <div className="space-y-6">
            {tea.bestExamples.map((example, index) => (
              <div
                key={example.name}
                className="border-l-2 pl-6 py-2 transition-all duration-300 hover:pl-8"
                style={{ borderColor: tea.color + '60' }}
              >
                <h3
                  className="font-serif text-xl mb-2"
                  style={{ color: tea.color }}
                >
                  {example.name}
                </h3>
                <p className="font-body text-cream/50 text-sm">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Brewing Tips */}
        <section className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="font-serif text-3xl text-cream/90 mb-6 tracking-wide">
            Brewing Wisdom
          </h2>
          <div
            className="bg-white/5 rounded-lg p-8 border border-white/10"
          >
            <p className="font-body text-cream/70 leading-relaxed">
              {tea.brewingTips}
            </p>
          </div>
        </section>

        {/* Footer navigation */}
        <footer className="pt-8 pb-16 text-center">
          <Link
            to="/"
            className="inline-block font-serif text-xl transition-all duration-500 hover:tracking-wider"
            style={{ color: tea.color }}
          >
            Continue your journey
          </Link>
        </footer>
      </main>
    </div>
  )
}
