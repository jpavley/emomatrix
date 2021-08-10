// Emo Matrix
// Copyright (c) John Pavley

// canvas and context
const canvas = document.createElement('canvas');
const tile = {width: 30, height: 20};
canvas.setAttribute('width', 30 * tile.width);
canvas.setAttribute('height', 30 * tile.height);
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

const lineProps = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    strokeStyle: '',
    lineWidth: 0
};

function drawLine(ctx, lineProps) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(lineProps.x1, lineProps.y1);
    ctx.lineTo(lineProps.x2, lineProps.y2);
    ctx.lineWidth = lineProps.lineWidth;
    ctx.strokeStyle = lineProps.strokeStyle;
    ctx.stroke();
    ctx.restore();
}

const textProps = {
    message: '',
    x: 0,
    y: 0,
    fillStyle: '',
    font: ''
};

function drawText(ctx, textProps) {
    ctx.save();
    ctx.fillStyle = textProps.fillStyle;
    ctx.font = textProps.font;
    ctx.fillText(textProps.message, textProps.x, textProps.y);    
    ctx.restore();
}

function drawGrid(canvas, ctx) {
        // Grid Vertical

        for (let x = 0; x < 30 * tile.width; x += tile.width) {

            drawLine(ctx, {
                x1: x,
                y1: 0,
                x2: x,
                y2: canvas.height,
                strokeStyle: '333',
                lineWidth: 2            
            });
    
            drawText(ctx, {
                message: x,
                x: x - 4,
                y: 20,
                fillStyle: 'gray',
                font: '12px Arial'            
            });
        }
    
       // Grid Horizonal
    
        for (let y = 0; y < 30 * tile.width; y += tile.width) {

            drawLine(ctx, {
                x1: 0,
                y1: y,
                x2: canvas.width,
                y2: y,
                strokeStyle: '333',
                lineWidth: 2            
            });

            drawText(ctx, {
                message: y,
                x: 10,
                y: y + 4,
                fillStyle: 'gray',
                font: '12px Arial'            
            });
        }
}

function drawCenter(canvas, ctx) {
    drawLine(ctx, {
        x1: 0,
        y1: centerY,
        x2: canvas.width,
        y2: centerY,
        strokeStyle: 'darkgray',
        lineWidth: 4    
    });
    drawLine(ctx, {
        x1: centerX,
        y1: 0,
        x2: centerX,
        y2: canvas.height,
        strokeStyle: 'darkgray',
        lineWidth: 4    
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGrid(canvas, ctx);
    drawCenter(canvas, ctx);

    // text metrics

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    const textMetrics = ctx.measureText(testText);
    let textTop = Math.abs(centerY - textMetrics.actualBoundingBoxAscent);
    let textBottom = Math.abs(centerY + textMetrics.actualBoundingBoxDescent);
    let textHeight = textBottom-textTop;
    let textMid = (textTop + (textHeight / 2));
    let textLeft = centerX - (textMetrics.width/2);
    let textRight = centerX + (textMetrics.width/2);

    // textTop

    ctx.beginPath();
    ctx.moveTo(0, textTop);
    ctx.lineTo(canvas.width, textTop);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'yellow';
    ctx.stroke();

    // textBottom

    ctx.beginPath();
    ctx.moveTo(0, textBottom);
    ctx.lineTo(canvas.width, textBottom);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'orange';
    ctx.stroke();

    // textMid

    ctx.beginPath();
    ctx.moveTo(0, textMid);
    ctx.lineTo(canvas.width, textMid);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // textLeft

    ctx.beginPath();
    ctx.moveTo(textLeft, 0);
    ctx.lineTo(textLeft, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'cyan';
    ctx.stroke();

    // textRight

    ctx.beginPath();
    ctx.moveTo(textRight, 0);
    ctx.lineTo(textRight, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'chartreuse';
    ctx.stroke();

    ctx.fillText(testText, centerX - textMetrics.width/2, centerY);

    //game.requestID = requestAnimationFrame(draw);
}

// start
game.requestID = requestAnimationFrame(draw);

