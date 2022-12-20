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

// Coloca as cores na paleta
const fillPalette = () => {
    for (let index = 1; index <= 4; index += 1) {
        const color = document.createElement('div');
        color.style.backgroundColor = paletteColors[`${index}`];
        color.classList.add('color');
        palette.appendChild(color);
    }
}

// Gera cores aleatórias para a paleta
const randomColors = () => {
    for (let index = 1; index <= 3; index += 1) {
        // from https://css-tricks.com/snippets/javascript/random-hex-color/
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        // -------------------------------------
        const colors = document.getElementsByClassName('color');
        paletteColors[`${index+1}`] = "#" + randomColor;
        colors[index].style.backgroundColor = "#" + randomColor;
    }
    localStorage.setItem('colorPalette', JSON.stringify(paletteColors));
}

// Chama funções

fillPalette();

// Listeners

randomColorsBtn.addEventListener('click', randomColors);