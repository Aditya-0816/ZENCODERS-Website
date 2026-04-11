import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Hero from './hero'
import Team from './team'
import Event from './event1'
import Gallery from './gallery'
import Vault from './components/academic/vault'
import Contact from './contact'
import Buildchella from './Buildchella'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Event />
            <Gallery />
            <Team />
            <Vault />
          </>
        } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buildchella" element={<Buildchella />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)