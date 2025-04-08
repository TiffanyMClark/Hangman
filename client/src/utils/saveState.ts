/*

    TODO::
    Make gameState object hold following information:
    username, pin, difficulty, lettersLeft, attemptsLeft, riddle, answer, wins, streak,

    get username and pin from users array in local storage
    save gameState to local storage

    when login, if user exists, load gamestate from local storage with matching username and pin
    if user does not exist, create new user and save gamestate to local storage

*/

export interface GameState {
    username: string;
    pin: string;
    difficulty: "easy" | "normal" | "hard";
    lettersLeft: string[];
    attemptsLeft: number;
    riddle: string;
    answer: string;
    wins: number;
    streak: number;
    gameOver: boolean; // New property to track game over state
  }

  const REGISTERED_PLAYERS_KEY = "registeredPlayers";
  const GAME_STATES_KEY = "gameStates";
  const ACTIVE_PLAYER_KEY = "activePlayer";

  export const getRegisteredPlayers = (): { username: string; pin: string }[] => {
    return JSON.parse(localStorage.getItem(REGISTERED_PLAYERS_KEY) || "[]");
};

// Save the active player to local storage
export const setActivePlayer = (username: string, pin: string): void => {
  localStorage.setItem(ACTIVE_PLAYER_KEY, JSON.stringify({ username, pin }));
};

// Retrieve the active player from local storage
export const getActivePlayer = (): { username: string; pin: string } | null => {
  const activePlayer = localStorage.getItem(ACTIVE_PLAYER_KEY);
  return activePlayer ? JSON.parse(activePlayer) : null;
};

//Retrieve the index of the active player from the registeredPlayers array
export const getActivePlayerIndex = (): number => {
  const activePlayer = getActivePlayer();
  if (!activePlayer) {
    return -1; // No active player
  }

  const registeredPlayers = getRegisteredPlayers();
  return registeredPlayers.findIndex(
    (player) =>
      player.username === activePlayer.username && player.pin === activePlayer.pin
  );
};

// Retrieve the full player object from the registeredPlayers array
export const getCurrentPlayer = (): { username: string; pin: string } | null => {
  const activePlayer = getActivePlayer();
  if (!activePlayer) {
    return null; // No active player
  }

  const registeredPlayers = getRegisteredPlayers();
  return registeredPlayers.find(
    (player) =>
      player.username === activePlayer.username && player.pin === activePlayer.pin
  ) || null;
};

  //Saves the game state to local storage
  export const saveGameState = (gameState: GameState): void => {
    const gameStates: GameState[] = JSON.parse(localStorage.getItem(GAME_STATES_KEY) || "[]");
    const activePlayerIndex = getActivePlayerIndex();
  
    if (activePlayerIndex !== -1) {
      // Update the game state for the active player
      gameStates[activePlayerIndex] = gameState;
    } else {
      // Add a new game state if the active player index is not found
      gameStates.push(gameState);
    }
  
    localStorage.setItem(GAME_STATES_KEY, JSON.stringify(gameStates));
  };

  // Loads the game state from local storage
  export const loadGameState = (username: string, pin: string): GameState | null => {
    const gameStates: GameState[] = JSON.parse(localStorage.getItem(GAME_STATES_KEY) || "[]");
    return gameStates.find((state) => state.username === username && state.pin === pin) || null;
  };

  export const createNewGameState = (
    username: string,
    pin: string,
    difficulty: "easy" | "normal" | "hard", // Updated type
    riddle: string,
    answer: string
  ): GameState => {
    const newGameState: GameState = {
      username,
      pin,
      difficulty,
      lettersLeft: [...new Set(answer.split(""))], // Unique letters in the answer
      attemptsLeft: difficulty === "easy" ? 8 : difficulty === "normal" ? 6 : 4,
      riddle,
      answer,
      wins: 0,
      streak: 0,
      gameOver: false, // Initialize gameOver state
    };
  
    saveGameState(newGameState);
    return newGameState;
  };