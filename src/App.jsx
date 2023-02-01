// import Appbar from './components/Appbar'
import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import CursosDocente from "./pages/CursosDocente"
import Docentes from "./pages/Docentes"

const Home = lazy(() => import('./pages/Home'))
const Horario = lazy(() => import('./pages/Horario'))

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading ... </div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:curso" element={<Horario />} />
          <Route path="/docentes" element={<Docentes />} />
          <Route path="/docentes/:docente" element={<CursosDocente />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
