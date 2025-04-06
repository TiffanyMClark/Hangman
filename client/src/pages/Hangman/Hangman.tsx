import "./Hangman.css";
import { useState, useEffect } from "react";
import HangmanBoard from "../../components/HangmanBoard.tsx";
import HangmanCanvas from "../../components/HangmanCanvas.tsx";
import LetterButtons from "../../components/LetterButtons.tsx";
import RiddleDisplay from "../../components/RiddleDisplay.tsx"; // Import RiddleDisplay
import Score from "../../components/Score.tsx";
import WordDisplay from "../../components/WordDisplay.tsx";

function Hangman() {
  // State for the game (difficulty, guessed letters, etc.)
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">(
    "normal"
  );
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [riddle, setRiddle] = useState<string>(""); // New state for riddle

  // Max mistakes based on difficulty
  const maxMistakes = {
    easy: 8,
    normal: 6,
    hard: 4,
  };

  // Fetch a new word and riddle from the server
  const fetchNewWord = async () => {
    try {
      const response = await fetch("/api/riddle");
      const data = await response.json();
      setSelectedWord(data.answer.toLowerCase()); // Set the word
      setRiddle(data.riddle); // Set the riddle
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

  // Reset the game state
  const resetGame = async () => {
    setIncorrectGuesses(0);
    setGuessedLetters(new Set());
    setUsedLetters(new Set());
    await fetchNewWord();
  };

  // Change the difficulty level
  const changeDifficulty = (newDifficulty: "easy" | "normal" | "hard") => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  // Check if the user has won
  const isWin = () => {
    return [...selectedWord].every((letter) => guessedLetters.has(letter));
  };

  // Handle letter guesses
  const handleGuess = (letter: string, button: HTMLButtonElement) => {
    if (selectedWord.includes(letter)) {
      setGuessedLetters((prev) => new Set(prev.add(letter)));
    } else {
      setIncorrectGuesses((prev) => prev + 1);
    }

    button.disabled = true;
    button.classList.add("used");
    setUsedLetters((prev) => new Set(prev.add(letter)));

    if (isWin()) {
      alert("Congratulations! You Win!");
      resetGame();
    }
  };

  // Fetch a new word and riddle on component mount
  useEffect(() => {
    fetchNewWord();
  }, []);

  return (
    <section className="game-container">
      {/* Difficulty Buttons */}
      <div className="difficulty-buttons">
        <button onClick={() => changeDifficulty("easy")}>Easy</button>
        <button onClick={() => changeDifficulty("normal")}>Normal</button>
        <button onClick={() => changeDifficulty("hard")}>Hard</button>
      </div>
      {/* Display the riddle */}
      <RiddleDisplay riddle={riddle} />{" "}
      {/* This will show the riddle on the screen */}
      {/* Letter Buttons */}
      <LetterButtons
        usedLetters={usedLetters}
        handleGuess={handleGuess}
        difficulty={difficulty}
      />
      {/* Score Display */}
      <Score incorrectGuesses={incorrectGuesses} />
      {/* Hangman Canvas */}
      <HangmanCanvas
        incorrectGuesses={incorrectGuesses}
        difficulty={difficulty}
      />
      {/* Hangman Board */}
      <HangmanBoard
        incorrectGuesses={incorrectGuesses}
        maxMistakes={maxMistakes[difficulty]}
        difficulty={difficulty}
      />
      {/* Word Display */}
      <WordDisplay word={selectedWord} guessedLetters={guessedLetters} />
    </section>
  );
}

export default Hangman;
