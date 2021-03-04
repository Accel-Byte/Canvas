// const counter = document.getElementById('lines-of-code-counter');
/* REF CODE: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/ */
/* Colors from http://flatuicolorpicker.com */
/* Symbols from https://fortawesome.github.io/Font-Awesome/ */
var kitDict = {
  tools: [
    ["paint", "fa-paint-brush"],
    ["background", "fa-image"],
    ["delete", "fa-trash"],
  ],
  paints: [
    "#00B16A",
    "#4ECDC4",
    "#A2DED0",
    "#87D37C",
    "#90C695",
    "#26A65B",
    "#03C9A9",
    "#68C3A3",
    "#65C6BB",
    "#1BBC9B",
    "#1BA39C",
    "#66CC99",
    "#36D7B7",
    "#C8F7C5",
    "#86E2D5",
    "#2ECC71",
    "#16a085",
    "#3FC380",
    "#019875",
    "#03A678",
    "#4DAF7C",
    "#2ABB9B",
    "#1E824C",
    "#049372",
    "#26C281",
    "#446CB3",
    "#E4F1FE",
    "#4183D7",
    "#59ABE3",
    "#81CFE0",
    "#52B3D9",
    "#C5EFF7",
    "#22A7F0",
    "#3498DB",
    "#2C3E50",
    "#19B5FE",
    "#336E7B",
    "#22313F",
    "#6BB9F0",
    "#1E8BC3",
    "#3A539B",
    "#34495E",
    "#67809F",
    "#2574A9",
    "#1F3A93",
    "#89C4F4",
    "#4B77BE",
    "#5C97BF",
    "#EC644B",
    "#D24D57",
    "#F22613",
    "#D91E18",
    "#96281B",
    "#EF4836",
    "#D64541",
    "#C0392B",
    "#CF000F",
    "#E74C3C",
    "#DB0A5B",
    "#F64747",
    "#F1A9A0",
    "#D2527F",
    "#E08283",
    "#F62459",
    "#E26A6A",
    "#DCC6E0",
    "#663399",
    "#674172",
    "#AEA8D3",
    "#913D88",
    "#9A12B3",
    "#BF55EC",
    "#BE90D4",
    "#8E44AD",
    "#9B59B6",
    "#e9d460",
    "#FDE3A7",
    "#F89406",
    "#EB9532",
    "#E87E04",
    "#F4B350",
    "#F2784B",
    "#EB974E",
    "#F5AB35",
    "#D35400",
    "#F39C12",
    "#F9690E",
    "#F9BF3B",
    "#F27935",
    "#E67E22",
    "#ececec",
    "#6C7A89",
    "#D2D7D3",
    "#EEEEEE",
    "#BDC3C7",
    "#ECF0F1",
    "#95A5A6",
    "#DADFE1",
    "#ABB7B7",
    "#F2F1EF",
    "#BFBFBF",
    "#EC644B",
    "#D24D57",
    "#F22613",
    "#D91E18",
    "#96281B",
    "#EF4836",
    "#D64541",
    "#C0392B",
    "#CF000F",
    "#E74C3C",
    "#DB0A5B",
    "#F64747",
    "#F1A9A0",
    "#D2527F",
    "#E08283",
    "#F62459",
    "#E26A6A",
    "#DCC6E0",
    "#663399",
    "#674172",
    "#AEA8D3",
    "#913D88",
    "#9A12B3",
    "#BF55EC",
    "#BE90D4",
    "#8E44AD",
    "#9B59B6",
    "#446CB3",
    "#E4F1FE",
    "#4183D7",
    "#59ABE3",
    "#81CFE0",
    "#52B3D9",
    "#C5EFF7",
    "#22A7F0",
    "#3498DB",
    "#2C3E50",
    "#19B5FE",
    "#336E7B",
    "#22313F",
    "#6BB9F0",
    "#1E8BC3",
    "#3A539B",
    "#34495E",
    "#67809F",
    "#2574A9",
    "#1F3A93",
    "#89C4F4",
    "#4B77BE",
    "#5C97BF",
    "#4ECDC4",
    "#A2DED0",
    "#87D37C",
    "#90C695",
    "#26A65B",
    "#03C9A9",
    "#68C3A3",
    "#65C6BB",
    "#1BBC9B",
    "#1BA39C",
    "#66CC99",
    "#36D7B7",
    "#C8F7C5",
    "#86E2D5",
    "#2ECC71",
    "#16a085",
    "#3FC380",
    "#019875",
    "#03A678",
    "#4DAF7C",
    "#2ABB9B",
    "#00B16A",
    "#1E824C",
    "#049372",
    "#26C281",
    "#e9d460",
    "#FDE3A7",
    "#F89406",
    "#EB9532",
    "#E87E04",
    "#F4B350",
    "#F2784B",
    "#EB974E",
    "#F5AB35",
    "#D35400",
    "#F39C12",
    "#F9690E",
    "#F9BF3B",
    "#F27935",
    "#E67E22",
    "#ececec",
    "#6C7A89",
    "#D2D7D3",
    "#EEEEEE",
    "#BDC3C7",
    "#ECF0F1",
    "#95A5A6",
    "#DADFE1",
    "#ABB7B7",
    "#F2F1EF",
    "#BFBFBF",
  ],
};
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var clickSize = new Array();
var paint;
var toolSelected = "paint";

// Settings
var strokeColorSetting = "#00b16a";
var strokeSizeSetting = 5;

// Elements
var canvas = document.getElementById("canvas");
var control = document.getElementById("control");
var context = canvas.getContext("2d");
var brushDisplay = document.getElementById("brush");
var colorDisplay = document.getElementById("color");
var paintList = document.getElementsByClassName("tool-thin");
var toolList = document.getElementsByClassName("tool");
var paintKit = document.getElementById("paints");
var toolKit = document.getElementById("tools");

