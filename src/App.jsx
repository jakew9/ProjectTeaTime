import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TeaAbout from './pages/TeaAbout'
import Quiz from './pages/Quiz'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tea/:teaType" element={<TeaAbout />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}

export default App
