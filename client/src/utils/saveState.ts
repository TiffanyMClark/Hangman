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
    difficulty: string;
    lettersLeft: string[];
    attemptsLeft: number;
    riddle: string;
    answer: string;
    wins: number;
    streak: number;
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
    const existingIndex = gameStates.findIndex(
      (state) => state.username === gameState.username && state.pin === gameState.pin
    );
  
    if (existingIndex !== -1) {
      // Update existing game state
      gameStates[existingIndex] = gameState;
    } else {
      // Add new game state
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
    difficulty: string,
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
    };
  
    saveGameState(newGameState);
    return newGameState;
  };

  export const initializeGameState = (
    username: string,
    pin: string,
    difficulty: string,
    riddle: string,
    answer: string
  ): GameState => {
    const registeredPlayers = getRegisteredPlayers();
  
    // Check if the user exists
    const userExists = registeredPlayers.some(
      (player) => player.username === username && player.pin === pin
    );
  
    if (!userExists) {
      // Add new user to registeredPlayers
      registeredPlayers.push({ username, pin });
      localStorage.setItem(REGISTERED_PLAYERS_KEY, JSON.stringify(registeredPlayers));
    }
  
    // Load existing game state or create a new one
    const existingGameState = loadGameState(username, pin);
    if (existingGameState) {
      return existingGameState;
    }
  
    // Create a new game state if none exists
    return createNewGameState(username, pin, difficulty, riddle, answer);
  };