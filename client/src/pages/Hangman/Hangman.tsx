import "./Hangman.css";
import { useState, useEffect } from "react";
import HangmanBoard from "../../components/HangmanBoard.tsx";
import HangmanCanvas from "../../components/HangmanCanvas.tsx";
import LetterButtons from "../../components/LetterButtons.tsx";
import RiddleDisplay from "../../components/RiddleDisplay.tsx";
import Score from "../../components/Score.tsx";
import WordDisplay from "../../components/WordDisplay.tsx";
import DifficultyButtons from "../../components/DifficultyButtons";
import Confetti from "react-confetti";

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
  const [wins, setWins] = useState(0); // Track number of wins
  const [streak, setStreak] = useState(0); // Track winning streak


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
    if (gameOver) {
      return; // Don't allow guesses if the game is over
    }
    if (incorrectGuesses >= maxMistakes[difficulty]) {
      setGameOver(true);
      setStreak(0); // Reset streak if lose
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
      setWins(wins + 1); // Increment wins when the player wins
      setStreak(streak + 1); // Increment streak for a win
    }
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  useEffect(() => {
    if (
      selectedWord &&
      [...selectedWord].every((letter) => guessedLetters.has(letter))
    ) {
      setGameOver(true);
      setWins(wins + 1); // Increment wins if player wins
      setStreak(streak + 1); // Increment streak
    } else if (incorrectGuesses >= maxMistakes[difficulty]) {
      setGameOver(true);
      setStreak(0); // Reset streak if game is lost
    }
  }, [guessedLetters, incorrectGuesses, selectedWord, difficulty]);

  return (
    <section className="game-container">
      {/* Show Confetti when the player wins */}
      {gameOver && isWin() && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

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
          gameOver={gameOver} // Pass gameOver prop
        />
      </div>

      {/* Score Display */}
      <div className="score-container">
        <Score
          incorrectGuesses={incorrectGuesses}
          maxMistakes={maxMistakes[difficulty]}
          wins={wins}
          streak={streak}
          guessesLeft={maxMistakes[difficulty] - incorrectGuesses}
        />
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
          difficulty={difficulty}
        />
      </div>

      {/* Game Over Message with Play Again Button */}
      {gameOver && (
        <div className="game-over">
          <p className="game-over-message">
            {incorrectGuesses >= maxMistakes[difficulty]
              ? `Game Over! The word was: ${selectedWord}`
              : "Congratulations!"}
          </p>
          <button onClick={resetGame} className="play-again-button">
            Play Again
          </button>
        </div>
      )}
    </section>
  );
}

export default Hangman;
