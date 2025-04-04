

const register = getElectById("register-button"); 
const username = getElectById("username").value;
const pin = getElectById("pin").value;
const users = []; // Array to store registered users
const pins = []; // Array to store PINs


register.addEventListener("submit", f(e) {
