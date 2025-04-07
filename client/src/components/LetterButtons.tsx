import React, { useState, useEffect } from "react";

// Function to shuffle an array
const shuffleArray = (array: string[]) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

interface LetterButtonsProps {
  usedLetters: Set<string>;
  handleGuess: (letter: string, button: HTMLButtonElement) => void;
  difficulty: "easy" | "normal" | "hard";
  gameOver: boolean; // New prop to track if the game is over
}

const LetterButtons: React.FC<LetterButtonsProps> = ({
  usedLetters,
  handleGuess,
  difficulty,
  gameOver,
}) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  // Adjust button based on difficulty
  const gridTemplateColumns =
    difficulty === "hard" ? "repeat(7, 1fr)" : "repeat(9, 1fr)"; // Fewer columns for hard mode to make letters move
  const buttonSize =
    difficulty === "hard" ? "18px" : difficulty === "normal" ? "15px" : "20px";

  const [letters, setLetters] = useState<string[]>(alphabet);

  useEffect(() => {
    // If game is over or difficulty is not hard, don't shuffle
    if (gameOver || difficulty !== "hard") return;

    const intervalId = setInterval(() => {
      // Shuffle the letters every 2 seconds for hard mode
      setLetters((prevLetters) => shuffleArray(prevLetters));
    }, 2000);

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount or game over
    };
  }, [gameOver, difficulty]); // Only re-run when gameOver or difficulty changes

  return (
    <div
      className="letters-container"
      style={{ gridTemplateColumns }} // Adjust grid layout based on difficulty
    >
      {letters.map((letter) => (
        <button
          key={letter}
          className={`letter-button ${usedLetters.has(letter) ? "used" : ""}`}
          onClick={(e) => handleGuess(letter, e.currentTarget)}
          disabled={usedLetters.has(letter)}
          style={{ fontSize: buttonSize }}
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LetterButtons;
