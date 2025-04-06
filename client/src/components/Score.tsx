import React from "react";

interface ScoreProps {
  incorrectGuesses: number;
}

const Score: React.FC<ScoreProps> = ({ incorrectGuesses }) => {
  return (
    <div id="score-display">
      <p>Incorrect Guesses: {incorrectGuesses}</p>
    </div>
  );
};

export default Score;
