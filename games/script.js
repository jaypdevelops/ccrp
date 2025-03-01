// The correct answer to the riddle
const correctRiddleAnswer = "echo"; 

// The final code to unlock the envelope
const finalCode = "3142"; 

// Check if the riddle is answered correctly
function checkRiddle() {
    const answer = document.getElementById("riddle-answer").value.toLowerCase().trim();
    
    if (answer === correctRiddleAnswer) {
        alert("Correct! A hidden code has appeared...");
        document.getElementById("code-entry").classList.remove("hidden");
    } else {
        alert("Try again!");
    }
}

// Check if the entered code is correct
function checkCode() {
    const enteredCode = document.getElementById("code-input").value.trim();
    
    if (enteredCode === finalCode) {
        document.getElementById("envelope").classList.remove("locked");
        document.getElementById("envelope").classList.add("unlocked");
    } else {
        alert("Wrong code! Look for clues.");
    }
}