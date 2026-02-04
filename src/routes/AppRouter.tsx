import { BrowserRouter, Routes, Route } from 'react-router'
import LandingPage from '@/pages/ModelSelectPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}