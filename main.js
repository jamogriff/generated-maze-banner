import Constants from './constants.js';
import {AnimationHandler, Animation, Banner} from "./banner.js";
import Maze from "./maze.js";
import {aspectRatio, logoPlacement, textPlacement} from "./size-helpers.js";
/*
The following are hashes that store calibrated coordinates,
and dimensions used to create a maze and logo respectively
*/
const size = aspectRatio(Constants.BANNER_WIDTH, Constants.CELL_FACTOR, Constants.HEIGHT_RATIO);
const logo = logoPlacement(size.x, size.y);
const text = textPlacement(size.x, size.y);

//let banner = new Banner(
let maze = new Maze(size.x, size.y, size.rows, size.columns);
//Animation.typeWriter(text);
maze.initialize();
maze.draw();
//await AnimationHandler.checkSequence(maze, logo);
