//connects login.html to hangman.html

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Check if username and password are correct
  if (username === "user" && password === "password") {
    // Redirect to hangman.html
    window.location.href = "hangman.html";
  } else {
    alert("Invalid username or password");
  }
}


