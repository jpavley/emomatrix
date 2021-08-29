// Emoji Viewer
// Copyright (c) John Pavley

import * as grafix from './grafix.js';
import * as emoji from './emoji.js';

// canvas and context

const canvas = document.createElement('canvas');
canvas.setAttribute('width', innerWidth);
canvas.setAttribute('height', innerHeight);
canvas.style.backgroundColor = '#ffffff';
const ctx = canvas.getContext('2d');
document.body.prepend(canvas);

// window

addEventListener("resize", () => {
    location.reload();
});

// emoji sprites

const sprites = {
    size: 0,
    font: '25px Arial',
    codePoints: [], // list of emoji codepoints
    props: [] // list of sprites sprite props
};

function initSprites(canvas) {

    ctx.save();
    ctx.font = sprites.font;
    const spriteMetric = ctx.measureText(testText);
    ctx.restore();

    const columnCount = Math.floor(canvas.width/spriteMetric.size);
    const rowCount = Math.floor(canvas.height/spriteMetric.size);

    sprites.size = spriteMetric.width;
    
    const emojiColor = 'green';
    sprites.codePoints = getCodePoints(emojiColor);

    let emojiIndex = 0;

    for (let column = 0; column < columnCount; column += 1) {
        for (let row = 0; row < rowCount; row += 1) {
            if (emojiIndex < sprites.codePoints.length) {
                createSprite(row, column, emojiIndex);
            } else {
                break;
            }
        }
    }
}

const spriteProps = {
    codePoint: 0x00,
    x: 0,
    y: 0,
};

function getCodePoints(emojiColor) {
    return emoji.emojiTable.filter(e => e.color == emojiColor);
}

function createSprite(row, column, emojiIndex) {
    const columnY = column * sprites.size;
    const rowX = row * sprites.size;

    sprites.list.push({
        codePoint: sprites.codePoints[emojiIndex],
        x: rowX,
        y: columnY,
    });
}

function start() {
    
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
}

function draw(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grafix.drawDiagonstics(canvas, ctx, timeStamp);

    sprites.spriteProps.forEach((sprite, index) => {
        ctx.save();
        ctx.beginPath();
        ctx.font = sprite.font;
        ctx.fillText(String.fromCodePoint(sprite.codePoint), sprite.x, sprite.y);
        ctx.restore();
    });

    game.requestID = requestAnimationFrame(draw);
}

// begin animation

start();





