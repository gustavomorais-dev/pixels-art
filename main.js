// Custom
let paletteColors = {
    1: 'black',
    2: '#4a362f',
    3: '#978f84',
    4: '#b7ae8f',
}

// localStorage?
if (localStorage.getItem('colorPalette')) {
    paletteColors = JSON.parse(localStorage.getItem('colorPalette'));
}

// Captura elementos
const palette = document.getElementById('color-palette');
const randomColorsBtn = document.getElementById('button-random-color');
const board = document.getElementById('pixel-board');

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
}

// Gera cores aleatórias para a paleta
const randomColors = () => {
    for (let index = 1; index <= 3; index += 1) {
        // from https://css-tricks.com/snippets/javascript/random-hex-color/
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        // -------------------------------------
        const colors = document.getElementsByClassName('color');
        paletteColors[`${index + 1}`] = "#" + randomColor;
        colors[index].style.backgroundColor = "#" + randomColor;
    }
    localStorage.setItem('colorPalette', JSON.stringify(paletteColors));
}

// Cria o board
const createBoard = () => {
    for (let index = 0; index < 25; index += 1) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        board.appendChild(pixel);
    }
}

// Seleciona cor da paleta
const selectColor = (event) => {
    const colors = document.getElementsByClassName('color');
    for (let index = 0; index < colors.length; index += 1) {
        colors[index].classList.remove('selected');
    }
    event.target.classList.add('selected');
}

// Chama funções

fillPalette();
createBoard();

// Listeners

randomColorsBtn.addEventListener('click', randomColors);