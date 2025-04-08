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
import { getActivePlayerIndex, getRegisteredPlayers, getActivePlayer } from "../../utils/saveState";

const activePlayer = getActivePlayerIndex();
const registerdPlayers = JSON.parse(
  localStorage.getItem("registeredPlayers") || "[]"
); // Array to store registered players
//const activePlayerData = registerdPlayers[activePlayer]; // Get the active player data

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

    await setSelectedWord(mockRiddle.answer.toLowerCase());
    setRiddle(mockRiddle.question);

    registerdPlayers[activePlayer].answer = mockRiddle.answer.toLowerCase(); // Set the riddle for the active player
    registerdPlayers[activePlayer].riddle = mockRiddle.question; // Set the riddle for the active player
    registerdPlayers[activePlayer].maxMistakes = maxMistakes[difficulty]; // Set the max mistakes for the active player
    registerdPlayers[activePlayer].gameOver = false;// Set attempts left based on difficulty
    //registerdPlayers[activePlayer].wins = wins; // Set wins for the active player
    //registerdPlayers[activePlayer].streak = streak; // Set streak for the active player
    localStorage.setItem(
      "registeredPlayers",
      JSON.stringify(registerdPlayers)
    ); // Save updated game state to local storage
  };

  //registerdPlayers[activePlayer].wins = wins; // Set wins for the active player
  //registerdPlayers[activePlayer].streak = streak; // Set streak for the active player

  const resetGame = async () => {
    setIncorrectGuesses(0);
    setGuessedLetters(new Set());
    setUsedLetters(new Set());
    registerdPlayers[activePlayer].usedLetters = []; // Reset attempts left
    setGameOver(false); // Reset game over state
    await fetchNewWord();
  };

  const changeDifficulty = (newDifficulty: "easy" | "normal" | "hard") => {
    setDifficulty(newDifficulty);
    registerdPlayers[activePlayer].difficulty = newDifficulty; // Set the difficulty for the active player
    localStorage.setItem(
      "registeredPlayers",
      JSON.stringify(registerdPlayers)
    ); // Save updated difficulty to local storage
    resetGame();
  };

  const isWin = () => {
    return [...selectedWord].every((letter) => guessedLetters.has(letter));
  };

  // const handleGuess = (letter: string, button: HTMLButtonElement) => {
  //   if (gameOver) {
  //     return; // Don't allow guesses if the game is over
  //   }
  //   if (incorrectGuesses >= maxMistakes[difficulty]) {
  //     setGameOver(true);
  //     setStreak(0); // Reset streak if lose
  //     return;
  //   }

  //   if (selectedWord.includes(letter)) {
  //     setGuessedLetters((prev) => new Set(prev.add(letter)));
  //   } else {
  //     setIncorrectGuesses((prev) => prev + 1);
  //     registerdPlayers[activePlayer].attemptsLeft = registerdPlayers[activePlayer].maxMistakes - 1; // Decrease attempts left
  //     localStorage.setItem(
  //       "registeredPlayers",
  //       JSON.stringify(registerdPlayers)
  //     ); // Save updated attempts left to local storage
  //   }

  //   button.disabled = true;
  //   button.classList.add("used");
  //   setUsedLetters((prev) => new Set(prev.add(letter)));

  //   if (isWin()) {
  //     setGameOver(true);
  //     setWins(wins + 1); // Increment wins when the player wins
  //     setStreak(streak + 1); // Increment streak for a win
  //   }
  // };

  const handleGuess = (letter: string, button: HTMLButtonElement) => {
    if (gameOver) return;
  
    const activePlayer = getActivePlayer();
    if (!activePlayer) return;
  
    const registeredPlayers = getRegisteredPlayers();
    const playerIndex = registeredPlayers.findIndex(
      (player: any) =>
        player.username === activePlayer.username && player.pin === activePlayer.pin
    );
  
    if (playerIndex === -1) return;
  
    const playerData = registeredPlayers[playerIndex];
  
    // Update guessed letters
    if (selectedWord.includes(letter)) {
      setGuessedLetters((prev) => new Set(prev.add(letter)));
      playerData.usedLetters = [...(playerData.usedLetters || []), letter];
    } else {
      setIncorrectGuesses((prev) => prev + 1);
      playerData.usedLetters = [...(playerData.usedLetters || []), letter];
    }
  
    // Save updated player data to local storage
    registeredPlayers[playerIndex] = playerData;
    localStorage.setItem("registeredPlayers", JSON.stringify(registeredPlayers));
  
    // Disable the button and mark it as used
    button.disabled = true;
    button.classList.add("used");
    setUsedLetters((prev) => new Set(prev.add(letter)));
  
    // Check for win or loss
    if (isWin()) {
      setGameOver(true);
      setWins((prevWins) => {
        const newWins = prevWins + 1;
        playerData.wins = newWins; // Increment wins
        return newWins;
      });
      setStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        playerData.streak = newStreak; // Increment streak
        return newStreak;
      });
      registeredPlayers[playerIndex] = playerData;
      localStorage.setItem("registeredPlayers", JSON.stringify(registeredPlayers));
    } else if (incorrectGuesses >= maxMistakes[difficulty]) {
      setGameOver(true);
      setStreak(0);
      playerData.streak = 0; // Reset streak
      registeredPlayers[playerIndex] = playerData;
    }
  };

  useEffect(() => {
    fetchNewWord();
    const activePlayer = getActivePlayer();
  if (activePlayer) {
    const registeredPlayers = getRegisteredPlayers();
    const playerData = registeredPlayers.find(
      (player: any) =>
        player.username === activePlayer.username && player.pin === activePlayer.pin
    );

    if (playerData) {
      //setGuessedLetters(new Set(playerData.guessedLetters || []));
      setUsedLetters(new Set(playerData.usedLetters || []));
      setIncorrectGuesses(playerData.maxMistakes - playerData.attemptsLeft || 0);
      setSelectedWord(playerData.answer || "");
      setRiddle(playerData.riddle || "");
      setDifficulty(playerData.difficulty || "normal");
      setWins(playerData.wins || 0);
      setStreak(playerData.streak || 0);
      setGameOver(playerData.gameOver || false);
    }
  }
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
