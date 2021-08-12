/**
 * Grafix,js
 * A simple graphics library of utilities for HTML5 Canvas (2D).
 */ 
 
/**
 * The tile defined the width and height of the canvas using
 * a ratio of 3/2.
 */
export const tile = { width: 30, height: 20 };

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
    const textMetrics = ctx.measureText(textProps.message);
    let textTop = Math.abs(textProps.y - textMetrics.actualBoundingBoxAscent);
    let textBottom = Math.abs(textProps.y + textMetrics.actualBoundingBoxDescent);
    let textHeight = textBottom-textTop;
    let textMid = (textTop + (textHeight / 2));
    let textLeft = textProps.x;
    let textRight = textProps.x + textMetrics.width;

    // textTop

    drawLine(ctx, {
        x1: 0,
        y1: textTop,
        x2: canvas.width,
        y2: textTop,
        strokeStyle: 'yellow',
        lineWidth: 2   
    });

    // textBottom

    drawLine(ctx, {
        x1: 0,
        y1: textBottom,
        x2: canvas.width,
        y2: textBottom,
        strokeStyle: 'orange',
        lineWidth: 2   
    });

    // textMid

    drawLine(ctx, {
        x1: 0,
        y1: textMid,
        x2: canvas.width,
        y2: textMid,
        strokeStyle: 'red',
        lineWidth: 2   
    });

    // textLeft

    drawLine(ctx, {
        x1: textLeft,
        y1: 0,
        x2: textLeft,
        y2: canvas.height,
        strokeStyle: 'cyan',
        lineWidth: 2   
    });

    // textRight

    drawLine(ctx, {
        x1: textRight,
        y1: 0,
        x2: textRight,
        y2: canvas.height,
        strokeStyle: 'chartreuse',
        lineWidth: 2   
    });
}