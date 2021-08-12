import './banner.js'
import Maze from './maze.js'

let banner = document.querySelector("#banner");
let ctx = banner.getContext("2d");

let maze = new Maze(300, 300, 15, 15)
maze.initialize();
ctx.beginPath();
ctx.fillStyle = "black";
ctx.fillRect(0,0,maze.width,maze.height);
