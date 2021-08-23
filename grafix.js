/**
 * Grafix.js
 * A simple graphics library of utilities for HTML5 Canvas (2D).
 * Copyright (c) 2021 John Pavley
 */ 
 
/**
 * The basic properties required to draw a line.
 * Includes geometry and style.
 * - x1, y1: start point
 * - x2, y2: end point
 */
export const lineProps = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    strokeStyle: '',
    lineWidth: 0
};

/**
 * Draws a line on the canvas using the lineProps.
 * Assumes 2D canvas.
 * Saves and restores context.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {lineProps} lineProps 
 */
export function drawLine(ctx, lineProps) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(lineProps.x1, lineProps.y1);
    ctx.lineTo(lineProps.x2, lineProps.y2);
    ctx.lineWidth = lineProps.lineWidth;
    ctx.strokeStyle = lineProps.strokeStyle;
    ctx.stroke();
    ctx.restore();
}

/**
 * The basic properties required to draw text.
 * Includes geometry and style.
 * - message: text payload
 */
export const textProps = {
    message: '',
    x: 0,
    y: 0,
    fillStyle: '',
    font: ''
};

/**
 * Draws a text on the canvas using the textProps.
 * Assumes 2D canvas.
 * Saves and restores context.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {textProps} textProps 
 */
export function drawText(ctx, textProps) {
    ctx.save();
    ctx.fillStyle = textProps.fillStyle;
    ctx.font = textProps.font;
    ctx.fillText(textProps.message, textProps.x, textProps.y);    
    ctx.restore();
}

