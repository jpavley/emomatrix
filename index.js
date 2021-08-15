// Emo Matrix
// Copyright (c) John Pavley

import * as grafix from './grafix.js';
import * as emoji from './emoji.js';

// canvas and context
const canvas = document.createElement('canvas');
canvas.setAttribute('width', 30 * grafix.tile.width);
canvas.setAttribute('height', 30 * grafix.tile.height);
canvas.style.backgroundColor = 'black';

// locations
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// mouse click

let clickX = centerX;
let clickY = centerY;

canvas.addEventListener('click', (e) => {
    clickX = e.offsetX;
    clickY = e.offsetY;
});

// mouse move

let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
});

function drawMouseMove(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.font = '14px monospace';
    ctx.fillText(`${mouseX},${mouseY}`, 35, 575);
}


document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

// emojis
let greenEmoji = String.fromCodePoint(emoji.greenEmojiCodepoints[40]);
let testText = greenEmoji;

// drawing and animation
const game = {requestID: ''};

function draw(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (grafix.buttonBarToggles.showGrid) {
        grafix.drawGrid(canvas, ctx);
    }

    if (grafix.buttonBarToggles.showCenter) {
        grafix.drawCenter(canvas, ctx);
    }

    if (grafix.buttonBarToggles.showTextBox) {
        grafix.drawTextBox(ctx, canvas, {
            message: testText,
            x: clickX,
            y: clickY,
            fillStyle: 'white',
            font: '50px Arial'    
        });    
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    const textMetrics = ctx.measureText(testText);

    ctx.fillText(testText, clickX, clickY);

    if (grafix.buttonBarToggles.showMouseCoordinates) {
        drawMouseMove(ctx);
    }

    if (grafix.buttonBarToggles.showFPS) {
        grafix.drawFrameRate(ctx, timeStamp);
    }

    game.requestID = requestAnimationFrame(draw);
}

// start/init

grafix.buttonBar();
game.requestID = requestAnimationFrame(draw);