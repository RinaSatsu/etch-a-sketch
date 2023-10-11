const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_BACKGROUND = '#FFFFFF';

let clicked = false;
let eraserMode = false;
let colorPickerMode = false;
let previousMode;
let linesVisibility = true;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentBackground = DEFAULT_BACKGROUND;

//	queries ---------------------------------------------
const sketchGrid = document.querySelector('#sketch-grid');
let sketchGridItems;
const pencilButton = document.querySelector('#pencil');
const eraserButton = document.querySelector('#eraser');
const colorPickerButton = document.querySelector('#picker');
const pencilColor = document.querySelector('#pencil-color');
const backgroundColor = document.querySelector('#back-color');
const lineToggleButton = document.querySelector('#line-toggle');
const gridSize = document.querySelector('#grid-size');
const gridSizeLabel = document.querySelector('.range-container>label');
const resizeButton = document.querySelector('#resize');
const clearButton = document.querySelector('#clear');

//	events ---------------------------------------------
function onPencilSelect () {
	eraserMode = false;
	colorPickerMode = false;
	previousMode = onPencilSelect;
	pencilButton.disabled = true;
	eraserButton.disabled = false;
	colorPickerButton.disabled = false;
}

function onEraserSelect () {
	eraserMode = true;
	colorPickerMode = false;
	previousMode = onEraserSelect;
	pencilButton.disabled = false;
	eraserButton.disabled = true;
	colorPickerButton.disabled = false;
}

function onPickerSelect () {
	colorPickerMode = true;
	pencilButton.disabled = false;
	eraserButton.disabled = false;
	colorPickerButton.disabled = true;
}

function onPencilColorChange (event) {
	currentColor = event.target.value;
}

function onBackColorChange (event) {
	currentBackground = event.target.value;
	sketchGridItems = document.querySelectorAll('.grid-item:not(.filled)');
	sketchGridItems.forEach(item => { item.style.backgroundColor = currentBackground; });
}

function onLineToggleClick () {
	if (linesVisibility) {
		sketchGrid.style.gap = '0px';
		linesVisibility = false;
	} else {
		sketchGrid.style.gap = '1px';
		linesVisibility = true;
	}
}

function onRangeChange () {
	gridSizeLabel.innerHTML = `${gridSize.value}x${gridSize.value}`;
}

function onResizeClick () {
	currentSize = gridSize.value;
	resizeGrid(currentSize);
}

function clearGrid () {
	sketchGridItems = document.querySelectorAll('.grid-item');
	sketchGridItems.forEach((value) => {
		value.style.backgroundColor = currentBackground;
	});
}

function onGridMouseDown () {
	clicked = true;
}

function onGridMouseUp () {
	clicked = false;
}

function onGridItemClick (event) {
	if (colorPickerMode) {
		currentColor = convertToHex(event.target.style.backgroundColor);
		updateColorSwatch(currentColor);
		previousMode();
	} else if (!eraserMode) {
		event.target.style.backgroundColor = currentColor;
		event.target.classList.add('filled');
	} else {
		event.target.style.backgroundColor = currentBackground;
		event.target.classList.remove('filled');
	}
}

function onGridItemMove (event) {
	if (clicked) {
		if (!eraserMode) {
			event.target.style.backgroundColor = currentColor;
			event.target.classList.add('filled');
		} else {
			event.target.style.backgroundColor = currentBackground;
			event.target.classList.remove('filled');
		}
	}
}

//	functions ---------------------------------------------
function resizeGrid (size) {
	clearGrid();
	sketchGrid.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
	sketchGridItems = document.querySelectorAll('.grid-item');
	for (let i = 0; i < sketchGridItems.length; i++) {
		sketchGrid.removeChild(sketchGridItems[i]);
	}
	for (let i = 0; i < size * size; i++) {
		const gridItem = document.createElement('div');
		gridItem.addEventListener('click', onGridItemClick);
		gridItem.addEventListener('mousemove', onGridItemMove);
		gridItem.classList.add('grid-item');
		gridItem.style.backgroundColor = currentBackground;
		sketchGrid.appendChild(gridItem);
	}
}

function updateColorSwatch (color) {
	pencilColor.value = color;
}

function convertToHex (color) {
	let rgb = color.split('(')[1].split(')')[0];
	rgb = rgb.split(',');
	const hex = rgb.map(function (x) {
		x = parseInt(x).toString(16);
		return (x.length === 1) ? '0' + x : x;
	});
	return '#' + hex.join('');
}

//	init ---------------------------------------------
sketchGridItems = document.querySelectorAll('.grid-item');

pencilButton.addEventListener('click', onPencilSelect);
eraserButton.addEventListener('click', onEraserSelect);
colorPickerButton.addEventListener('click', onPickerSelect);
pencilColor.addEventListener('change', onPencilColorChange, false);
backgroundColor.addEventListener('change', onBackColorChange, false);

resizeButton.addEventListener('click', onResizeClick);
clearButton.addEventListener('click', clearGrid);
lineToggleButton.addEventListener('click', onLineToggleClick);

gridSize.oninput = onRangeChange;
resizeButton.addEventListener('click', onResizeClick);
clearButton.addEventListener('click', clearGrid);

sketchGrid.addEventListener('mousedown', onGridMouseDown);
document.body.addEventListener('mouseup', onGridMouseUp);

window.addEventListener('load', () => {
	pencilColor.value = currentColor;
	backgroundColor.value = currentBackground;
	previousMode = onPencilSelect;
	resizeGrid(DEFAULT_SIZE);
});
