import Constants from "./constants.js";
import Banner from "./banner.js";
import AnimationHandler from "./animation.js";
import Maze from "./maze.js";
import { logoPlacement, textPlacement } from "./size-helpers.js";
const ctx = Constants.CANVAS.getContext("2d");

const primaryGradient = (width, height) => {
	let gradient = ctx.createLinearGradient(0, 0, width, height);
	gradient.addColorStop(0, Constants.GRADIENT_3); // midnight blue
	gradient.addColorStop(0.5, Constants.GRADIENT_2); // cotton candy
	gradient.addColorStop(1, Constants.GRADIENT_1); // cinnabar
	return gradient;
};

/*
The following are objects that store calibrated coordinates,
and dimensions used to create text and a logo respectively
*/
const text = textPlacement(Constants.SIZE.x, Constants.SIZE.y);
const logo = logoPlacement(Constants.SIZE.x, Constants.SIZE.y);

// Maze dimensions have a uniform border around all sides
const mazeWidth = Constants.SIZE.x - Constants.GRID_WIDTH;
const mazeHeight = Constants.SIZE.y - Constants.GRID_WIDTH;

let banner = new Banner(
	ctx,
	Constants.SIZE.x,
	Constants.SIZE.y,
	primaryGradient(Constants.SIZE.x, Constants.SIZE.y)
);

let maze = new Maze(
	mazeWidth,
	mazeHeight,
	Constants.SIZE.rows,
	Constants.SIZE.columns
);

banner.initialize();
maze.initialize();

AnimationHandler.start(text);
AnimationHandler.directSequence(banner, maze, logo);
