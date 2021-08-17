// Emo Matrix
// Copyright (c) John Pavley

import * as grafix from './grafix.js';
import * as emoji from './emoji.js';

// canvas and context
const canvas = document.createElement('canvas');
canvas.setAttribute('width', innerWidth);
canvas.setAttribute('height', innerHeight);
canvas.style.backgroundColor = '#003300';

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


    const columnCount = Math.floor(canvas.width/spriteMetric.width);
    //console.log(spriteCount);

    sprites.max = columnCount;
    sprites.width = spriteMetric.width;

    for (let column = 0; column < sprites.max; column += 1) {
        createSprite(canvas, column);
    }
}

const columnProps = {
    codePoints: [],
    x: 0,
    y: 0,
    offset: 0,
    width: 0,
    speed: 0,
    font: ''
};

function getRandomEmojiCodePoint() {
    const randomEmojiIndex = Math.floor(Math.random() * emoji.greenEmojiCodepoints.length)
    const randomEmojiCodepoint = emoji.greenEmojiCodepoints[randomEmojiIndex];
    return randomEmojiCodepoint;
}

function createSprite(canvas, column) {
    const columnX = column * sprites.width;
    const randomSpeed = Math.floor(Math.random() * 3) + 1;
    const randomCount = Math.floor(Math.random() * 9) + 6;
    const font = sprites.font;

    const randomCodePoints = [];
    for (let i = 0; i < randomCount; i += 1) {
        randomCodePoints.push(getRandomEmojiCodePoint());
    }

    sprites.list.push({
        codePoints: randomCodePoints,
        x: columnX,
        y: 0,
        offset: sprites.width,
        width: 0,
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

        if (sprite.y > canvas.height + (sprite.codePoints.length * sprite.offset)) {
            // remove from screen
            let removed = sprites.list.splice(index, 1)[0];
            const column = sprite.x / sprites.width;
            createSprite(canvas, column);
        }
        ctx.save();
        ctx.beginPath();
        ctx.font = sprite.font;
        sprite.codePoints.forEach((codePoint, index) => {

            const swapEmojiThreshold = Math.floor(Math.random() * 1000) + 1;
            if (swapEmojiThreshold < 998) {
                ctx.fillText(String.fromCodePoint(codePoint), sprite.x, sprite.y - (index * sprite.offset));
            } else {
                const newCodePoint = getRandomEmojiCodePoint();
                ctx.fillText(String.fromCodePoint(newCodePoint), sprite.x, sprite.y - (index * sprite.offset));
                sprite.codePoints[index] = newCodePoint;
            }
        });
        ctx.restore();
    });

    game.requestID = requestAnimationFrame(draw);
}

// start/init

//grafix.buttonBar();
initSprites(canvas);
game.requestID = requestAnimationFrame(draw);