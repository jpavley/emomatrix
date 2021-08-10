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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid Vertical

    for (let x = 0; x < 30 * tile.width; x += tile.width) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'gray';
        ctx.stroke();

        ctx.fillStyle = "gray";
        ctx.font = '14px Arial';
        ctx.fillText(x, x, 25);    
    }

   // Grid Horizonal

    for (let y = 0; y < 30 * tile.width; y += tile.width) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'gray';
        ctx.stroke();

        ctx.fillStyle = "gray";
        ctx.font = "14px Arial"
        ctx.fillText(y, 15, y);    
    }

    // centerY

    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'darkgray';
    ctx.stroke();

    // centerX

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'darkgray';
    ctx.stroke();

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

