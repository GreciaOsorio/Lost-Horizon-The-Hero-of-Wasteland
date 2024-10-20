import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your CSS file
import initGame, { addPlayerToFirebase } from './initGame.js';
import ReactUI from './ReactUI.jsx'; // Import the ReactUI component
import { Provider } from 'jotai'; // State management
import { store } from './store.js'; // Import your Jotai store
import TextBox from './ReactComponents/TextBox.jsx';

//Firebase Authentication Imports 
import { app, db, auth } from "./firebase"; // firebase config access
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


const ui = document.getElementById("ui");

// Create the root once
const root = createRoot(ui);


// Resizing observer for scaling the UI
new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--scale",
    Math.min(
      ui.parentElement.offsetWidth / ui.offsetWidth,
      ui.parentElement.offsetHeight / ui.offsetHeight
    )
  );
}).observe(ui.parentElement);


// TitlePage function
function TitlePage({ onTitleEnd }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTitleEnd(); // Call the function to signal that the title duration has ended
    }, 1000); // 4000 milliseconds = 4 seconds
    return () => clearTimeout(timer); // Cleanup timer when component unmounts
  }, [onTitleEnd]);

  return (
    <div className="title-screen">
      <h1>Lost Horizon: The Hero of the Wastelands</h1>
    </div>
  );
}


//Login Sign up Page 
function AuthPage({ onAuthSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState(''); // New state for password confirmation
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign Up and Log In
  const [error, setError] = useState('');

  // Helper function to convert username to an email-like format
  const usernameToEmail = (username) => `${username}@username.com`;




  const handleAuth = async (e) => {
    e.preventDefault();

    const email = usernameToEmail(username);

    // Check if passwords match when signing up
    if (isSignUp && password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        await addPlayerToFirebase(username);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (error){
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('Email already in use.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Authentication failed. Please try again.');
      }
    }

  };

  return (
    <div className="auth-form">
      <h1>{isSignUp ? 'Sign Up' : 'Log In'}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAuth}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isSignUp && ( // Show password confirmation only in sign-up mode
          <input
            type="password"
            placeholder="Confirm password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        )}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Log In' : 'No account? Sign Up'}
      </button>
    </div>
  );

}

function Main() {
  const [username, setUsername] = useState(""); // State for username
  const [gameStarted, setGameStarted] = useState(false); // State to track if the game has started
  const [showTitle, setShowTitle] = useState(true); // State for showing the title screen
  const [authComplete, setAuthComplete] = useState(false); //track user logged in or signup
  
  // Define the style you want for the background
  const myStyle = {
    backgroundImage:
      "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

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
      root.render(
        <StrictMode>
          <Provider store={store}>
            <ReactUI />
          </Provider>
        </StrictMode>
      );
      initGame(username); // Initialize the game with the username
    }
  }, [gameStarted, username]);

  return (
    <div className="CreatingPlayer">
      {showTitle ? (
        <TitlePage onTitleEnd={() => setShowTitle(false)} /> // Call TitlePage with callback
      ) : !authComplete ? ( // Show the AuthPage if auth isn't complete
        <AuthPage onAuthSuccess={() => setAuthComplete(true)} />
      ) :
      !gameStarted ? ( // Show the form only if the game hasn't started
        <div className="login-form"> {/* Wrap the form with this class */}
          <h1>Enter your player name to start the game!</h1>
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
        </div>
      ) : (
        <div id="game-container" style={myStyle}>
          {/* The game will be rendered inside this container */ }
        </div>
      )}
    </div>
  );



}

// Render the root with Provider for state management
root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);
