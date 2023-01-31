// import Appbar from './components/Appbar'
import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"

const Home = lazy(() => import('./pages/Home'))
const Horario = lazy(() => import('./pages/Horario'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading ... </div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:curso" element={<Horario />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
