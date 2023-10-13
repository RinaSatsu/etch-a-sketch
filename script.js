const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#000000';
const DEFAULT_ID = 'color-0';
const DEFAULT_BACKGROUND = '#FFFFFF';
const MAX_COLORS = 16;

let mouseClicked = false;
let linesVisibility = true;
let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentId = DEFAULT_ID;
let currentBackground = DEFAULT_BACKGROUND;
let colorIdNum = 1;

//	queries --------------------------------------------
const colorPaletteContainer = document.querySelector('.color-select-container');
const defaultColorContainer = document.querySelector('div[data-color="color-0"');
const defaultColor = document.querySelector('#color-0');
const addColorButton = document.querySelector('#add-color');
const clearPaletteButton = document.querySelector('#clear-palette');
const lineToggleButton = document.querySelector('#line-toggle');
const gridSize = document.querySelector('#grid-size');
const gridSizeLabel = document.querySelector('.range-container>label');
const resizeButton = document.querySelector('#resize');
const clearButton = document.querySelector('#clear');
const sketchGrid = document.querySelector('#sketch-grid');
let colorPaletteItems;
let sketchGridItems;

//	events ---------------------------------------------
function onColorSelect (event) {
	colorSelect(event.currentTarget);
}

function onColorChange (event) {
	currentColor = event.target.value;
	currentId = event.target.getAttribute('id');
	if (currentId === 'color-0') {
		currentBackground = event.target.value;
	}
	changeColorOfClass(currentId, currentColor);
}

function onRemove (event) {
	removeColorSwatch(event.currentTarget);
	colorSelect(defaultColorContainer);
	if (colorPaletteContainer.children.length < MAX_COLORS + 1) {
		addColorButton.classList.remove('invisible');
	}
	colorPaletteItems = document.querySelectorAll('.color-container');
}

function onAddColor () {
	createColorPalette();
	if (colorPaletteContainer.children.length >= MAX_COLORS + 1) {
		addColorButton.classList.add('invisible');
	}
	colorPaletteItems = document.querySelectorAll('.color-container');
}

function onClearPalette () {
	if (window.confirm('Warning! All colors will be lost. Continue?')) {
		colorPaletteItems = document.querySelectorAll('.color-container');
		for (let i = 1; i < colorPaletteItems.length; i++) {
			removeColorOfClass(colorPaletteItems[i].dataset.color);
			colorPaletteContainer.removeChild(colorPaletteItems[i]);
		}
		colorIdNum = 1;
		colorSelect(defaultColorContainer);
	}
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
	if (window.confirm('Warning! All drawing progress will be lost. Continue?')) {
		currentSize = gridSize.value;
		resizeGrid(currentSize);
	}
}

function clearGrid () {
	sketchGridItems = document.querySelectorAll('.grid-item');
	sketchGridItems.forEach((value) => {
		value.style.backgroundColor = currentBackground;
	});
}

function onGridMouseDown () {
	mouseClicked = true;
}

function onGridMouseUp () {
	mouseClicked = false;
}

function onGridItemClick (event) {
	event.target.style.backgroundColor = currentColor;
	const currClass = event.target.classList[1];
	event.target.classList.remove(currClass);
	event.target.classList.add(currentId);
}

function onGridItemMove (event) {
	if (mouseClicked) {
		onGridItemClick(event);
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
		gridItem.classList.add('color-0');
		gridItem.style.backgroundColor = currentBackground;
		sketchGrid.appendChild(gridItem);
	}
}

function colorSelect (element) {
	resetPaletteGrid();
	element.classList.add('selected');
	currentColor = element.children[0].value;
	currentId = element.children[0].getAttribute('id');
}

function createColorPalette () {
	const colorDiv = document.createElement('div');
	const colorInput = document.createElement('input');
	const removeColor = document.createElement('button');
	colorDiv.classList.add('color-container');
	colorDiv.dataset.color = `color-${colorIdNum}`;
	colorDiv.addEventListener('click', onColorSelect);
	colorInput.type = 'color';
	colorInput.id = `color-${colorIdNum}`;
	colorInput.addEventListener('change', onColorChange);
	colorDiv.appendChild(colorInput);
	removeColor.id = 'remove-color';
	removeColor.dataset.color = `color-${colorIdNum}`;
	removeColor.textContent = '—';
	removeColor.addEventListener('click', onRemove);
	colorDiv.appendChild(removeColor);
	const index = colorPaletteContainer.children.length - 1;
	colorPaletteContainer.insertBefore(colorDiv, colorPaletteContainer.children[index]);
	colorIdNum++;
}

function changeColorOfClass (className, color) {
	sketchGridItems = document.querySelectorAll(`.grid-item.${className}`);
	sketchGridItems.forEach(item => { item.style.backgroundColor = color; });
}

function removeColorOfClass (className) {
	changeColorOfClass(className, currentBackground);
	sketchGridItems.forEach(item => {
		item.classList.remove(className);
		item.classList.add('class-0');
	});
}

function removeColorSwatch (element) {
	const colorClass = element.dataset.color;
	removeColorOfClass(colorClass);
	const parent = document.querySelector(`div[data-color="${colorClass}"`);
	parent.removeEventListener('click', onColorSelect);
	colorPaletteContainer.removeChild(parent);
}

function resetPaletteGrid () {
	colorPaletteItems.forEach(item => {
		item.classList.remove('selected');
	});
}

//	init ---------------------------------------------
sketchGridItems = document.querySelectorAll('.grid-item');

defaultColorContainer.addEventListener('click', onColorSelect);
defaultColor.addEventListener('change', onColorChange);
addColorButton.addEventListener('click', onAddColor);
clearPaletteButton.addEventListener('click', onClearPalette);

resizeButton.addEventListener('click', onResizeClick);
clearButton.addEventListener('click', clearGrid);
lineToggleButton.addEventListener('click', onLineToggleClick);

gridSize.oninput = onRangeChange;
resizeButton.addEventListener('click', onResizeClick);
clearButton.addEventListener('click', clearGrid);

sketchGrid.addEventListener('mousedown', onGridMouseDown);
document.body.addEventListener('mouseup', onGridMouseUp);

window.addEventListener('load', () => {
	defaultColor.value = currentBackground;
	resizeGrid(DEFAULT_SIZE);
});
