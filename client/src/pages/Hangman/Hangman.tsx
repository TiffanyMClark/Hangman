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
import {
  getActivePlayerIndex,
  getRegisteredPlayers,
  getActivePlayer,
} from "../../utils/saveState";

const activePlayer = getActivePlayerIndex();
const registerdPlayers = JSON.parse(
  localStorage.getItem("registeredPlayers") || "[]"
); // Array to store registered players

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
      const response = await fetch("http://localhost:3002/api/riddles");
      const data = await response.json();

      if (!data.question || !data.answer) {
        throw new Error(
          'Invalid response from server: Missing "question" or "answer"'
        );
      }

      setRiddle(data);
      setSelectedWord(data.answer.toLowerCase());
    } catch (error) {
      console.error("Error fetching riddle:", error);
    }
  };

  const resetGame = async () => {
    setIncorrectGuesses(0);
    setGuessedLetters(new Set());
    setUsedLetters(new Set());

    const activePlayer = getActivePlayer();
    if (activePlayer) {
      const registeredPlayers = getRegisteredPlayers();
      const playerIndex = registeredPlayers.findIndex(
        (player: any) =>
          player.username === activePlayer.username &&
          player.pin === activePlayer.pin
      );

      if (playerIndex !== -1) {
        const playerData = registeredPlayers[playerIndex];
        playerData.usedLetters = [];
        playerData.attemptsLeft = maxMistakes[difficulty]; // Reset attemptsLeft
        playerData.gameOver = false;

        registeredPlayers[playerIndex] = playerData;
        localStorage.setItem(
          "registeredPlayers",
          JSON.stringify(registeredPlayers)
        );
      }
    }

    setGameOver(false);
    await fetchNewWord();
  };

  const changeDifficulty = (newDifficulty: "easy" | "normal" | "hard") => {
    setDifficulty(newDifficulty);
    registerdPlayers[activePlayer].difficulty = newDifficulty; // Set the difficulty for the active player
    localStorage.setItem("registeredPlayers", JSON.stringify(registerdPlayers)); // Save updated difficulty to local storage
    resetGame();
  };

  const isWin = () => {
    return (
      selectedWord &&
      selectedWord.length > 0 &&
      [...selectedWord].every((letter) => guessedLetters.has(letter))
    );
  };

  const handleGuess = (letter: string, button: HTMLButtonElement) => {
    if (gameOver) return;

    const activePlayer = getActivePlayer();
    if (!activePlayer) return;

    const registeredPlayers = getRegisteredPlayers();
    const playerIndex = registeredPlayers.findIndex(
      (player: any) =>
        player.username === activePlayer.username &&
        player.pin === activePlayer.pin
    );

    if (playerIndex === -1) return;

    const playerData = registeredPlayers[playerIndex];

    // Update guessed letters and used letters
    if (selectedWord.includes(letter)) {
      setGuessedLetters((prev) => new Set(prev.add(letter)));
    } else {
      setIncorrectGuesses((prev) => prev + 1);
      playerData.attemptsLeft -= 1; // Decrease attemptsLeft
    }

    setUsedLetters((prev) => {
      const updatedUsedLetters = new Set(prev.add(letter));
      playerData.usedLetters = Array.from(updatedUsedLetters);
      registeredPlayers[playerIndex] = playerData;
      localStorage.setItem(
        "registeredPlayers",
        JSON.stringify(registeredPlayers)
      );
      return updatedUsedLetters;
    });

    // Disable the button and mark it as used
    button.disabled = true;
    button.classList.add("used");
    setUsedLetters((prev) => new Set(prev).add(letter));

    // Check for win or loss
    if (isWin()) {
      setGameOver(true);

      // Update wins
      setWins((prevWins) => {
        const newWins = prevWins + 1;
        registerdPlayers[getActivePlayerIndex()].wins += 1; // Increment wins in local storage
        localStorage.setItem(
          "registeredPlayers",
          JSON.stringify(registeredPlayers)
        );
        return newWins;
      });

      // Update streak
      setStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        registerdPlayers[getActivePlayerIndex()].streak += 1; // Increment streak in local storage
        localStorage.setItem(
          "registeredPlayers",
          JSON.stringify(registeredPlayers)
        );
        return newStreak;
      });

      // Save updated player data to local storage
      registeredPlayers[playerIndex] = playerData;
      localStorage.setItem(
        "registeredPlayers",
        JSON.stringify(registeredPlayers)
      );
    } else if (playerData.attemptsLeft <= 0) {
      setGameOver(true);

      // Reset streak on loss
      setStreak(0);
      playerData.streak = 0; // Reset streak in local storage

      // Save updated player data to local storage
      registeredPlayers[playerIndex] = playerData;
      localStorage.setItem(
        "registeredPlayers",
        JSON.stringify(registeredPlayers)
      );
    }
  };

  // 🎯 Win/loss conditions
  useEffect(() => {
    if (!selectedWord) return;

    const win = selectedWord
      .split("")
      .every((letter) => guessedLetters.has(letter));
    const lose = incorrectGuesses >= maxMistakes[difficulty];

    if (win || lose) {
      setGameOver(true);
      setStreak(win ? streak + 1 : 0);
      setWins(win ? wins + 1 : wins);
    }
  }, [guessedLetters, incorrectGuesses]);

  useEffect(() => {
    const activePlayer = getActivePlayer();
    if (activePlayer) {
      const registeredPlayers = getRegisteredPlayers();
      const playerData = registeredPlayers.find(
        (player: any) =>
          player.username === activePlayer.username &&
          player.pin === activePlayer.pin
      );

      if (playerData) {
        setGuessedLetters(new Set(playerData.guessedLetters || []));
        setUsedLetters(new Set(playerData.usedLetters || []));
        setIncorrectGuesses(
          playerData.maxMistakes - playerData.attemptsLeft || 0
        );
        setSelectedWord(playerData.answer || ""); // Ensure selectedWord is set
        setRiddle(playerData.riddle || "");
        setDifficulty(playerData.difficulty || "normal");
        setWins(playerData.wins || 0); // Load wins
        setStreak(playerData.streak || 0); // Load streak
        setGameOver(playerData.gameOver || false);
      }
    }
  }, []);

  return (
    <section className="game-container">
      {gameOver && isWin() && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={1.5}
        />
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
