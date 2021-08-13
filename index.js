// Emo Matrix
// Copyright (c) John Pavley

import * as grafix from './grafix.js';

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

let fps = 0;
let times = [];

function drawFrameRate(ctx, timeStamp) {

    while (times.length > 0 && times[0] <= (timeStamp - 1000)) {
        times.shift(); // throw away first element
    }

    times.push(timeStamp);
    fps = times.length;

    ctx.fillStyle = 'yellow';
    ctx.font = '14px monospace';
    ctx.fillText(`FPS: ${fps}`, 830, 575);    
}

document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

// emojis
let catFace = String.fromCodePoint(0x1F431);
let dogFace = String.fromCodePoint(0x1F436);
let grinFace = String.fromCodePoint(0x1F600);
let testText = catFace+grinFace+dogFace;

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
        drawFrameRate(ctx, timeStamp);
    }

    game.requestID = requestAnimationFrame(draw);
}

// start/init

grafix.buttonBar();
game.requestID = requestAnimationFrame(draw);