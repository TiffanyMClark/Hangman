//connects login.html to hangman.html
const users = []; // Array to store user data
const pins = []; // Array to store PINs

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
users.push({ username, pin });
alert("Registration successful!");

// Clear input fields
document.getElementById("username").value = "";
document.getElementById("pin").value = "";
document.getElementById("confirm-pin").value = "";
}

function login() {
  const username = document.getElementById("username").value;
  const pin = document.getElementById("pin").value; 

  // Check if username and pin are correct
  if (username === "username" && pin === "pin") {
    // Redirect to hangman.html
    window.location.href = "../pages/hangman.html";
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

// Add event listener for the forgot pin button
document.getElementById("forgot-pin-button").addEventListener("click", function() {
  alert("Your PIN is your birth year.");
});

// Add event listener for go to login button
document.getElementById("goToHangman").addEventListener("click", function() {
  window.location.href = "./pages/Hangman.tsx"; // Redirect to login page
});

