import AnimationHandler from "./banner.js";
import Maze from "./maze.js";
import {aspectRatio, logoPlacement} from "./size-helpers.js";

/*
Banner width is in pixels, height ratio determines the x:1 aspect ratio of the banner and
cell factor is a percentage of width that determines how small/large each cell is. The following produce good effects, but any other numbers will result in inconsistent results:
	- 0.2 super tiny cells
	- 0.1 medium cells
	- 0.05 large cells
*/
const BANNER_WIDTH = 400; // Val only tested between 200 and 800
const HEIGHT_RATIO = 8;
const CELL_FACTOR = 0.1;

/*
The following are hashes that store calibrated coordinates,
and dimensions used to create a maze and logo respectively
*/
const size = aspectRatio(BANNER_WIDTH, CELL_FACTOR, HEIGHT_RATIO);
const logo = logoPlacement(size.x, size.y);

let maze = new Maze(size.x, size.y, size.rows, size.columns);
maze.initialize();
maze.draw();
AnimationHandler.checkMazeEnd(maze);

let counter = 0;
function drawLogo(logo, opacity) {
	if (opacity >= 0.44) return;
	let canvas = document.getElementById("banner");
	let ctx = canvas.getContext("2d");
	let image = document.getElementById("brand");
	opacity += 0.04;
	ctx.globalAlpha = opacity;
	ctx.drawImage(image, logo.x, logo.y, logo.width, logo.height);
	// callback function has to be wrapped in an anonymous function
	// otherwise the function gets called immediately
	setTimeout(function(){ drawLogo(logo, opacity); }, 200);
}


//drawLogo(logoPlacement(size.x, size.y), 0);
