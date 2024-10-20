import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import initGame, { addPlayerToFirebase } from './initGame.js';
import ReactUI from './ReactUI.jsx'; // Import the ReactUI component
import { Provider } from 'jotai';
import { store } from './store.js';

// Resize observer for dynamic scaling
const ui = document.getElementById("ui");
new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--scale",
    Math.min(
      ui.parentElement.offsetWidth / ui.offsetWidth,
      ui.parentElement.offsetHeight / ui.offsetHeight
    )
  );
}).observe(ui.parentElement);

function Main() {
  const [username, setUsername] = useState(""); // State for username
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

  const handleCreatePlayer = async (event) => {
    event.preventDefault();
    if (username) {
      console.log("Creating player in Firebase...");
      await addPlayerToFirebase(username); // Create player in Firebase
      setGameStarted(true); // Set game as started after the player is created
    }
  };

  // Initialize the game after gameStarted becomes true
  useEffect(() => {
    if (gameStarted) {
      const gameContainer = document.getElementById("game-container");
      if (gameContainer) {
        initGame(username);
      }
    }
  }, [gameStarted, username]);

  return (
    <div className="CreatingPlayer">
      {!gameStarted && ( // Show the form only if the game hasn't started
        <>
          <h1>Enter your name to start the game</h1>
          <form onSubmit={handleCreatePlayer}>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update state on change
              required
            />
            <button type="submit">Start Game</button>
          </form>
        </>
      )}
      {gameStarted && (
        <div id="game-container" style={{ width: "100%", height: "100vh" }}>
          {/* The game will be rendered inside this container */}
        </div>
      )}
    </div>
  );
}

// Render the root with Provider for state management
createRoot(ui).render(
  <StrictMode>
    <Provider store={store}>
      <Main />
      <ReactUI />
    </Provider>
  </StrictMode>
);
