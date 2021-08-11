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
let testText = "Abcdefghij"+catFace+dogFace+grinFace;

// Buttons

let showGrid = true;
const gridButton = document.createElement('button');
gridButton.style.display = 'block';
gridButton.textContent = "Show Grid";

gridButton.addEventListener('click', () => {
    showGrid = !showGrid;
});

document.body.append(gridButton);

let showCenter = true;
const centerButton = document.createElement('button');
centerButton.style.display = 'block';
centerButton.textContent = "Show Center";

centerButton.addEventListener('click', () => {
    showCenter = !showCenter;
});

document.body.append(centerButton);

let showTextBox = true;
const textBoxButton = document.createElement('button');
textBoxButton.style.display = 'block';
textBoxButton.textContent = "Show Text Box";

textBoxButton.addEventListener('click', () => {
    showTextBox = !showTextBox;
});

document.body.append(textBoxButton);

// locations
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

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
            x: 0,
            y: 0,
            fillStyle: 'white',
            font: '50px Arial'    
        });    
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    const textMetrics = ctx.measureText(testText);

    ctx.fillText(testText, centerX - textMetrics.width/2, centerY);

    game.requestID = requestAnimationFrame(draw);
}

// start
game.requestID = requestAnimationFrame(draw);