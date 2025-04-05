// bring in rest of function from JS files
//replace some variables with useState
//make some components?
import './Hangman.css'
import HangmanBoard from '../../components/HangmanBoard'
import { useState } from 'react';


function Hangman() {
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
// Reset the game
async function resetGame() {
  setIncorrectGuesses(0);
  guessedLetters.clear();
  usedLetters.clear();

  // Hide all Hangman body parts
  document.querySelectorAll(".hangman-part").forEach((part) => {
    part.style.display = "none";
  });

  // Clear previous letter buttons
  createLetterButtons();
  await fetchNewWord();
}

  return (
    <section className="game-container">
    <h1 className="game-header">Riddle Hangman</h1>
    <div id="riddle-display" className="riddle-display">Loading riddle...</div>
      {/* <!-- Smaller Riddle Text --> */}

      <div id="word-display" className="word-display">_ _ _ _</div>
      {/* <!-- Large Word Display --> */}

      <div id="letters-container" className="letters-container"></div>
      {/* <!-- Letter Selection --> */}

      {/* <!--updating score when the user wins and streak for how many they win in a row--> */}
    <div id="score-container" className="score-container">
      <p>Wins: <span id="wins-count">0</span></p>
      <p>Streak: <span id="streak-count">0</span></p>
    </div>
    <div id="difficulty-container" className="difficulty-container">
      <button className="difficulty-btn" data-diff="easy">Easy</button>
      <button className="difficulty-btn" data-diff="normal">Normal</button>
      <button className="difficulty-btn" data-diff="hard">Hard</button>
    </div>
    <div id="game-over-message" className="game-over-message" style="display: none">
      <h2>Game Over!</h2>
      <p>Your streak is now reset.</p>
      <button onclick={resetGame}>Try Again</button>
    </div>
    {/* <!-- Hangman Board --> */}
    <HangmanBoard />
    </section>
  )
}

export default Hangman
