import {AnimationHandler, Animation} from "./banner.js";
import Maze from "./maze.js";
import {aspectRatio, logoPlacement, textPlacement} from "./size-helpers.js";

/*
Banner width is in pixels, height ratio determines the x:1 aspect ratio of the banner and
cell factor is a percentage of width that determines how small/large each cell is. The following produce good effects, but any other numbers will result in inconsistent results:
	- 0.2 super tiny cells
	- 0.1 medium cells
	- 0.05 large cells
*/
const BANNER_WIDTH = 300; // Tested between 200 and 800
const HEIGHT_RATIO = 2; // Tested from 1 to 8
const CELL_FACTOR = 0.05;

/*
The following are hashes that store calibrated coordinates,
and dimensions used to create a maze and logo respectively
*/
const size = aspectRatio(BANNER_WIDTH, CELL_FACTOR, HEIGHT_RATIO);
const logo = logoPlacement(size.x, size.y);
const text = textPlacement(size.x, size.y);

let maze = new Maze(size.x, size.y, size.rows, size.columns);
Animation.typeWriter(text);
//await maze.initialize();
//await maze.draw();
//await AnimationHandler.checkSequence(maze, logo);
