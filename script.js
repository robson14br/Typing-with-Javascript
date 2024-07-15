const words = ["example", "keyboard", "typing", "game", "javascript", "html", "css", "casa", "cachorro", "gato", "mesa", "cadeira", "livro", "computador", "janela", "porta", "telefone", "lápis", "caneta", "caderno", "filme", "música", "tempo", "chuva", "sol", "lua", "estrela", "mar", "rio", "montanha", "campo", "cidade", "bairro", "rua", "avenida", "parque", "praia", "piscina", "carro", "bicicleta", "ônibus", "avião", "barco", "trem", "motor", "velocidade", "aceleração", "freio", "volante", "pneu", "gasolina", "eletricidade", "energia", "luz", "sombra", "cor", "branco", "preto", "vermelho", "azul", "verde", "amarelo", "laranja", "roxo", "rosa", "cinza", "prata", "ouro", "bronze", "metal", "plástico", "madeira", "vidro", "cerâmica", "tecido", "algodão", "seda", "lã", "fibra", "fruta", "maçã", "banana", "laranja", "uva", "abacaxi", "morango", "limão", "melancia", "pera", "pêssego", "amora", "framboesa", "mirtilo", "figo"];

let currentWordIndex = getRandomIndex(words.length);

const wordContainer = document.getElementById("word-container");
const inputBox = document.getElementById("input-box");
const keys = document.querySelectorAll(".key");
const submitButton = document.querySelector(".submit-button");

const PRESS_AUDIO_POOL_SIZE = 3; 
let pressSoundPool = [];


for (let i = 0; i < PRESS_AUDIO_POOL_SIZE; i++) {
  const pressSound = new Audio("src/press.mp3");
  pressSoundPool.push(pressSound);
}


function getFreePressSound() {
  for (let i = 0; i < pressSoundPool.length; i++) {
    const sound = pressSoundPool[i];
    if (sound.currentTime === 0 || sound.paused || sound.ended) {
      return sound;
    }
  }
  return pressSoundPool[0]; 
}

// Função para gerar índice aleatório
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
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

// Função para destacar a tecla pressionada e reproduzir som
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


inputBox.addEventListener('input', () => {
  displayWord();
});

// Manipulador de eventos para teclado e toque
function handleInputEvent(event) {
  const key = event.key.toLowerCase();
  highlightKey(key);
}

inputBox.addEventListener('keyup', handleInputEvent);
inputBox.addEventListener('touchstart', handleInputEvent);

// Evento de clique no botão de submit
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  handleSubmit();
});

// Função para tratar o submit da palavra digitada
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
