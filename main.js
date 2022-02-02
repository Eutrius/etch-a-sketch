const canvasContainer = document.getElementById("center-section");

let currentPenColor = "#000";
let currentCanvasColor = "#fff";
let penDown = false;


function generateCanvas(size) {
    let tempCanvas = document.createElement("div");
    tempCanvas.className = "canvas";
    tempCanvas.style.gridTemplateColumns = `repeat(${size},1fr)`;
    tempCanvas.style.gridTemplateRows = `repeat(${size},1fr)`;
    for (let i = 0; i < size * size; i++) {
        generateCell(tempCanvas);
    }
    allowDraw(tempCanvas);
    canvasContainer.appendChild(tempCanvas);


}

function generateCell(canvasNode) {
    let tempDiv = document.createElement("div");
    tempDiv.className = "cell";
    canvasNode.appendChild(tempDiv);
}

function allowDraw(canvasNode) {
    let cellsArray = canvasNode.getElementsByClassName("cell");
    for (let i = 0; i  < cellsArray.length; i++) {
        cellsArray.item(i).addEventListener("mousedown",togglePenDown);
        cellsArray.item(i).addEventListener("mouseup",togglePenUp);
        cellsArray.item(i).addEventListener("mousedown",color);
        cellsArray.item(i).addEventListener('mouseover',color);
    }
}

function togglePenDown() {
    penDown = true;
}

function togglePenUp() {
    penDown = false;
}


function color(e) {
    if (penDown) {
        e.target.style.backgroundColor = currentPenColor;
    }
}



generateCanvas(16);