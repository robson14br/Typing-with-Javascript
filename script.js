const words = ["example", "keyboard", "typing", "game", "javascript", "html", "css"];
let currentWordIndex = 0;

const wordContainer = document.getElementById('word-container');
const inputBox = document.getElementById('input-box');
const keys = document.querySelectorAll('.key');


const PRESS_AUDIO_POOL_SIZE = 5;
let pressSoundPool = [];

for (let i = 0; i < PRESS_AUDIO_POOL_SIZE; i++) {
    const pressSound = new Audio('src/press.mp3');
    pressSoundPool.push(pressSound);
}

function getFreePressSound() {
    for (let i = 0; i < pressSoundPool.length; i++) {
        if (pressSoundPool[i].currentTime === 0 || pressSoundPool[i].ended) {
            return pressSoundPool[i];
        }
    }
    return pressSoundPool[0];
}

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

    
    const pressSound = getFreePressSound();
    pressSound.currentTime = 0;
    pressSound.play();
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
            playEnterSound();
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


function playEnterSound() {
    const enterSound = new Audio('src/enter.mp3');
    enterSound.currentTime = 0;
    enterSound.play();
}

displayWord();
