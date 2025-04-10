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

interface Riddle {
  question: string;
  answer: string;
  id: string;
}

const maxMistakes = {
  easy: 8,
  normal: 6,
  hard: 4,
};

function Hangman() {
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">(
    "normal"
  );
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [selectedWord, setSelectedWord] = useState("");
  const [riddle, setRiddle] = useState<Riddle>({
    question: "",
    answer: "",
    id: "",
  });
  const [gameOver, setGameOver] = useState(false);
  const [wins, setWins] = useState(0);
  const [streak, setStreak] = useState(0);

  // 🧠 Fetch new riddle from backend
  const fetchNewWord = async () => {
    try {
      const response = await fetch(
        "https://hangman-c744.onrender.com/api/riddles"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure data is an object and not an array
      if (!data || !data.question || !data.answer) {
        throw new Error(
          'Invalid response from server: Missing "question" or "answer"'
        );
      }

      // Set the riddle and selected word (converted to lowercase for consistency)
      setRiddle(data); // The riddle object returned directly
      setSelectedWord(data.answer.toLowerCase()); // Ensuring answer is lowercase for comparison
    } catch (error) {
      console.error("Error fetching riddle:", error);
    }
  };

  const resetGame = async () => {
    setIncorrectGuesses(0);
    setGuessedLetters(new Set());
    setUsedLetters(new Set());
    setGameOver(false);
    await fetchNewWord();
  };

  const changeDifficulty = (newDifficulty: "easy" | "normal" | "hard") => {
    setDifficulty(newDifficulty);
    resetGame();
  };

  const isWin = () =>
    selectedWord.split("").every((letter) => guessedLetters.has(letter));

  const handleGuess = (letter: string, button: HTMLButtonElement) => {
    if (gameOver || usedLetters.has(letter)) return;

    const isCorrect = selectedWord.includes(letter);
    if (isCorrect) {
      setGuessedLetters((prev) => new Set(prev).add(letter));
    } else {
      setIncorrectGuesses((prev) => prev + 1);
    }

    button.disabled = true;
    button.classList.add("used");
    setUsedLetters((prev) => new Set(prev).add(letter));
  };

  // 🎯 Win/loss conditions
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

  useEffect(() => {
    fetchNewWord();
  }, []);

  return (
    <section className="game-container">
      {gameOver && isWin() && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <div className="difficulty-buttons">
        <DifficultyButtons changeDifficulty={changeDifficulty} />
      </div>

      <div className="riddle-display">
        <RiddleDisplay riddle={riddle} />
      </div>

      <div className="word-display">
        <WordDisplay word={selectedWord} guessedLetters={guessedLetters} />
      </div>

      <div className="letter-buttons">
        <LetterButtons
          usedLetters={usedLetters}
          handleGuess={handleGuess}
          difficulty={difficulty}
          gameOver={gameOver}
        />
      </div>

      <div className="score-container">
        <Score
          incorrectGuesses={incorrectGuesses}
          maxMistakes={maxMistakes[difficulty]}
          wins={wins}
          streak={streak}
          guessesLeft={maxMistakes[difficulty] - incorrectGuesses}
        />
      </div>

      <div className="hangman-container">
        <HangmanCanvas
          incorrectGuesses={incorrectGuesses}
          difficulty={difficulty}
        />
      </div>

      <div className="hangman-board-container">
        <HangmanBoard
          incorrectGuesses={incorrectGuesses}
          difficulty={difficulty}
        />
      </div>

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
