# Etch-A-Sketch Web App
Welcome to the Etch-A-Sketch Web App! This simple web application allows you to unleash your creativity by drawing with your mouse on a square tiled canvas. It offers various features to enhance your drawing experience, dynamic color palette, grid management, canvas resizing, and more.

![Screenshot](screenshot.png)

*Disclaimer: This README is for the version of the app with a color palette feature. The other version of this app allows you to draw with a pencil tool and have greater control over color selection. You can find the README for that version in [its respective branch](../../tree/one-color). Please ensure you are viewing the documentation for the version that matches your intended use.*

## Motivation
The motivation behind this project is to practice Front-End Development and demonstrate skills in JavaScript dynamic component generation. This app will offer an interactive platform for drawing and sketching. Whether you're an artist looking for a pixel-art digital canvas or simply want to have fun, this app allows you to express your creativity in a user-friendly environment.

## Features
### Palette Feature

The palette feature in this app allows you to have control over multiple colors for your drawings. Here's how it works:

**Default Color**: The initial color, which also serves as the background color of your canvas, is set by default.

**Add New Colors**: By clicking the '+' button, you can add additional colors to your palette. You can have up to 16 colors, including the background color.

**Select Colors**: Once added, you can select any color from your palette to use for drawing.

**Color Swatch Modifications**: When you modify a color using the color swatch, all tiles on the canvas of that color will automatically update to match the new color.

**Remove Colors**: Under each color swatch (except the initial background color), there is a '-' button. Clicking it will remove that color from the palette and also remove all tiles of that color from the canvas.

**Clear Palette**: The "Clear Palette" button allows you to delete all the colors from your palette and reset the canvas with only the initial (background) color remaining. This is useful if you want a fresh start for your drawing.

### Grid Management
**Grid Resize**: Adjust the grid size using the slider and apply new size with corresponding button. Keep in mind that resizing the grid will clear your current drawing.

**Grid Toggle**: Switch the grid on and off to have a clear view of your drawing or align your sketches neatly.

### Clear Canvas
**Clear Canvas**: If you want to start fresh, you can click the "Clear" button to erase your entire drawing.

## How to Use
1. **Access the Web App**: Visit the website where the Etch-A-Sketch Web App is hosted.
2. **Canvas Drawing**: Use your mouse to create vibrant drawings on the canvas. The default color, initially set as the background color, will be used.
3. **Add New Colors**: Click the '+' button to add new colors to your palette. You can have up to 16 colors, including the initial background color.
4. **Select Color**: Once you've added colors to your palette, select any color from the palette to use for drawing. The selected color will be indicated, and any drawing you do will use this color.
5. **Modify Colors**: You can modify any color in your palette by using the color swatch. Changes you make will automatically apply to all tiles on the canvas of that color.
6. **Remove Colors**: If you no longer need a color, click the '-' button under the color swatch to remove it from the palette and clear all tiles of that color from the canvas.
7. **Clear Palette**: To reset your palette and canvas, click the "Clear Palette" button. This will leave you with only the initial background color for your drawings.
8. **Grid Management**: Toggle the grid on and off using the provided button. You can also resize the grid using the slider.
9. **Clear Canvas**: To start a new drawing from scratch, click the "Clear" button.

## Feedback and Issues
If you encounter any issues while using the Etch-A-Sketch Web App or have suggestions for improvements, please open an issue on the GitHub repository. Your feedback is valuable and will help make this app even better.

### Credits
This project was created with passion by  Maryna Snihurska (aka RinaSatsu). Special thanks to The Odin Project for their idea of this project.

Enjoy sketching and drawing with the Etch-A-Sketch Web App!
