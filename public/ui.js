// UI elements to work with
const signInButton = document.getElementById('signIn');
const signOutButton = document.getElementById('signOut');
const callWebApiButton = document.getElementById('callApiButton');
const label = document.getElementById('label');
const response = document.getElementById("response");

// updates the UI post login/token acquisition
function updateUI() {

    signInButton.classList.add('d-none');
    signOutButton.classList.remove('d-none');

}

// debug helper
function logMessage(s) {
    response.appendChild(document.createTextNode('\n' + s + '\n'));
}
