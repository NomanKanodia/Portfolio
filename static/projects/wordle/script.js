const secretWord = "apple";
let currentGuess = "";
let attempts = 0;

function createGrid() {
    const grid = document.getElementById('grid');
    for (let i = 0; i < 30; i++) { // 6 attempts * 5 letters
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', `cell${i}`);
        grid.appendChild(cell);
    }
}

function submitGuess() {
    const guessInput = document.getElementById('guessInput');
    currentGuess = guessInput.value.toLowerCase();
    if (currentGuess.length !== 5) {
        showMessage("Please enter a 5-letter word.");
        return;
    }

    if (attempts >= 6) {
        showMessage("You've used all your attempts!");
        return;
    }

    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell${attempts * 5 + i}`);
        cell.textContent = currentGuess[i];

        if (currentGuess[i] === secretWord[i]) {
            cell.classList.add('correct');
        } else if (secretWord.includes(currentGuess[i])) {
            cell.classList.add('present');
        } else {
            cell.classList.add('absent');
        }
    }

    attempts++;
    guessInput.value = '';

    if (currentGuess === secretWord) {
        showMessage("Congratulations! You've guessed the word!");
    } else if (attempts >= 6) {
        showMessage(`Game over! The word was "${secretWord}".`);
    }
}

function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

window.onload = createGrid;