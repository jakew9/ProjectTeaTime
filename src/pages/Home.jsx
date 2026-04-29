import { useState } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import WaterTransition from '../components/WaterTransition'
import TeaMenu from '../components/TeaMenu'

export default function Home() {
  const [phase, setPhase] = useState('loading') // 'loading' | 'transition' | 'menu'

  const handleLoadingComplete = () => {
    setPhase('transition')
  }

  const handleTransitionComplete = () => {
    setPhase('menu')
  }

  return (
    <>
      {phase === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {phase === 'transition' && (
        <WaterTransition onComplete={handleTransitionComplete} />
      )}

      {phase === 'menu' && (
        <TeaMenu />
      )}
    </>
  )
}
