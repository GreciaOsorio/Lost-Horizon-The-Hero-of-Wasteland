import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import initGame, {addPlayerToFirebase} from './initGame.js';


function Main(){
  const [username, setUsername] = useState(""); //State for username 
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started

  const handleCreatePlayer = async (event) => {
    event.preventDefault();
    if (username) {
        console.log("Creating player in Firebase...");
        await addPlayerToFirebase(username); // Create player in Firebase
        setGameStarted(true); // Set game as started after the player is created
    }
  };


  //Initialize the game after gameStarted becomes true
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

const root = createRoot(document.getElementById("ui"));
root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);