/**
 * Draws a grid (with lables) on the canvas using tile props.
 * Assumes 2D canvas.
 * Saves and restores context (via drawLine and drawText).
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function drawGrid(canvas, ctx) {

        // Grid Vertical

        for (let x = 0; x < canvas.width; x += 30) {

            drawLine(ctx, {
                x1: x,
                y1: 0,
                x2: x,
                y2: canvas.height,
                strokeStyle: '#333',
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
    
        for (let y = 0; y < canvas.height; y += 30) {

            drawLine(ctx, {
                x1: 0,
                y1: y,
                x2: canvas.width,
                y2: y,
                strokeStyle: '#333',
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

/**
 * Draws a reticle in the center of canvas. 
 * Assumes 2D canvas.
 * Saves and restores context (via drawLine).
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 */
export function drawCenter(canvas, ctx) {

    // locations

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

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

/**\
 * Computed properties of a text element.
 */
export const textBox = {
    textTop: 0,
    textBottom: 0,
    textHeight: 0,
    textMid: 0,
    textLeft: 0,
    textRight: 0,
    textWidth: 0,
    textHorizonalCenter: 0,
    textVerticalCenter: 0
};

/**
 * Measures text and return its textBox properties
 * @param CanvasRenderingContext2D} ctx 
 * @param {textProps} textProps 
 * @returns {textBox} textBox
 */
export function getTextBox(ctx, textProps) {
    const textMetrics = ctx.measureText(textProps.message);

    const textTop = Math.abs(textProps.y - textMetrics.actualBoundingBoxAscent);
    const textBottom = Math.abs(textProps.y + textMetrics.actualBoundingBoxDescent);
    const textHeight = textBottom-textTop;
    const textMid = (textTop + (textHeight / 2));
    const textLeft = textProps.x;
    const textRight = textProps.x + textMetrics.width;

    return {
        textTop: textTop,
        textBottom: textBottom,
        textHeight: textHeight,
        textMid: textMid,
        textLeft: textLeft,
        textRight: textRight,
        textWidth: textMetrics.width,
        textHorizonalCenter: textLeft + (textMetrics.width / 2),
        textVerticalCenter: textMid
    }
}



/**
 * Draws a text bounding box what shows the width and height of a text object.
 * Doesn't draw the text! Just the box around it!
 * Assumes 2D canvas.
 * Saves and restores context (via drawLine).
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {textProps} textProps 
 */
export function drawTextBox(ctx, canvas, textProps) {

    // text metrics

    ctx.fillStyle = textProps.fillStyle;
    ctx.font = textProps.font;
    const tb = getTextBox(ctx, textProps);

    // textTop

    drawLine(ctx, {
        x1: 0,
        y1: tb.textTop,
        x2: canvas.width,
        y2: tb.textTop,
        strokeStyle: 'yellow',
        lineWidth: 2   
    });

    // textBottom

    drawLine(ctx, {
        x1: 0,
        y1: tb.textBottom,
        x2: canvas.width,
        y2: tb.textBottom,
        strokeStyle: 'orange',
        lineWidth: 2   
    });

    // textMid

    drawLine(ctx, {
        x1: 0,
        y1: tb.textMid,
        x2: canvas.width,
        y2: tb.textMid,
        strokeStyle: 'red',
        lineWidth: 2   
    });

    // textLeft

    drawLine(ctx, {
        x1: tb.textLeft,
        y1: 0,
        x2: tb.textLeft,
        y2: canvas.height,
        strokeStyle: 'cyan',
        lineWidth: 2   
    });

    // textRight

    drawLine(ctx, {
        x1: tb.textRight,
        y1: 0,
        x2: tb.textRight,
        y2: canvas.height,
        strokeStyle: 'chartreuse',
        lineWidth: 2   
    });
}

/**
 * Properties that control visibility of diagnostic
 * tools: grid, reticle, text bounds, mouse coorindates
 * and FPS.
 */
export let buttonBarToggles = {
    showGrid: true,
    showCenter: true,
    showTextBox: true,
    showMouseCoordinates: true,
    showFPS: true
};

/**
 * Appends a button to button bar.
 * @param {String} textContent 
 * @param {Boolean} toggle 
 * @param {buttonBar} buttonBar 
 */
function addButtonToBar(textContent, toggle, buttonBar) {
    const newButton = document.createElement('button');
    newButton.textContent = textContent;

    newButton.addEventListener('click', () => {
        buttonBarToggles[toggle] = !buttonBarToggles[toggle];
    });

    buttonBar.append(newButton);
}

/**
 * Creates a div element to contain buttons.
 */
export function buttonBar() {
    const buttonBar = document.createElement('div');
    buttonBar.style.display = 'block';
    document.body.append(buttonBar);

    addButtonToBar("Toggle Grid", "showGrid", buttonBar);
    addButtonToBar("Toggle Center", "showCenter", buttonBar);
    addButtonToBar("Toggle Text Box", "showTextBox", buttonBar);
    addButtonToBar("Toggle Mouse Coordinates", "showMouseCoordinates", buttonBar);
    addButtonToBar("Toggle FPS", "showFPS", buttonBar);
}

/**
 * Properties used to calcuate and display frames per second.
 */
export const frameRateProps = {
    fps: 0,
    times: [],
    counter: 0 // used to trottle drawing of FPS text to avoid flickering
};

/**
 * Calcuates and displays frames per second.
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} timeStamp 
 * @param {frameRateProps} frameRateProps 
 */
export function drawFrameRate(canvas, ctx, timeStamp, frameRateProps) {

    // while there is at least one element in the times array
    // and the first element is greater than or equal to the (timeStamp less 1000)
    while (frameRateProps.times.length > 0 && frameRateProps.times[0] <= (timeStamp - 1000)) {
        frameRateProps.times.shift(); // throw away first element
    }

    frameRateProps.times.push(timeStamp);
    frameRateProps.counter += 1;
    if (frameRateProps.counter > 10) {
        frameRateProps.fps = frameRateProps.times.length;
        frameRateProps.counter = 0;
    }

    ctx.fillStyle = 'yellow';
    ctx.font = '14px monospace';
    ctx.fillText(`FPS: ${frameRateProps.fps}`, canvas.width - 100, canvas.height - 30);    
}

/**
 * Mouse movement properties.
 */
export const mouseProps = {
    mouseX: 0,
    mouseY: 0
}

/**
 * Displays the current mouse coordinates.
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 */
function drawMouseMove(canvas, ctx) {
    ctx.fillStyle = 'yellow';
    ctx.font = '14px monospace';
    ctx.fillText(`${mouseProps.mouseX},${mouseProps.mouseY}`, 35, canvas.height - 30);
}

/**
 * Draws the diagonstic objects on the canvas.
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} timeStamp 
 */
export function drawDiagonstics(canvas, ctx, timeStamp) {
    ctx.save();

    if (buttonBarToggles.showGrid) {
        drawGrid(canvas, ctx);
    }

    if (buttonBarToggles.showCenter) {
        drawCenter(canvas, ctx);
    }

    // TODO: Need a complately different way to integrate
    //       Need to add this as a property a text sprite

    // if (buttonBarToggles.showTextBox) {
    //     drawTextBox(ctx, canvas, {
    //         message: testText,
    //         x: clickX,
    //         y: clickY,
    //         fillStyle: 'white',
    //         font: '25px Arial'    
    //     });    
    // }

    if (buttonBarToggles.showMouseCoordinates) {
        drawMouseMove(canvas, ctx);
    }

    if (buttonBarToggles.showFPS) {
        drawFrameRate(canvas, ctx, timeStamp, frameRateProps);
    }

    ctx.restore();
}

/**
 * Initalizes grafix libary properties and listeners.
 * @param {HTMLCanvasElement} canvas 
 * @param {buttonBarToggles} bbt
 */
export function initGrafix(canvas, bbt) {

    buttonBarToggles.showCenter = bbt.showCenter;
    buttonBarToggles.showFPS = bbt.showFPS;
    buttonBarToggles.showGrid = bbt.showGrid;
    buttonBarToggles.showMouseCoordinates = bbt.showMouseCoordinates;
    buttonBarToggles.showTextBox = bbt.showTextBox;

    canvas.addEventListener('mousemove', (e) => {
        mouseProps.mouseX = e.offsetX;
        mouseProps.mouseY = e.offsetY;
    });    
}
