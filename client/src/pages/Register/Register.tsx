import { useState } from 'react';
import '../../index.css';

interface User {
  username: string;
  pin: string;
}

const users: User[] = []; // Array to store user data

function Register() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission

    // Check if username is already taken
    if (users.some(user => user.username === username)) {
      setErrorMessage("Username is already taken. Please choose another.");
      return;
    }

    // Check if pins match
    if (pin !== confirmPin) {
      setErrorMessage("Pins do not match. Please try again.");
      return;
    }

    // Register the user
    users.push({ username, pin });
    alert("Registration successful!");

    // Clear input fields
    setUsername('');
    setPin('');
    setConfirmPin('');
    setErrorMessage(''); // Clear error message
  };

  return (
    <div className="wrapper">
      <h1>Register</h1>
      {errorMessage && <p id="error-message">{errorMessage}</p>}
      <form id="form" onSubmit={register}>
        <div>
          <label htmlFor="username">Username</label>
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
          <label htmlFor="pin">Pin</label>
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
          <label htmlFor="confirm-pin">Confirm Pin</label>
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
        <button id="register-button" type="submit">Register</button>
      </form>
      <p>
        Already have an account? 
        <a href="./login.html">Login</a>
      </p>
    </div>
  );
}

export default Register;
