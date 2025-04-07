import React from "react";

type HangmanBoardProps = {
  incorrectGuesses: number;
  difficulty: "easy" | "normal" | "hard";
};

const HangmanBoard: React.FC<HangmanBoardProps> = ({
  incorrectGuesses,
  difficulty,
}) => {
  const maxMistakes = {
    easy: 6,
    normal: 5,
    hard: 4,
  };

  const currentMaxMistakes = maxMistakes[difficulty]; // Set maxMistakes based on difficulty

  return (
    <div id="hangman-container">
      <h2>Difficulty: {difficulty}</h2>
      <svg id="hangman-svg" width="200" height="250" viewBox="0 0 200 250">
        {/* Gallows bottom bar */}
        <line
          x1="20"
          y1="220"
          x2="100"
          y2="220"
          stroke="black"
          strokeWidth="5"
        />
        {/* Tall vertical bar */}
        <line x1="60" y1="220" x2="60" y2="20" stroke="black" strokeWidth="5" />
        {/* Crossbar */}
        <line x1="60" y1="20" x2="140" y2="20" stroke="black" strokeWidth="5" />
        {/* Drop down bar for rope */}
        <line
          x1="140"
          y1="20"
          x2="140"
          y2="50"
          stroke="black"
          strokeWidth="5"
        />

        {/* Hangman Parts */}
        <circle
          id="head"
          className="hangman-part"
          cx="140"
          cy="70"
          r="20"
          stroke="black"
          strokeWidth="3"
          fill="none"
          style={{ display: incorrectGuesses >= 1 ? "block" : "none" }} // Head on 1st wrong guess
        />
        <line
          id="body"
          className="hangman-part"
          x1="140"
          y1="90"
          x2="140"
          y2="150"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 2 ? "block" : "none" }} // Body on 2nd wrong guess
        />
        <line
          id="left-arm"
          className="hangman-part"
          x1="140"
          y1="100"
          x2="120"
          y2="130"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 3 ? "block" : "none" }} // Left arm on 3rd wrong guess
        />
        <line
          id="right-arm"
          className="hangman-part"
          x1="140"
          y1="100"
          x2="160"
          y2="130"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 4 ? "block" : "none" }} // Right arm on 4th wrong guess
        />
        <line
          id="left-leg"
          className="hangman-part"
          x1="140"
          y1="150"
          x2="120"
          y2="190"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 5 ? "block" : "none" }} // Left leg on 5th wrong guess
        />
        <line
          id="right-leg"
          className="hangman-part"
          x1="140"
          y1="150"
          x2="160"
          y2="190"
          stroke="black"
          strokeWidth="3"
          style={{ display: incorrectGuesses >= 6 ? "block" : "none" }} // Right leg on 6th wrong guess
        />
      </svg>
      <h3>Max Mistakes: {currentMaxMistakes}</h3>
    </div>
  );
};

export default HangmanBoard;
