import "./Hangman.css";
import { useState, useEffect } from "react";
import HangmanBoard from "../../components/HangmanBoard";
import Score from "../../components/Score";
import LetterButtons from "../../components/LetterButtons";

function Hangman() {
  // State hooks to manage game state
  const [incorrectGuesses, setIncorrectGuesses] = useState(0); // Tracks the number of incorrect guesses
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set()); // Stores guessed letters
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set()); // Stores used letters
  const [selectedWord, setSelectedWord] = useState<string>(""); // The word to guess
  const [difficulty, setDifficulty] = useState("normal"); // Game difficulty (easy, normal, hard)

  // Object for max mistakes based on difficulty level
  const maxMistakes = {
    easy: 8,
    normal: 6,
    hard: 4,
  };

  // Fetch a new word from the server (API request)
  const fetchNewWord = async () => {
    try {
      const response = await fetch("/api/riddle");
      const data = await response.json();
      setSelectedWord(data.answer.toLowerCase()); // Set the selected word
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  // Reset the game state
  const resetGame = async () => {
    setIncorrectGuesses(0); // Reset incorrect guesses to 0
    setGuessedLetters(new Set()); // Clear guessed letters
    setUsedLetters(new Set()); // Clear used letters
    await fetchNewWord(); // Fetch a new word
  };

  // Change the difficulty level
  const changeDifficulty = (newDifficulty: string) => {
    setDifficulty(newDifficulty); // Set new difficulty
    resetGame(); // Reset the game with new difficulty
  };

  // Check if the user has won
  const isWin = () => {
    return [...selectedWord].every((letter) => guessedLetters.has(letter)); // If all letters are guessed
  };

  // Update the word display with guessed letters
  const updateDisplay = () => {
    const displayWord = [...selectedWord]
      .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
      .join(" ");
    return displayWord; // Return the updated word with blanks
  };

  // Handle letter guesses
  const handleGuess = (letter: string, button: HTMLButtonElement) => {
    if (selectedWord.includes(letter)) {
      setGuessedLetters((prev) => new Set(prev.add(letter))); // Add correct guess to guessed letters
    } else {
      setIncorrectGuesses((prev) => prev + 1); // Increase incorrect guesses
    }

    button.disabled = true; // Disable the button after the letter is guessed
    button.classList.add("used"); // Add a 'used' class to the button
    setUsedLetters((prev) => new Set(prev.add(letter))); // Mark the letter as used

    // Check if the game is won
    if (isWin()) {
      alert("Congratulations! You Win!"); // Alert on win
      resetGame(); // Reset the game
    }
  };

  // Fetch new word on component mount
  useEffect(() => {
    fetchNewWord(); // Fetch the word when the component mounts
  }, []);

  return (
    <section className="game-container">
      {/* Difficulty Buttons */}
      <div className="difficulty-buttons">
        <button onClick={() => changeDifficulty("easy")}>Easy</button>
        <button onClick={() => changeDifficulty("normal")}>Normal</button>
        <button onClick={() => changeDifficulty("hard")}>Hard</button>
      </div>
      {/* Letter Selection */}
      <LetterButtons
        usedLetters={usedLetters} // Pass used letters to LetterButtons component
        handleGuess={handleGuess} // Pass handleGuess function to LetterButtons
        difficulty={difficulty} // Pass difficulty level to LetterButtons
      />
      {/* Score Display */}
      <Score incorrectGuesses={incorrectGuesses} />{" "}
      {/* Pass incorrect guesses to Score */}
      {/* Hangman Board */}
      <HangmanBoard
        incorrectGuesses={incorrectGuesses} // Pass incorrect guesses to HangmanBoard
        maxMistakes={maxMistakes} // Pass maxMistakes object to HangmanBoard
        difficulty={difficulty} // Pass difficulty to HangmanBoard
      />
    </section>
  );
}

export default Hangman;
