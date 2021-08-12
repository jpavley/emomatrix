// Emo Matrix
// Copyright (c) John Pavley

import * as grafix from './grafix.js';

// canvas and context
const canvas = document.createElement('canvas');
canvas.setAttribute('width', 30 * grafix.tile.width);
canvas.setAttribute('height', 30 * grafix.tile.height);
canvas.style.backgroundColor = 'black';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

// emojis
let catFace = String.fromCodePoint(0x1F431);
let dogFace = String.fromCodePoint(0x1F436);
let grinFace = String.fromCodePoint(0x1F600);
let testText = "ABCdefgHij"+grinFace;

// Buttons

const buttonBar = document.createElement('div');
buttonBar.style.display = 'block';
document.body.append(buttonBar);

let showGrid = true;
const gridButton = document.createElement('button');
gridButton.textContent = "Toggle Grid";

gridButton.addEventListener('click', () => {
    showGrid = !showGrid;
});

buttonBar.append(gridButton);

let showCenter = true;
const centerButton = document.createElement('button');
centerButton.textContent = "Toggle Center";

centerButton.addEventListener('click', () => {
    showCenter = !showCenter;
});

buttonBar.append(centerButton);

let showTextBox = true;
const textBoxButton = document.createElement('button');
textBoxButton.textContent = "Toggle Text Box";

textBoxButton.addEventListener('click', () => {
    showTextBox = !showTextBox;
});

buttonBar.append(textBoxButton);

// locations
let centerX = 200; //canvas.width / 2;
let centerY = 200; //canvas.height / 2;

// drawing and animation
const game = {requestID: ''};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showGrid) {
        grafix.drawGrid(canvas, ctx);
    }

    if(showCenter) {
        grafix.drawCenter(canvas, ctx);
    }

    if(showTextBox) {
        grafix.drawTextBox(ctx, canvas, {
            message: testText,
            x: centerX,
            y: centerY,
            fillStyle: 'white',
            font: '50px Arial'    
        });    
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    const textMetrics = ctx.measureText(testText);

    ctx.fillText(testText, centerX, centerY);

    game.requestID = requestAnimationFrame(draw);
}

// start
game.requestID = requestAnimationFrame(draw);