// Document function
function initializeDocument() {
  canvas.width = document.body.clientWidth;
  canvas.height = 4000;
  canvas.style.background = "#333333";
  for (var i = 0; i < kitDict["paints"].length; i++) {
    paintKit.innerHTML +=
      "<div class='tool-thin' style='background:" +
      kitDict["paints"][i] +
      "!important' " +
      "color='" +
      kitDict["paints"][i] +
      "'" +
      "></div>\n";
  }
  for (var i = 0; i < kitDict["tools"].length; i++) {
    toolKit.innerHTML +=
      "<div class='tool' id='" +
      kitDict["tools"][i][0] +
      "'>\n<i class='fa " +
      kitDict["tools"][i][1] +
      "'></i>\n<h2>" +
      kitDict["tools"][i][0] +
      "</h2></div>\n";
  }
  brushDisplay.setAttribute(
    "style",
    "border-width: " + brushDisplay.value + "px"
  );
  var paintButton = document.getElementById("paint");
  paintList[0].classList.add("selected");
  paintButton.classList.add("selected");
}

function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

// Drawing functions
function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(strokeColorSetting);
  clickSize.push(strokeSizeSetting);
}

function resetCanvas() {
  clickX = new Array();
  clickY = new Array();
  clickDrag = new Array();
  clickColor = new Array();
  clickSize = new Array();
  canvas.style.background = "#333333";
}

function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function redraw(context) {
  clearCanvas(context);
  context.lineJoin = "round";
  for (var i = 0; i < clickX.length; i++) {
    context.lineWidth = clickSize[i];
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}

// main:
initializeDocument();

// Drawing board event functions
function handleStart(event) {
  if (toolSelected === "paint") {
    mouse_position = getMousePosition(canvas, event);
    var mouseX = mouse_position.x;
    var mouseY = mouse_position.y;
    paint = true;
    addClick(mouse_position.x, mouse_position.y);
    redraw(context);
  } else if (toolSelected === "background") {
    canvas.style.background = strokeColorSetting;
  }
}

function handleMove(event) {
  event.preventDefault();
  if (paint && toolSelected === "paint") {
    mouse_position =
      event.type !== "touchmove"
        ? getMousePosition(canvas, event)
        : getMousePosition(canvas, event.touches[0]);
    addClick(mouse_position.x, mouse_position.y, true);
    redraw(context);
  }
}

function handleEnd(event) {
  if (toolSelected === "paint") {
    paint = false;
  }
}

// Drawing board events
canvas.addEventListener("mousedown", handleStart, false);
canvas.addEventListener("mousemove", handleMove, false);
canvas.addEventListener("mouseup", handleEnd, false);
canvas.addEventListener("mouseleave", handleEnd, false);
canvas.addEventListener("touchstart", handleStart, false);
canvas.addEventListener("touchend", handleEnd, false);
canvas.addEventListener("touchcancel", handleEnd, false);
canvas.addEventListener("touchmove", handleMove, false);

var clearButton = document.getElementById("delete");
clearButton.addEventListener(
  "click",
  function (event) {
    clearCanvas(context);
    resetCanvas(context);
  },
  false
);

// // To Save Canvas
// function fillCanvasBackgroundWithColor(canvas, color) {
//   const context2 = canvas.getContext("2d");
//   context2.save();
//   context2.globalCompositeOperation = "destination-over";
//   context2.fillStyle = color;
//   context2.fillRect(0, 0, canvas.width, canvas.height);
//   context2.restore();
// }

// var saveButton = document.getElementById("save");
// saveButton.addEventListener(
//   "click",
//   function (event) {
//     fillCanvasBackgroundWithColor(canvas, canvas.style.background);
//     var img = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     // window.location.href = img
//     var a = document.createElement("a");
//     a.href = img;
//     a.download = "untitled.png";
//     document.body.appendChild(a);
//     a.click();
//   },
//   false
// );

for (var i = 0; i < paintList.length; i++) {
  paintList[i].addEventListener(
    "click",
    function (event) {
      for (var i = 0; i < paintList.length; i++) {
        paintList[i].classList.remove("selected");
      }
      strokeColorSetting = this.getAttribute("color");
      control.setAttribute(
        "style",
        "border-color: " + strokeColorSetting + "!important"
      );
      colorDisplay.value = strokeColorSetting;
      colorDisplay.setAttribute(
        "style",
        "border-color: " + strokeColorSetting + "!important"
      );
      this.classList.add("selected");
    },
    false
  );
}

brushDisplay.addEventListener(
  "change",
  function (event) {
    strokeSizeSetting = this.value;
    this.setAttribute(
      "style",
      "border-width: " + strokeSizeSetting + "px!important"
    );
  },
  false
);

colorDisplay.addEventListener(
  "change",
  function (event) {
    for (var i = 0; i < paintList.length; i++) {
      paintList[i].classList.remove("selected");
    }
    strokeColorSetting = this.value;
    control.setAttribute(
      "style",
      "border-color: " + strokeColorSetting + "!important"
    );
    this.setAttribute(
      "style",
      "border-color: " + strokeColorSetting + "!important"
    );
  },
  false
);

for (var i = 0; i < toolList.length; i++) {
  toolList[i].addEventListener(
    "click",
    function (event) {
      for (var i = 0; i < toolList.length; i++) {
        toolList[i].classList.remove("selected");
      }
      toolSelected = this.getAttribute("id");
      this.classList.add("selected");
    },
    false
  );
}
