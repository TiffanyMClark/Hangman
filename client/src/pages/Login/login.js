//connects login.html to hangman.html
const users = []; // Array to store user data
const pins = []; // Array to store PINs

// const REGISTERD_PLAYERS_KEY = "registeredPlayers"; // Key for local storage
// const registerdPlayers = JSON.parse(localStorage.getItem(REGISTERD_PLAYERS_KEY)) || []; // Array to store registered players

// const activeUser = {
//   username: "",
//   pin: ""
// }

function register() {
  const username = document.getElementById("username").value;
  const pin = document.getElementById("pin").value;
  const confirmPin = document.getElementById("confirm-pin").value;

   // Check if username is already taken
   if (users.some(user => user.username === username)) {
    alert("Username is already taken. Please choose another.");
    return;
  }


// Check if pins match
if (pin !== confirmPin) {
    alert("Pins do not match. Please try again.");
    return;
}

// Register the user
// storeUserData(username, pin);
users.push({ username, pin });

alert("Registration successful!");

// Clear input fields
document.getElementById("username").value = "";
document.getElementById("pin").value = "";
document.getElementById("confirm-pin").value = "";
// more testing
console.log("Registered users:", users);
}

function login() {
  const username = document.getElementById("username").value;
  const pin = document.getElementById("pin").value; 

  // Check if username and pin are correct
  if (username === "username" && pin === "pin") {
    // Redirect to hangman.html
    window.location.href = "../pages/hangman.html"; //call loadSaveState(), to be written
  } else {
    alert("Invalid username or pin. Please try again.");
  }
} 

// Add event listener to the login button
document.getElementById("login-button").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission
  login(); // Call the login function
});

// Add event listener to the enter key
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    login(); // Call the login function
  }
});

// Add event listener for the register button
document.getElementById("register-button").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission
  register(); // Call the register function
});






