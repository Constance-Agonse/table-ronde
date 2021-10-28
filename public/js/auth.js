const getPassword = document.getElementById("password")
const getHidden = document.getElementById("hidden-sentence")

getPassword.onmouseover = displayMessage;

function displayMessage() {
    getHidden.style.visibility = "visible";
    console.log("helllooo")
}