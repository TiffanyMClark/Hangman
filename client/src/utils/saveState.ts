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

  const GAME_STATE_KEY = "gameState"; // Key for local storage

  //Saves the game state to local storage
  export const saveGameState = (gameState: GameState): void => {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(gameState));
  }

  // Loads the game state from local storage
  export const loadGameState = (): GameState | null => {
    const savedState = localStorage.getItem(GAME_STATE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  };

  // Clears the game state from local storage
  export const clearGameState = (): void => {
    localStorage.removeItem(GAME_STATE_KEY);
  };