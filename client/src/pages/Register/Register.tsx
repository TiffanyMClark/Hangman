import { useState } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { getRegisteredPlayers, setActivePlayer } from '../../utils/saveState';

function Register() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    // Retrieve the latest registeredPlayers array from local storage
    const registeredPlayers = getRegisteredPlayers();
  
    // Check if the username already exists
    const userExists = registeredPlayers.some(
      (player: any) => player.username === username
    );
    if (userExists) {
      setErrorMessage("User already exists. Please choose a different username.");
      return;
    }
  
    // Check if the pin and confirm pin match
    if (pin !== confirmPin) {
      setErrorMessage("Pins do not match. Please try again.");
      return;
    }
    // THIS IS A SIMPLE BAND AID FIX, APPLY API HERE TO INITIALIZE WITH A UNIQUE RIDDLE
    // AND A UNIQUE ANSWER - ELDRISH (i am so tired i did not sleep)
    const mockRiddle = {
      question: "What has keys but can't open locks?",
      answer: "piano",
    };
  
    // Add the new user to the registeredPlayers array with default difficulty
    registeredPlayers.push({
      username,
      pin,
      riddle: mockRiddle.question,
      answer: mockRiddle.answer,
      difficulty: "normal", // Set default difficulty to "normal"
      usedLetters: [],
      attemptsLeft: 6, // Default for "normal" difficulty
      wins: 0,
      streak: 0,
      gameOver: false,
    });
  
    // Save the updated array back to local storage
    localStorage.setItem("registeredPlayers", JSON.stringify(registeredPlayers));
  
    // Set the active player
    setActivePlayer(username, pin);
  
    alert("Registration successful!");
    
    navigate("/hangman"); // Redirect to the hangman page

    //Wondering if there is a better way to save initial game state
    //navigate(0); // Refresh the page to load the game state

    // Clear input fields
    setUsername("");
    setPin("");
    setConfirmPin("");
    setErrorMessage(""); // Clear error message
  };

  return (
    <section>
      <h1>Register</h1>
      {errorMessage && <p id="error-message">{errorMessage}</p>}
      <form id="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username"><svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg></label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
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
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-pin"> 
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
            name="confirm-pin"
            id="confirm-pin"
            placeholder="Confirm Pin"
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            required
          />
        </div>
        <button id="register-button" type="submit">
          Register
        </button>
      </form>
      <p id="account-message">
        Already have an account?  
        <Link to="/Login">Login</Link> {/* testing */}
      {/*<a><Link to="/Login">  Login</Link></a>*/}
      </p>
    </section>
  );
}

export default Register;
