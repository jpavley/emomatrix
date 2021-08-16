// Emo Matrix
// Copyright (c) John Pavley

import * as grafix from './grafix.js';
import * as emoji from './emoji.js';

// canvas and context
const canvas = document.createElement('canvas');
canvas.setAttribute('width', innerWidth);
canvas.setAttribute('height', innerHeight);
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

// emoji sprites

const sprites = {
    max: 0,
    width: 0,
    font: '50px Arial',
    list: []
};

function initSprites(canvas) {

    ctx.save();
    ctx.font = sprites.font;
    const spriteMetric = ctx.measureText(testText);
    ctx.restore();


    const spriteCount = Math.floor(canvas.width/spriteMetric.width);
    //console.log(spriteCount);

    sprites.max = spriteCount;
    sprites.width = spriteMetric.width;

    for (let column = 0; column < sprites.max; column += 1) {
        createSprite(canvas, column);
    }
}

const spriteProps = {
    codePoint: '',
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    speed: 0,
    font: ''
};

function createSprite(canvas, column) {
    const randomEmojiIndex = Math.floor(Math.random() * emoji.greenEmojiCodepoints.length)
    const randomEmojiCodepoint = emoji.greenEmojiCodepoints[randomEmojiIndex];
    const columnX = column * sprites.width;
    const randomSpeed = Math.floor(Math.random() * 6) + 1;
    const font = sprites.font;
    sprites.list.push({
        codePoint: randomEmojiCodepoint,
        x: columnX,
        y: 0,
        width: 0,
        height: 0,
        speed: randomSpeed, 
        font: font   
    });
}

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

    if (grafix.buttonBarToggles.showMouseCoordinates) {
        drawMouseMove(ctx);
    }

    if (grafix.buttonBarToggles.showFPS) {
        grafix.drawFrameRate(ctx, timeStamp);
    }

    sprites.list.forEach((sprite, index) => {
        sprite.y += sprite.speed;

        if (sprite.y > canvas.height + 50) {
            // remove from screen
            let removed = sprites.list.splice(index, 1)[0];
            const column = sprite.x / sprites.width;
            console.log(column);
            createSprite(canvas, column);
        }
        ctx.save();
        ctx.beginPath();
        ctx.font = sprite.font;
        ctx.fillText(String.fromCodePoint(sprite.codePoint), sprite.x, sprite.y);
        ctx.fillText(String.fromCodePoint(sprite.codePoint), sprite.x, sprite.y - 50);
        ctx.fillText(String.fromCodePoint(sprite.codePoint), sprite.x, sprite.y - 100);
        ctx.fillText(String.fromCodePoint(sprite.codePoint), sprite.x, sprite.y - 150);
        ctx.fillText(String.fromCodePoint(sprite.codePoint), sprite.x, sprite.y - 200);
        ctx.restore();
    });

    game.requestID = requestAnimationFrame(draw);
}

// start/init

//grafix.buttonBar();
initSprites(canvas);
game.requestID = requestAnimationFrame(draw);