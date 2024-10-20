import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactUI from './ReactUI.jsx'
import './index.css'
import { Provider } from 'jotai'
import initGame from './initGame.js'
import { store } from './store.js'


const ui = document.getElementById("ui");

// resizing 
new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--scale",
    Math.min(
      ui.parentElement.offsetWidth / ui.offsetWidth,
      ui.parentElement.offsetHeight / ui.offsetHeight
    )
  );
}).observe(ui.parentElement);

createRoot(ui).render(
  <StrictMode>
    {/* provider to pass the stuff from store file into our UI */}
    <Provider store={store}>
      <ReactUI />
    </Provider>
   
  </StrictMode>,
)

initGame();