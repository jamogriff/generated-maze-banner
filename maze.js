export const banner = document.querySelector("#banner");
export const canvas = banner.getContext("2d");

let currentCell; // will become a Cell object
const primaryGradient = (width, height) => {
	let gradient = canvas.createLinearGradient(0, 0, width, height);
	gradient.addColorStop(0, "#0E0E52"); // midnight blue
	gradient.addColorStop(0.5, "#FFB8D1"); // cotton candy
	gradient.addColorStop(1, "#E34234"); // cinnabar
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
		// Results in 2D array where grid.length = # rows and grid[0].length = # of columns
		// Confusing because instead of an x, y coordinate its essentially y, x pair
		for (let row = 0; row < this.rows; row++) {
			let populatedRow = [];
			for (let column = 0; column < this.columns; column++) {
				// instantiate with reference to maze object with coordinate pair
				let cell = new Cell(row, column, this);
				populatedRow.push(cell);
			}
			this.grid.push(populatedRow);
		}
		currentCell = this.grid[0][0]; // node at top right
		// add goal here?
	}

	draw() {
		banner.width = this.width;
		banner.height = this.height;
		canvas.fillStyle = primaryGradient(banner.width, banner.height);
		canvas.fillRect(0, 0, banner.width, banner.height);
		currentCell.visited = true;

		for (let row = 0; row < this.rows; row++) {
			for (let column = 0; column < this.columns; column++) {
				let grid = this.grid;
				grid[row][column].show(
					this.width,
					this.height,
					this.rows,
					this.columns
				);
			}
		}

		currentCell.highlight(this.columns, this.rows, .5);
	}
}

// Probably a big LoD violation in terms of instantiating a Cell
// with it's parent, but there's crossover on a lot of its properties
// NOTE: Refactor to include dimensions with object
class Cell {
	constructor(row, column, parent) {
		// a Cell needs to know about the size of the canvas for rendering
		// as well as the grid, to check it's neighbors
		this.mazeWidth = parent.width;
		this.mazeHeight = parent.height;
		this.mazeGrid = parent.grid;
		// the following are params specific to each cell
		this.params = {
			row: row,
			column: column,
			visited: false,
			walls: {
				topWall: true,
				bottomWall: true,
				rightWall: true,
				leftWall: true,
			},
		};
	}

	show(width, height, rows, columns) {
		let x = (this.params.column * width) / columns;
		let y = (this.params.row * height) / rows;
		canvas.strokeStyle = primaryGradient(
			this.mazeWidth,
			this.mazeHeight
		);
		canvas.fillstyle = "black";
		canvas.fillRect(0, 0, this.mazeWidth, this.mazeHeight);
		canvas.lineWidth = 2;
		this.renderWalls(x, y, width, height, rows, columns);

		// probably should call this a separate function for clarity
		if (this.params.visited) {
			canvas.fillRect(
				x + 1,
				y + 1,
				width / columns - 2,
				height / rows - 2
			);
		}
	}

	// Columns and rows from maze are passed in to set size of cell
	highlight(columns, rows, transparency) {
		// transparency added to add a trailing effect
		let alpha = "";
		if (transparency == 1) alpha = "FF";
		if (transparency == 0.5) alpha = "80";

		let x = (this.params.column * this.mazeWidth) / columns + 1;
		let y = (this.params.row * this.mazeHeight) / rows + 1;
		canvas.fillStyle = "#edcb96" + alpha;
		canvas.fillRect(
			x,
			y,
			this.mazeWidth / columns - 2,
			this.mazeHeight / rows - 2
		);
	}

	// Logically removes walls, but doesn't render this change
	removeWalls(cell1, cell2) {
		// compares two neighboring cells on x-axis and y-axis respectively to determine relative location
		let x = cell1.params.column - cell2.params.column;
		let y = cell1.params.row - cell2.params.row;

		// Since two neighboring cells have overlapping walls, two walls must be turned off at the same time
		if (x === -1) {
			cell1.params.walls.rightWall = false;
			cell2.params.walls.leftWall = false;
		} else if (x === 1) {
			cell1.params.walls.leftWall = false;
			cell2.params.walls.rightWall = false;
		}

		// Same concept for y-axis
		if (y === -1) {
			cell1.params.walls.bottomWall = false;
			cell2.params.walls.topWall = false;
		} else if (y === 1) {
			cell1.params.walls.topWall = false;
			cell2.params.walls.bottomWall = false;
		}
	}

