// Emo Matrix
// Copyright (c) John Pavley

import * as grafix from './grafix.js';
import * as emoji from './emoji.js';

// emoji color
const emoColors = {
    green: 'green',
    red: 'red',
    yellow: 'yellow',
    blue: 'blue',
    current: 'green',
    previousBackgroundColor: '',
    timing: 12000
};

const backgroundColors = {
    green: '#003300',
    red: '#330000',
    yellow: '#333300',
    blue: '#000033',
};

// canvas and context
const backgroundCanvas = document.getElementById('backgroundCanvas');
backgroundCanvas.setAttribute('width', innerWidth);
backgroundCanvas.setAttribute('height', innerHeight);


const canvas = document.getElementById('canvas');
canvas.setAttribute('width', innerWidth);
canvas.setAttribute('height', innerHeight);

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

// window

addEventListener("resize", () => {
    location.reload();
});

document.body.prepend(backgroundCanvas);
const backgroundCtx = backgroundCanvas.getContext('2d');


document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

// emojis
let greenEmoji = String.fromCodePoint(emoji.greenEmojiCodepoints[40]);
let testText = greenEmoji;

// drawing and animation
const game = {
    requestID: '',
    state: 'not started'
};

// emoji sprites

const sprites = {
    max: 0,
    width: 0,
    font: '25px Arial',
    list: []
};

function initSprites(canvas) {

    ctx.save();
    ctx.font = sprites.font;
    const spriteMetric = ctx.measureText(testText);
    ctx.restore();

    const columnCount = Math.floor(canvas.width/spriteMetric.width);

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
    const randomEmojiIndex = Math.floor(Math.random() * emojiList.length)
    const randomEmojiCodepoint = emojiList[randomEmojiIndex].codePoint;
    return randomEmojiCodepoint;
}

function createSprite(canvas, column) {
    const columnX = column * sprites.width;
    const randomSpeed = Math.floor(Math.random() * 5) + 2;
    const randomCount = Math.floor(Math.random() * 20) + 6;
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

function drawBackground() {

    // Optimization: Don't update backround unless it's color has changed

    if (emoColors.previousBackgroundColor == emoColors.current) {
        return; // early return
    } else {
        // cache current background color for future test
        emoColors.previousBackgroundColor = emoColors.current;
    }

    // draw background because the emocolor has changed

    // debug
    // console.log(`drawBackground(${emoColors.current})`)

    const ctx = backgroundCtx;
    const canvas = backgroundCanvas;
    ctx.save()
    ctx.beginPath()
    const linGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    linGrad.addColorStop(0, 'black');
    linGrad.addColorStop(1, backgroundColors[emoColors.current]);
    ctx.fillStyle = linGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore
}

function draw(timeStamp) {

    grafix.countFrames();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    grafix.drawDiagonstics(canvas, ctx, timeStamp);

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

            // ctx.shadowColor = "white"; 
            // ctx.shadowOffsetX = 0; 
            // ctx.shadowOffsetY = 0; 

            // TODO: shadowBlur is just too expensive computationally!
            // if (index == 0) {
            //     ctx.shadowBlur = 6;
            // } else {
            //     ctx.shadowBlur = 0;
            // }

            ctx.globalAlpha = 1.0 - (index * 0.06);

            const swapEmojiThreshold = Math.floor(Math.random() * 1000) + 1;
            if (swapEmojiThreshold < 999) {
                ctx.fillText(String.fromCodePoint(codePoint), sprite.x, sprite.y - (index * sprite.offset));
                // debug
                grafix.displayCodepoint(ctx, codePoint, sprite.x, sprite.y - (index * sprite.offset));
            } else {
                const newCodePoint = getRandomEmojiCodePoint();
                ctx.fillText(String.fromCodePoint(newCodePoint), sprite.x, sprite.y - (index * sprite.offset));
                sprite.codePoints[index] = newCodePoint;
                // debug
                grafix.displayCodepoint(ctx, codePoint, sprite.x, sprite.y - (index * sprite.offset));
            }

            // ctx.shadowColor = 'rgba(0,0,0,0)';
        });
        ctx.restore();
    });

    game.requestID = requestAnimationFrame(draw);
}

const colorList = [emoColors.green, emoColors.red, emoColors.yellow, emoColors.blue];
let currentColorIndex = 0;
let emojiList = emoji.emojiTable.filter(emo => emo.color == emoColors.current)

function cycleEmojiColor() {
    grafix.countGenerations();

    currentColorIndex += 1;

    if (currentColorIndex >= colorList.length) {
        currentColorIndex = 0
    }
    emoColors.current = colorList[currentColorIndex];
    emojiList = emoji.emojiTable.filter(emo => emo.color == emoColors.current)

    const timerID = setTimeout(cycleEmojiColor, emoColors.timing);
}

// start up

function start() {
    grafix.initTimeKeeper();

    canvas.addEventListener('click', (e) => {
    
        if (game.state == 'running') {
            pause();
        } else if (game.state == 'paused') {
            unpause();
        }
    });
    
    grafix.initGrafix(canvas, {
        showGrid: false,
        showCenter: false,
        showTextBox: false,
        showMouseCoordinates: false,
        showFPS: false
    });
    initSprites(canvas);
    game.state = 'running'
    game.requestID = requestAnimationFrame(draw)
    const timerID = setTimeout(cycleEmojiColor, emoColors.timing);
}

// click to pause

function pause() {
    grafix.reportTimeKeeperCounters();
    game.state = 'paused';
    cancelAnimationFrame(game.requestID);
}

function unpause() {
    game.state = 'running';
    game.requestID = requestAnimationFrame(draw);
}

function main() {
    drawBackground();
    const timerID = setTimeout(start,3000);
}

// main

main();
