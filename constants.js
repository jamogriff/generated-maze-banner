/*
Banner width is in pixels, height ratio determines the x:1 aspect ratio of the banner and
cell factor is a percentage of width that determines how small/large each cell is. The following produce good effects, but any other numbers will result in inconsistent results:
	- 0.2 super tiny cells
	- 0.1 medium cells
	- 0.05 large cells
*/
const Constants = {

	BANNER_WIDTH: 600, // Tested between 200 and 800
HEIGHT_RATIO: 6, // Tested from 1 to 8
	CELL_FACTOR: 0.05,
GRID_WIDTH: 4, // thickness of the maze walls
	CANVAS: document.querySelector("#banner"),
	BG_COLOR: "black",
	PRIMARY_COLOR: "#edcb96",
	GRADIENT_1: "#0E0E52", // midnight blue
	GRADIENT_2: "#FFB8D1", // cotton candy
	GRADIENT_3: "#E34234" // cinnabar
};

export default Constants
