let incorrectGuesses = 0;
let currentUser = localStorage.getItem("currentUser") || null;
let selectedWord = "";
let guessedLetters = new Set();

const bodyParts = [
  "head",
  "body",
  "left-arm",
  "right-arm",
  "left-leg",
  "right-leg",
];

// Updates the Hangman figure
const updateHangman = () => {
  if (incorrectGuesses < bodyParts.length) {
    document.getElementById(bodyParts[incorrectGuesses]).style.display =
      "block";
    incorrectGuesses++;

    if (incorrectGuesses === bodyParts.length) {
      setTimeout(() => {
        alert(`Game Over!`);
        if (currentUser) updateScore(currentUser, "loss");
        resetGame();
      }, 500);
    }
  }
};

// Handle user guesses
function handleGuess(letter) {
  if (selectedWord.includes(letter)) {
    guessedLetters.add(letter);
    updateDisplay();
    if (isWin()) {
      setTimeout(() => {
        alert("Congratulations!");
        updateScore(currentUser, "win");
        resetGame();
      }, 500);
    }
  } else {
    updateHangman();
  }
}

// Check if user won
function isWin() {
  return [...selectedWord].every((letter) => guessedLetters.has(letter));
}

// Update displayed word
function updateDisplay() {
  let displayWord = [...selectedWord]
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
    .join(" ");
  document.getElementById("word-display").innerText = displayWord;
}

// Reset the game
async function resetGame() {
  incorrectGuesses = 0;
  guessedLetters.clear();

  // Hide all hangman parts
  bodyParts.forEach((part) => {
    document.getElementById(part).style.display = "none";
  });

  // Clear previous letter buttons
  createLetterButtons();

  // Fetch a new word from API
  await fetchNewWord();
}

// Fetch a new word from the API
async function fetchNewWord() {
  try {
    let mockData = [
      {
        riddle: "I speak without a mouth and hear without ears. What am I?",
        answer: "echo",
      },
    ];

    selectedWord = mockData[0].answer.toLowerCase();
    document.getElementById("riddle-display").innerText = mockData[0].riddle;
    updateDisplay();
  } catch (error) {
    console.error("Error fetching word:", error);
  }
}

// Update wins or losses
function updateScore(username, result) {
  if (!username) return;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    if (result === "win") {
      users[username].wins++;
    } else if (result === "loss") {
      users[username].losses++;
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function createLetterButtons() {
  const lettersContainer = document.getElementById("letters-container");
  lettersContainer.innerHTML = "";

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  alphabet.forEach((letter) => {
    let button = document.createElement("button");
    button.innerText = letter;
    button.classList.add("letter-button");
    button.onclick = () => {
      handleGuess(letter);
      button.disabled = true;
      button.classList.add("used");
    };

    lettersContainer.appendChild(button);
  });
}

// Handle Sign-up/Login
function handleSignUp(event) {
  event.preventDefault();
  const username = document.getElementById("new-username").value.trim();

  if (!username) {
    alert("Username cannot be empty.");
    return;
  }

  saveUser(username);
  localStorage.setItem("currentUser", username);
  currentUser = username;
  alert(`Welcome, ${username}! Your stats: Wins - 0, Losses - 0`);
}

// Save new user if they don't exist
function saveUser(username) {
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username]) {
    users[username] = { wins: 0, losses: 0 };
    localStorage.setItem("users", JSON.stringify(users));
  }
}

// Get user’s score
function getScore(username) {
  let users = JSON.parse(localStorage.getItem("users")) || {};
  return users[username] || { wins: 0, losses: 0 };
}

// Initialize game on page load
window.onload = () => {
  fetchNewWord();
  createLetterButtons();
};
