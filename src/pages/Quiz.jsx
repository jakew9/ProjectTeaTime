import { Link } from 'react-router-dom'
import TeaQuiz from '../components/TeaQuiz'

export default function Quiz() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <header className="py-12 px-6 text-center">
        <Link
          to="/"
          className="inline-block mb-8 text-cream/40 hover:text-cream/70 transition-colors duration-500 font-body text-sm tracking-widest uppercase"
        >
          ← Return to sanctuary
        </Link>
        <h1 className="font-serif text-4xl text-cream tracking-wide">Foodie Flavor Quiz</h1>
        <p className="text-cream/40 font-body mt-2">Discover your perfect brew</p>
      </header>

      <main className="flex-grow flex items-center justify-center pb-20">
        <TeaQuiz />
      </main>
    </div>
  )
}
