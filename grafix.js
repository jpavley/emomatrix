export const tile = { width: 30, height: 20 };

export const lineProps = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    strokeStyle: '',
    lineWidth: 0
};

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

export const textProps = {
    message: '',
    x: 0,
    y: 0,
    fillStyle: '',
    font: ''
};

export function drawText(ctx, textProps) {
    ctx.save();
    ctx.fillStyle = textProps.fillStyle;
    ctx.font = textProps.font;
    ctx.fillText(textProps.message, textProps.x, textProps.y);    
    ctx.restore();
}

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

export function drawTextBox(ctx, canvas, textProps) {

    // locations

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    // text metrics

    ctx.fillStyle = textProps.fillStyle;
    ctx.font = textProps.font;
    const textMetrics = ctx.measureText(textProps.message);
    let textTop = Math.abs(centerY - textMetrics.actualBoundingBoxAscent);
    let textBottom = Math.abs(centerY + textMetrics.actualBoundingBoxDescent);
    let textHeight = textBottom-textTop;
    let textMid = (textTop + (textHeight / 2));
    let textLeft = centerX - (textMetrics.width/2);
    let textRight = centerX + (textMetrics.width/2);

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