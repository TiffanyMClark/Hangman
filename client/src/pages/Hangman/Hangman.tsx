import "./Hangman.css";
import { useState, useEffect } from "react";
import HangmanBoard from "../../components/HangmanBoard.tsx";
import HangmanCanvas from "../../components/HangmanCanvas.tsx";
import LetterButtons from "../../components/LetterButtons.tsx";
import RiddleDisplay from "../../components/RiddleDisplay.tsx";
import Score from "../../components/Score.tsx";
import WordDisplay from "../../components/WordDisplay.tsx";
import DifficultyButtons from "../../components/DifficultyButtons";

function Hangman() {
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">(
    "normal"
  );
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [riddle, setRiddle] = useState<string>("");
  const [gameOver, setGameOver] = useState(false);

  const maxMistakes = {
    easy: 8,
    normal: 6,
    hard: 4,
  };

  const fetchNewWord = async () => {
    // Simulate fetching a riddle
    const mockRiddle = {
      question: "What has keys but can't open locks?",
      answer: "piano",
    };

    setSelectedWord(mockRiddle.answer.toLowerCase());
    setRiddle(mockRiddle.question);
  };

  const resetGame = async () => {
    setIncorrectGuesses(0);
    setGuessedLetters(new Set());
    setUsedLetters(new Set());
    setGameOver(false); // Reset game over state
    await fetchNewWord();
  };

  const changeDifficulty = (newDifficulty: "easy" | "normal" | "hard") => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  const isWin = () => {
    return [...selectedWord].every((letter) => guessedLetters.has(letter));
  };

  const handleGuess = (letter: string, button: HTMLButtonElement) => {
    if (incorrectGuesses >= maxMistakes[difficulty]) {
      setGameOver(true);
      return;
    }

    if (selectedWord.includes(letter)) {
      setGuessedLetters((prev) => new Set(prev.add(letter)));
    } else {
      setIncorrectGuesses((prev) => prev + 1);
    }

    button.disabled = true;
    button.classList.add("used");
    setUsedLetters((prev) => new Set(prev.add(letter)));

    if (isWin()) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  return (
    <section className="game-container">
      {/* Difficulty Buttons */}
      <div className="difficulty-buttons">
        <DifficultyButtons changeDifficulty={changeDifficulty} />
      </div>

      {/* Riddle Display */}
      <div className="riddle-display">
        <RiddleDisplay riddle={riddle} />
      </div>

      {/* Word Display */}
      <div className="word-display">
        <WordDisplay word={selectedWord} guessedLetters={guessedLetters} />
      </div>

      {/* Letter Buttons */}
      <div className="letter-buttons">
        <LetterButtons
          usedLetters={usedLetters}
          handleGuess={handleGuess}
          difficulty={difficulty}
        />
      </div>

      {/* Score */}
      <div className="score-container">
        <Score incorrectGuesses={incorrectGuesses} />
      </div>

      {/* Hangman Canvas */}
      <div className="hangman-container">
        <HangmanCanvas
          incorrectGuesses={incorrectGuesses}
          difficulty={difficulty}
        />
      </div>

      {/* Hangman Board */}
      <div className="hangman-board-container">
        <HangmanBoard
          incorrectGuesses={incorrectGuesses}
          maxMistakes={maxMistakes[difficulty]}
          difficulty={difficulty}
        />
      </div>

      {/* Game Over Message */}
      {gameOver && (
        <div className="game-over">
          {incorrectGuesses >= maxMistakes[difficulty]
            ? "Game Over! The word was: " + selectedWord
            : "Congratulations!"}
        </div>
      )}
    </section>
  );
}

export default Hangman;
