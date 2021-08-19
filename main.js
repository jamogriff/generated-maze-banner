import Constants from "./scripts/constants.js";
import Banner from "./scripts/banner.js";
import AnimationHandler from "./scripts/animation.js";
import Maze from "./scripts/maze.js";
import { logoPlacement, textPlacement } from "./scripts/size-helpers.js";
const ctx = Constants.CANVAS.getContext("2d");

/*
The following are objects that store calibrated coordinates
and dimensions used to create text and a logo respectively
*/
const text = textPlacement(Constants.SIZE.x, Constants.SIZE.y);
const logo = logoPlacement(Constants.SIZE.x, Constants.SIZE.y);

// Maze dimensions have a uniform border around all sides
const mazeWidth = Constants.SIZE.x - Constants.GRID_WIDTH;
const mazeHeight = Constants.SIZE.y - Constants.GRID_WIDTH;

// Banner is the base object that sets size of canvas and background
let banner = new Banner(ctx, Constants.SIZE.x, Constants.SIZE.y);
banner.initialize();

/*
Maze is a 2D array of Cell objects
A DFS-type algorithm is used to create a
maze and WallRenderer shows this visually
*/
let maze = new Maze(
	mazeWidth,
	mazeHeight,
	Constants.SIZE.rows,
	Constants.SIZE.columns
);
maze.initialize();

/*
AnimationHandler controls the sequence of all of the animations.
DirectSequence kicks off a chain of events until animation is finished
*/
AnimationHandler.start(text);
AnimationHandler.directSequence(banner, maze, logo);