	// Sorry for one letter params, but these get repeated a lot
	// Walls get either shown or hidden depending on boolean
	renderWalls(x, y, w, h, r, c) {
		this.params.walls.topWall
			? WallRenderer.showTopWall(x, y, w, c)
			: WallRenderer.hideTopWall(x, y, w, c);

		this.params.walls.bottomWall
			? WallRenderer.showBottomWall(x, y, w, h, r, c)
			: WallRenderer.hideBottomWall(x, y, w, h, r, c);

		this.params.walls.rightWall
			? WallRenderer.showRightWall(x, y, w, h, r, c)
			: WallRenderer.hideRightWall(x, y, w, h, r, c);

		this.params.walls.leftWall
			? WallRenderer.showLeftWall(x, y, h, r)
			: WallRenderer.hideLeftWall(x, y, h, r);
	}

	checkNeighbors() {
		let grid = this.mazeGrid;
		let row = this.params.row;
		let column = this.params.column;
		let neighbors = [];

		// Setting the neighbors of a cell, accounting for cells on outside border
		let top = row !== 0 ? grid[row - 1][column] : undefined;
		let bottom =
			row !== grid.length - 1
				? grid[row + 1][column]
				: undefined;
		let right =
			column !== grid[0].length - 1
				? grid[row][column + 1]
				: undefined;
		let left = column !== 0 ? grid[row][column - 1] : undefined;

		// Push neighbors into array if they exist and have not been visited
		if (top && !top.visited) neighbors.push(top);
		if (bottom && !bottom.visited) neighbors.push(bottom);
		if (right && !right.visited) neighbors.push(right);
		if (left && !left.visited) neighbors.push(left);

		// Return a random neighbor
		return randomNeighbor(neighbors);
	}

	randomNeighbor(neighborArray) {
		if (neighborArray.length !== 0) {
			let random = Math.floor(
				Math.random() * neighborArray.length
			);
			return neighborArray[random];
		} else {
			return undefined;
		}
	}
}

// A massive amount of work is done on the maze to handle
// drawing/hiding walls, therefore this separate class
// is used to put that chunk of functionality
class WallRenderer {
	// Wall drawing functions for each cell marked as 'true'
	static showTopWall(x, y, width, columns) {
		canvas.beginPath();
		canvas.moveTo(x, y);
		canvas.lineTo(x + width / columns, y);
		canvas.stroke();
	}
	static showBottomWall(x, y, width, height, rows, columns) {
		canvas.beginPath();
		canvas.moveTo(x, y + height / rows);
		canvas.lineTo(x + width / columns, y + height / rows);
		canvas.stroke();
	}

	static showRightWall(x, y, width, height, rows, columns) {
		canvas.beginPath();
		canvas.moveTo(x + width / columns, y);
		canvas.lineTo(x + width / columns, y + height / rows);
		canvas.stroke();
	}

	static showLeftWall(x, y, height, rows) {
		canvas.beginPath();
		canvas.moveTo(x, y);
		canvas.lineTo(x, y + height / rows);
		canvas.stroke();
	}

	// Wall hiding functions that are used on cells marked 'false'
	// Used due to using fillRect for maze bg, instead of CSS bg
	// NOTE: moveTo and lineTo are truncated so surrounding walls don't get cut into
	static hideTopWall(x, y, width, columns) {
		canvas.beginPath();
		canvas.strokeStyle = "black";
		canvas.moveTo(x + 1, y);
		canvas.lineTo(x + width / columns - 1, y);
		canvas.stroke();
	}

	static hideBottomPath(x, y, width, height, rows, columns) {
		canvas.beginPath();
		canvas.strokeStyle = "black";
		canvas.moveTo(x + 1, y + height / rows);
		canvas.lineTo(x + width / columns - 1, y + height / rows);
		canvas.stroke();
	}

	static hideRightPath(x, y, width, rows, columns) {
		canvas.beginPath();
		canvas.strokeStyle = "black";
		canvas.moveTo(x + width / columns, y + 1);
		canvas.lineTo(x + width / columns, y + width / rows - 1);
		canvas.stroke();
	}

	static hideLeftPath(x, y, height, rows) {
		canvas.beginPath();
		canvas.strokeStyle = "black";
		canvas.moveTo(x, y + 1);
		canvas.lineTo(x, y + height / rows - 1);
		canvas.stroke();
	}
}
