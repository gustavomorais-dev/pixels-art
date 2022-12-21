// Custom
let paletteColors = {
  1: 'black',
  2: '#4a362f',
  3: '#978f84',
  4: '#b7ae8f',
};
let selectedColor = 'black';
let boardColors = [];
let boardSize = 5;

// localStorage?
if (localStorage.getItem('colorPalette')) {
  paletteColors = JSON.parse(localStorage.getItem('colorPalette'));
}
if (localStorage.getItem('pixelBoard')) {
  boardColors = JSON.parse(localStorage.getItem('pixelBoard'));
}
if (localStorage.getItem('boardSize')) {
  boardSize = JSON.parse(localStorage.getItem('boardSize'));
}

// Captura elementos
const palette = document.getElementById('color-palette');
const randomColorsBtn = document.getElementById('button-random-color');
const board = document.getElementById('pixel-board');
const clearBtn = document.getElementById('clear-board');
const vqvBtn = document.getElementById('generate-board');
const pixelBoard = document.getElementById('pixel-board');

// Seleciona cor da paleta
const selectColor = (event) => {
  const colors = document.getElementsByClassName('color');
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
  selectedColor = event.target.style.backgroundColor;
};

// Coloca as cores na paleta
const fillPalette = () => {
  for (let index = 1; index <= 4; index += 1) {
    const color = document.createElement('div');
    color.style.backgroundColor = paletteColors[`${index}`];
    color.classList.add('color');
    palette.appendChild(color);
    color.addEventListener('click', selectColor);
  }
  const colors = document.getElementsByClassName('color');
  colors[0].classList.add('selected');
};

// Gera cores aleatórias para a paleta
const randomColors = () => {
  for (let index = 1; index <= 3; index += 1) {
    // from https://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const randomb = `rgb(${r},${g},${b})`;
    // -------------------------------------
    const colors = document.getElementsByClassName('color');
    paletteColors[`${index + 1}`] = randomColor;
    colors[index].style.backgroundColor = randomColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(paletteColors));
};

// Colore um pixel
const paint = (event) => {
    event.target.style.backgroundColor = selectedColor;
    saveBoard();
}

// Cria o board
const createBoard = () => {
  pixelBoard.style.width = `${42 * boardSize}px`;
  for (let index = 0; index < (boardSize ** 2); index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    if (boardColors.length > 0) { 
      pixel.style.backgroundColor = boardColors[index];
      pixel.style.backgroundColor = 'white';
    }
    board.appendChild(pixel);
    pixel.addEventListener('click', paint)
  }
  saveBoard();
};

// Modifica o tamanho do board
const setBoardSize = (event) => {
    // Valida o valor
    if (document.getElementById('board-size').value == '') {
        window.alert('Board inválido!');
        return;
    }
    // Corrige o valor
    if (document.getElementById('board-size').value < 5) {
        document.getElementById('board-size').value = 5;
    }
    if (document.getElementById('board-size').value > 50) {
        document.getElementById('board-size').value = 50;
    }
    // Deleta o board antigo
    for (let index = 0; index < (boardSize ** 2); index += 1) {
        const pixel = document.getElementsByClassName('pixel');
        pixel[0].remove(0);
    }
    localStorage.removeItem('pixelBoard');
    // Cria o novo board
    boardSize = parseInt(document.getElementById('board-size').value);
    createBoard();
}

// Limpa o quadro
const clearBoard = () => {
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
        pixels[index].style.backgroundColor = 'white';
    }
    saveBoard();
}

// Salva o quadro
const saveBoard = () => {
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
        boardColors[index] = pixels[index].style.backgroundColor;
    }
    localStorage.setItem('pixelBoard', (JSON.stringify(boardColors)));
    localStorage.setItem('boardSize', (JSON.stringify(boardSize)));
}

// Pinta o board com os dados salvos carregados
const paintBoard = () => {
    const pixels = document.getElementsByClassName('pixel');
    for (let index = 0; index < pixels.length; index += 1) {
        pixels[index].style.backgroundColor = boardColors[index];
    }
}

// Chama funções

fillPalette();
createBoard();

// Listeners

randomColorsBtn.addEventListener('click', randomColors);
clearBtn.addEventListener('click', clearBoard);
vqvBtn.addEventListener('click', setBoardSize);