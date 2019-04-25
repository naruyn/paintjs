const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = "500";
canvas.height = "500";

ctx.strokeStyle = "#2C2C2C";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(event){
    painting = true;    
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function stopPainting(){
    painting = false;
}

function handleRangeChange(){
    ctx.lineWidth = event.target.value;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, 500, 500);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

if(range){
    range.addEventListener("change", handleRangeChange);
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if(jsMode){
    jsMode.addEventListener("click", handleModeClick);
}