const canvasContainer = document.getElementById("center-section");
const colorPickerPen = document.getElementById("color-picker-pen");
const colorPickerPenButton = document.getElementById("color-picker-pen-button");
const penMode = Array.from(document.getElementsByClassName("pen-mode"));
const colorPickerCanvas = document.getElementById("color-picker-canvas");
const colorPickerCanvasButton = document.getElementById("color-picker-canvas-button"); 
const clear = document.getElementById("clear");


let pickedPenColor = "black";
let pickedCanvasColor = "white";
let penDown = false;
let canvasSize = 16;

colorPickerPenButton.style.backgroundColor = pickedPenColor;
colorPickerCanvasButton.style.backgroundColor = pickedCanvasColor;

penMode.forEach(element => {element.addEventListener("click",selectMode)});
colorPickerPen.addEventListener("change",changePenColor);
colorPickerPenButton.addEventListener("mousedown",openColorPicker);
colorPickerCanvas.addEventListener("change",changeCanvasColor);
colorPickerCanvasButton.addEventListener("mousedown",openColorPicker);
clear.addEventListener("click",clearCanvas);


function generateCanvas(size,canvasColor) {
    let tempCanvas = document.createElement("div");
    tempCanvas.className = "canvas";
    tempCanvas.style.gridTemplateColumns = `repeat(${size},1fr)`;
    tempCanvas.style.gridTemplateRows = `repeat(${size},1fr)`;
    for (let i = 0; i < size * size; i++) {
        generateCell(tempCanvas,canvasColor);
    }
    canvasContainer.appendChild(tempCanvas);
}

function generateCell(canvasNode,cellColor) {
    let tempDiv = document.createElement("div");
    tempDiv.className = "cell";
    tempDiv.style.backgroundColor = cellColor;
    tempDiv.addEventListener("mousedown",togglePenDown);
    tempDiv.addEventListener("mouseup",togglePenUp);
    tempDiv.addEventListener("mousedown",color);
    tempDiv.addEventListener('mouseover',color);
    canvasNode.appendChild(tempDiv);
}

function togglePenDown() {
    penDown = true;
}

function togglePenUp() {
    penDown = false;
}

function color(e) {
    let penColor = pickedPenColor;
    let activeMode = getActiveMode();
    if(activeMode.id == "eraser") {
        penColor = pickedCanvasColor;
    } else if(activeMode.id == "rainbow") {
        penColor = generateRandomColor();
    }
    if (penDown) {
        e.target.style.backgroundColor = penColor;
    }
}

function openColorPicker(e) {
    let colorPickerButton = e.target;
    let colorPicker = colorPickerButton.firstElementChild;
    colorPicker.click();
}

function changePenColor(e) {
    let color = e.target.value;
    colorPickerPenButton.style.backgroundColor = color;
    pickedPenColor = color;
}

function changeCanvasColor(e) {
    let color = e.target.value;
    colorPickerCanvasButton.style.backgroundColor = color;
    pickedCanvasColor = color;
    clearCanvas();
}

function clearCanvas() {
    canvasContainer.removeChild(canvasContainer.firstElementChild);
    generateCanvas(canvasSize,pickedCanvasColor);

}

function selectMode(e) {
    let activeMode = getActiveMode();
    if(activeMode) {
        activeMode.className = "button pen-mode";
        activeMode.addEventListener("click", selectMode);
    }
    let element = e.target;
    element.classList.toggle("button");
    element.classList.toggle("selectedMode");
    element.removeEventListener("click",selectMode);
}

function getActiveMode() {
    let activeMode = document.getElementsByClassName("selectedMode")[0];
    return activeMode;
}

function generateRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

generateCanvas(canvasSize,pickedCanvasColor);