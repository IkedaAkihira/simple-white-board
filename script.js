const whiteBoardSize = 512;
let isBlack = true;
let isMouseDrawing = false;
const toggleButton = document.getElementById('toggle-button');
const penWidth = document.getElementById('pen-width');
const whiteBoard = document.getElementById('white-board');
const whiteBoardCtx = whiteBoard.getContext('2d');
whiteBoard.width = whiteBoard.height = whiteBoardSize;

function pagePointToCanvasPoint(pagePoint){
    const rect = whiteBoard.getBoundingClientRect();
    return [pagePoint[0]-rect.x, pagePoint[1]-rect.y];
}
function startDrawing(startPoint) {
    whiteBoardCtx.strokeStyle = isBlack?'black':'white';
    whiteBoardCtx.lineWidth = parseInt(penWidth.value);
    whiteBoardCtx.beginPath();
    whiteBoardCtx.moveTo(...startPoint);
}

function continueDrawing(currentPoint) {
    whiteBoardCtx.lineTo(...currentPoint);
    whiteBoardCtx.stroke();
}

// toggle pen/eraser button
toggleButton.addEventListener('click',()=> {
    toggleButton.classList.toggle('blackened');
    toggleButton.classList.toggle('whitened');
    isBlack = !isBlack;
});

whiteBoard.addEventListener('touchstart', (e)=> {
    if(e.touches.length != 1)
        return;
    const startPoint = pagePointToCanvasPoint([e.touches[0].clientX, e.touches[0].clientY]);
    startDrawing(startPoint);
});

whiteBoard.addEventListener('touchmove', (e)=> {
    if(e.touches.length != 1)
        return;
    const currentPoint = pagePointToCanvasPoint([e.touches[0].clientX, e.touches[0].clientY]);
    continueDrawing(currentPoint);
});

whiteBoard.addEventListener('mousedown', (e)=> {
    isMouseDrawing = true;
    const startPoint = pagePointToCanvasPoint([e.clientX, e.clientY]);
    startDrawing(startPoint);
});

addEventListener('mousemove', (e)=> {
    if(isMouseDrawing) {
        const currentPoint = pagePointToCanvasPoint([e.clientX, e.clientY]);
        continueDrawing(currentPoint);
    }
});

addEventListener('mouseup', (e)=> {
    isMouseDrawing = false;
});