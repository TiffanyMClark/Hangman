import React from "react";

interface LetterButtonsProps {
  usedLetters: Set<string>;
  handleGuess: (letter: string, button: HTMLButtonElement) => void;
  difficulty: string;
}

const LetterButtons: React.FC<LetterButtonsProps> = ({
  usedLetters,
  handleGuess,
  difficulty,
}) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div id="letters-container">
      {alphabet.map((letter) => (
        <button
          key={letter}
          onClick={(e) => handleGuess(letter, e.currentTarget)}
          disabled={usedLetters.has(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default LetterButtons;
