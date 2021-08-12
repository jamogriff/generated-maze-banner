let currentNode;

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

	// Wall drawing functions for each cell. Will be called if relevent wall is set to true in cell constructor
	drawTopWall(x, y, width, columns) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + width / columns, y);
		ctx.stroke();
	}
	drawBottomWall(x, y, width, columns, rows) {
		ctx.beginPath();
		ctx.moveTo(x, y + height / rows);
		ctx.lineTo(x + width / columns, y + height / rows);
		ctx.stroke();
	}
	drawRightWall(x, y, width, height, columns, rows) {
		ctx.beginPath();
		ctx.moveTo(x + width / columns, y);
		ctx.lineTo(x + width / columns, y + height / rows);
		ctx.stroke();
	}
	drawLeftWall(x, y, height, rows) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x, y + height / rows);
		ctx.stroke();
	}

	show(width, height, rows, columns) {
		let x = (this.mazeColumns * width) / columns;
		let y = (this.mazeRows * height) / rows;
		ctx.strokeStyle = "navajowhite";
		ctx.fillstyle = "black";
		ctx.fillRect(0, 0, this.mazeWidth, this.mazeHeight);
		ctx.lineWidth = 2;
	}
}
