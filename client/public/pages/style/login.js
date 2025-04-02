//connects login.html to hangman.html

function login() {
  const username = document.getElementById("username").value;
  const pin = document.getElementById("pin").number;

  // Check if username and pin are correct
  if (username === "username" && pin === "pin") {
    // Redirect to hangman.html
    window.location.href =  "../pages/hangman.html";
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

