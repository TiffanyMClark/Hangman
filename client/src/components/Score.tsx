import React from "react";

interface ScoreProps {
  incorrectGuesses: number;
  maxMistakes: number;
  wins: number;
  streak: number;
  guessesLeft: number;
}

const Score: React.FC<ScoreProps> = ({
  incorrectGuesses,
  maxMistakes,
  wins,
  streak,
  guessesLeft,
}) => {
  return (
    <div id="score-display">
      <p>Wins: {wins}</p>
      <p>Streak: {streak}</p>
      <p>Incorrect Guesses: {incorrectGuesses}</p>
      <p>
        Guesses Left: {guessesLeft} / Max: {maxMistakes}
      </p>
    </div>
  );
};

export default Score;
