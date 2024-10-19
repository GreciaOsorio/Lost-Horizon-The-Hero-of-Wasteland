import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactUI from './ReactUI.jsx'
import './index.css'
import initGame from './initGame.js'

createRoot(document.getElementById('ui')).render(
  <StrictMode>
    <ReactUI />
  </StrictMode>,
)

initGame();