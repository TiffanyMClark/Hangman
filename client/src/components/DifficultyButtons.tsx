import React from "react";

// Define the props interface to accept a specific difficulty type
interface DifficultyButtonsProps {
  changeDifficulty: (difficulty: "easy" | "normal" | "hard") => void;
}

const DifficultyButtons: React.FC<DifficultyButtonsProps> = ({
  changeDifficulty,
}) => {
  return (
    <div className="difficulty-buttons">
      <button onClick={() => changeDifficulty("easy")}>Easy</button>
      <button onClick={() => changeDifficulty("normal")}>Normal</button>
      <button onClick={() => changeDifficulty("hard")}>Hard</button>
    </div>
  );
};

export default DifficultyButtons;
