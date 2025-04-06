import React from "react";

interface LetterButtonsProps {
  usedLetters: Set<string>;
  handleGuess: (letter: string, button: HTMLButtonElement) => void;
  difficulty: "easy" | "normal" | "hard";
}

const LetterButtons: React.FC<LetterButtonsProps> = ({
  usedLetters,
  handleGuess,
  difficulty, // Use the difficulty prop
}) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  // Adjust layout or button size based on difficulty
  const gridTemplateColumns =
    difficulty === "hard" ? "repeat(7, 1fr)" : "repeat(9, 1fr)"; // Fewer columns for hard mode to make letters move
  const buttonSize =
    difficulty === "hard" ? "18px" : difficulty === "normal" ? "15px" : "20px";

  return (
    <div
      className="letters-container"
      style={{ gridTemplateColumns }} // Adjust grid layout based on difficulty
    >
      {alphabet.map((letter) => (
        <button
          key={letter}
          className={`letter-button ${usedLetters.has(letter) ? "used" : ""}`}
          onClick={(e) => handleGuess(letter, e.currentTarget)}
          disabled={usedLetters.has(letter)}
          style={{ fontSize: buttonSize }} // Adjust button size based on difficulty
        >
          {letter.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LetterButtons;
