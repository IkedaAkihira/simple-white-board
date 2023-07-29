const whiteBoardSize = 512;
let mode = 0;
let isMouseDrawing = false;
const selectButtons = document.getElementsByClassName('select-button');
const penWidth = document.getElementById('pen-width');
const whiteBoard = document.getElementById('white-board');
const whiteBoardCtx = whiteBoard.getContext('2d');
whiteBoard.width = whiteBoard.height = whiteBoardSize;

for(const selectButton of selectButtons) {
    selectButton.addEventListener('click', onSelected);
}

function onSelected(e) {
    mode = parseInt(e.target.dataset.mode);
    whiteBoard.style.touchAction = (mode===2)?'auto':'none';
    for(const selectButton of selectButtons) {
        selectButton.classList.remove('blackened');
    }
    e.target.classList.add('blackened');
}

function pagePointToCanvasPoint(pagePoint){
    const rect = whiteBoard.getBoundingClientRect();
    return [pagePoint[0]-rect.x, pagePoint[1]-rect.y];
}
function startDrawing(startPoint) {
    if(mode === 2)
        return;
    whiteBoardCtx.strokeStyle = mode?'white':'black';
    whiteBoardCtx.lineWidth = parseInt(penWidth.value);
    whiteBoardCtx.beginPath();
    whiteBoardCtx.moveTo(...startPoint);
}

function continueDrawing(currentPoint) {
    if(mode === 2)
        return;
    whiteBoardCtx.lineTo(...currentPoint);
    whiteBoardCtx.stroke();
}

whiteBoard.addEventListener('touchstart', (e)=> {
    const startPoint = pagePointToCanvasPoint([e.touches[0].clientX, e.touches[0].clientY]);
    startDrawing(startPoint);
});

whiteBoard.addEventListener('touchmove', (e)=> {
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