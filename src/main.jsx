import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './hero'
import Team from './team'
import Event from './event1'
import Gallery from './gallery'     

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Hero />
    <Team />
    <Event />
    <Gallery />
  </StrictMode>,
)
