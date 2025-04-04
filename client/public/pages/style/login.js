document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");
  const modal = document.getElementById("error");
  const closeModal = document.querySelector(".close-button");

  if (loginButton) {
    loginButton.addEventListener("click", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("pin").value.trim();

      if (username === "" || password === "") {
        modal.style.display = "block";
        return;
      }

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.href = "main/main.html";
    });
  }
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
});

const postEl = document.querySelector("post");

function storeLocalStorage(data) {
  const existingData = readLocalStorage();

  existingData.push(data);

  localStorage.setItem("post", JSON.stringify(existingData));
}

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

function renderLastRegisteredUser() {
  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (storedUsername && storedPassword) {
    console.log(`Stored Username: ${storedUsername}`);

    console.log(`Stored Password: ${storedPassword}`);
  } else {
    console.log("No user data found in localStorage.");
  }
}

function redirectPage(url) {
  window.location.href = url;
}

/*
//connects login.html to hangman.html
const users = []; // Array to store user data
const pins = []; // Array to store PINs

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