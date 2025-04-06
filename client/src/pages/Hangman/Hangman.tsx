// bring in rest of function from JS files
//replace some variables with useState
//make some components?
import './Hangman.css'
import HangmanBoard from '../../components/HangmanBoard'
import Score from '../../components/Score';
import LetterButtons from '../../components/LetterButtons';
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

{/* Game logic */}
  return (
    <section className="game-container">

      {/* <!-- Letter Selection --> */}
      <LetterButtons />

      {/* <!--Score--> */}
      <Score />
      
      {/* <!-- Hangman Board --> */}
      <HangmanBoard />
    </section>
  )
}
export default Hangman