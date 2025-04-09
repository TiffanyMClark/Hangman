import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css';
import { getRegisteredPlayers,setActivePlayer, getActivePlayerIndex } from '../../utils/saveState';

interface User {
  username: string;
  pin: string;
}

interface LoginProps {
  users: User[];
}

function Login({ }: LoginProps) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  //const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Check if the user exists in local storage
    //const users = storedUsers || [];
    const registeredPlayers = getRegisteredPlayers();
    const userExists = registeredPlayers.some(
    (player: any) => player.username === username && player.pin === pin
  );

  if (userExists) {
    setActivePlayer(username, pin); // Set the active player
    console.log("Login successful. Active player set with index of: ", getActivePlayerIndex());

    navigate("/hangman"); // Redirect to the hangman page
    //navigate(0); // Refresh the page to load the game state
  } else {
    setErrorMessage("Invalid username or pin. Please try again.");
  }
  };

  return (
    <section>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form id="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="pin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
            </svg>
          </label>
          <input
            type="password"
            name="pin"
            id="pin"
            placeholder="Pin"
            required
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>

        <button id="login-button" type="submit">
          Login
        </button>
      </form>

      <p>
        New Here? <a><Link to="/Register">Create an Account</Link></a>
      </p>
    </section>
  );
}

export default Login;
