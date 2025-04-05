const form = document.getElementById("form");
const username = document.getElementById("username");
const pin = document.getElementById("pin");
const confirmPin = document.getElementById("confirm-pin");

form.addEventListener("submit", (e) => { 
    //e.preventDefault();
    //validateInputs();

    let errors = []

    if(username_input) {
        errors = getSignupFormErrors(username.value, pin.value, confirmPin.value);
    } else{
        errors = getLoginFormErrors(pin.value);
    }

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(". ");
    }
}
)

function getSignupFormErrors(username, pin, confirmPin) {
    let errors = [];

    if (username === "" || username == null) {
        errors.push("Username is required");
        username_input.parentElement.classList.add("incorrect");
    }
    if (pin === "" || pin == null) {
        errors.push("Pin is required");
        pin_input.parentElement.classList.add("incorrect");
    }
    if (pin.length < 4) {
        errors.push("Pin must have at least 4 characters");
        pin_input.parentElement.classList.add("incorrect");
    }
    if (pin !== confirmPin) {
        errors.push("Pin does not match repeated pin");
        pin_input.parentElement.classList.add("incorrect");
        confirmPin_input.parentElement.classList.add("incorrect");
    }

    return errors;
}
function getLoginFormErrors(pin) {
    let errors = [];

    if (pin === "" || pin == null) {
        errors.push("Pin is required");
        pin_input.parentElement.classList.add("incorrect");
    }

    return errors;
}
const allInputs = [username_input, pin_input, confirmPin_input]


allInputs.forEach(input => {
    input.addEventListener('input', () => {
      if(input.parentElement.classList.contains('incorrect')){
        input.parentElement.classList.remove('incorrect')
        error_message.innerText = ''
      }
    })
  })

  function goToHangman() {
    window.location.href = '../hangman.html';
  }