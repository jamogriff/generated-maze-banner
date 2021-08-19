import {aspectRatio} from './size-helpers.js';
/*
Banner width is in pixels, height ratio determines the x:1 aspect ratio of the banner and
cell factor is a percentage of width that determines how small/large each cell is. The following produce good effects, but any other numbers will result in inconsistent results:
	- 0.2 super tiny cells
	- 0.1 medium cells
	- 0.05 large cells
Additionally, grid width determines how thick the maze walls will be.
*/
const BANNER_WIDTH = 600;
const HEIGHT_RATIO = 6;
const CELL_FACTOR = 0.05;
const GRID_WIDTH = 4;

const Constants = {

	SIZE: aspectRatio(BANNER_WIDTH, CELL_FACTOR, HEIGHT_RATIO),
GRID_WIDTH: GRID_WIDTH, // thickness of the maze walls
	CANVAS: document.querySelector("#banner"),
	BG_COLOR: "black",
	PRIMARY_COLOR: "#edcb96",
	GRADIENT_1: "#0E0E52", // midnight blue
	GRADIENT_2: "#FFB8D1", // cotton candy
	GRADIENT_3: "#E34234" // cinnabar
};

export default Constants
