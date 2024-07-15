const words = ["example", "keyboard", "typing", "game", "javascript", "html", "css", "casa", "cachorro", "gato", "mesa", "cadeira", "livro", "computador", "janela", "porta", "telefone", "lápis", "caneta", "caderno", "filme", "música", "tempo", "chuva", "sol", "lua", "estrela", "mar", "rio", "montanha", "campo", "cidade", "bairro", "rua", "avenida", "parque", "praia", "piscina", "carro", "bicicleta", "ônibus", "avião", "barco", "trem", "motor", "velocidade", "aceleração", "freio", "volante", "pneu", "gasolina", "eletricidade", "energia", "luz", "sombra", "cor", "branco", "preto", "vermelho", "azul", "verde", "amarelo", "laranja", "roxo", "rosa", "cinza", "prata", "ouro", "bronze", "metal", "plástico", "madeira", "vidro", "cerâmica", "tecido", "algodão", "seda", "lã", "fibra", "fruta", "maçã", "banana", "laranja", "uva", "abacaxi", "morango", "limão", "melancia", "pera", "pêssego", "amora", "framboesa", "mirtilo", "figo"];

let currentWordIndex = getRandomIndex(words.length);

const wordContainer = document.getElementById("word-container");
const inputBox = document.getElementById("input-box");
const keys = document.querySelectorAll(".key");
const submitButton = document.querySelector(".submit-button");

const PRESS_AUDIO_POOL_SIZE = 5;
let pressSoundPool = [];

for (let i = 0; i < PRESS_AUDIO_POOL_SIZE; i++) {
  const pressSound = new Audio("src/press.mp3");
  pressSoundPool.push(pressSound);
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
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
  let displayedWord = "";
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
  keys.forEach((k) => {
    if (k.dataset.key === key) {
      k.classList.add("highlight");
      setTimeout(() => {
        k.classList.remove("highlight");
      }, 100);
    }
  });

  const pressSound = getFreePressSound();
  pressSound.currentTime = 0;
  pressSound.play();
}

inputBox.addEventListener("input", () => {
  displayWord();
});

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSubmit();
  } else {
    highlightKey(e.key.toLowerCase());
  }
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  const word = words[currentWordIndex];
  if (inputBox.value.trim().toLowerCase() === word) {
    currentWordIndex = getRandomIndex(words.length);
    inputBox.value = "";
    displayWord();
    playEnterSound();
  } else {
    inputBox.classList.add("incorrect-input");
    setTimeout(() => {
      inputBox.classList.remove("incorrect-input");
    }, 500);
  }
}

function playEnterSound() {
  const enterSound = new Audio("src/enter.mp3");
  enterSound.currentTime = 0;
  enterSound.play();
}

displayWord();
