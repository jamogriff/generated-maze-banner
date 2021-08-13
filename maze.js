import WallHelpers from "./wall-helpers.js";

const banner = document.querySelector("#banner");
const ctx = banner.getContext("2d");
let currentNode;
const primaryGradient = (canvas, width, height) => {
	let gradient = canvas.createLinearGradient(0, 0, width, height);
	gradient.addColorStop(0, "#0E0E52"); // midnight blue
	gradient.addColorStop(0.5, "#FFB8D1"); // cotton candy
	gradient.addColorStop(1, "#F2433"); // cinnabar
	//Gold Crayola: #edcb96
	return gradient;
};

export default class Maze {
	constructor(x, y, rows, columns) {
		this.width = x;
		this.height = y;
		this.rows = rows;
		this.columns = columns;
		this.grid = [];
		this.stack = [];
	}

	initialize() {
		for (let row = 0; row < this.rows; row++) {
			let row = [];
			for (let column = 0; column < this.columns; column++) {
				// instantiate with reference to maze object
				let cell = new Cell(this);
				row.push(cell);
			}
			this.grid.push(row);
		}
		currentNode = this.grid[0][0];
	}
}

// Probably a big LoD violation in terms of instantiating a Cell
// with it's parent, but there's crossover on all of its properties
class Cell {
	constructor(parent) {
		this.mazeWidth = parent.width;
		this.mazeHeight = parent.height;
		this.mazeGrid = parent.grid;
		this.mazeRows = parent.rows;
		this.mazeColumns = parent.columns;
		this.visited = false;
		this.walls = {
			topWall: true,
			bottomWall: true,
			rightWall: true,
			leftWall: true,
		};
	}

	show(width, height, rows, columns) {
		let x = (this.mazeColumns * width) / columns;
		let y = (this.mazeRows * height) / rows;
		ctx.strokeStyle = primaryGradient;
		ctx.fillstyle = "black";
		ctx.fillRect(0, 0, this.mazeWidth, this.mazeHeight);
		ctx.lineWidth = 2;
		this.renderWalls(x, y, width, height, rows, columns);
		
		// probably should call this a separate function for clarity
		if (this.visited) {
			ctx.fillRect(x + 1, y + 1, width/columns - 2, height/rows - 2);
		}
	}

	// Sorry for one letter params, but these get repeated a lot
	// Walls get either shown or hidden depending on boolean
	renderWalls(x, y, w, h, r, c) {
		this.walls.topWall
			? showTopWall(x, y, w, c)
			: hideTopWall(x, y, w, c);

		this.walls.bottomWall
			? showBottomWall(x, y, w, r, c)
			: hideBottomWall(x, y, w, r, c);

		this.walls.rightWall
			? showRightWall(x, y, w, h, r, c)
			: hideRightWall(x, y, w, h, r, c);

		this.walls.leftWall
			? showLeftWall(x, y, h, r)
			: hideLeftWall(x, y, h, r);
	}
}
