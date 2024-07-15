const words = ["example", "keyboard", "typing", "game", "javascript", "html", "css"];
let currentWordIndex = 0;

const wordContainer = document.getElementById('word-container');
const inputBox = document.getElementById('input-box');
const keys = document.querySelectorAll('.key');

function displayWord() {
    const word = words[currentWordIndex];
    let displayedWord = '';
    for (let i = 0; i < word.length; i++) {
        if (inputBox.value.length > i) {
            if (inputBox.value[i] === word[i]) {
                displayedWord += `<span class="correct">${word[i]}</span>`;
            } else {
                displayedWord += `<span class="incorrect">${inputBox.value[i]}</span>`;
            }
        } else {
            displayedWord += word[i];
        }
    }
    wordContainer.innerHTML = displayedWord;
}

function highlightKey(key) {
    keys.forEach(k => {
        if (k.dataset.key === key) {
            k.classList.add('highlight');
            setTimeout(() => {
                k.classList.remove('highlight');
            }, 100);
        }
    });
}

inputBox.addEventListener('input', () => {
    displayWord();
});

inputBox.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        const word = words[currentWordIndex];
        if (inputBox.value === word) {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            inputBox.value = "";
            displayWord();
        } else {
            inputBox.classList.add('incorrect-input');
            setTimeout(() => {
                inputBox.classList.remove('incorrect-input');
            }, 500);
        }
    } else {
        highlightKey(e.key.toLowerCase());
    }
});

displayWord();
