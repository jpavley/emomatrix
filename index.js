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

// locations
let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

// drawing and animation
const game = {requestID: ''};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    grafix.drawGrid(canvas, ctx);
    grafix.drawCenter(canvas, ctx);

    grafix.drawTextBox(ctx, canvas, {
        message: testText,
        x: 0,
        y: 0,
        fillStyle: 'white',
        font: '50px Arial'    
    });

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    const textMetrics = ctx.measureText(testText);

    ctx.fillText(testText, centerX - textMetrics.width/2, centerY);

    //game.requestID = requestAnimationFrame(draw);
}

// start
game.requestID = requestAnimationFrame(draw);

