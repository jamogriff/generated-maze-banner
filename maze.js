export const banner = document.querySelector("#banner");
export const canvas = banner.getContext("2d");

let currentCell; // will become a Cell object
const gridWidth = 2; // in pixels
const gridOffset = gridWidth / 2;
const bgColor = "black";
const primaryGradient = (width, height) => {
	let gradient = canvas.createLinearGradient(0, 0, width, height);
	gradient.addColorStop(0, "#0E0E52"); // midnight blue
	gradient.addColorStop(0.5, "#FFB8D1"); // cotton candy
	gradient.addColorStop(1, "#E34234"); // cinnabar
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
		// Initialize starting cell and stack for maze generation
		currentCell = this.grid[0][0]; // node at top right
		currentCell.params.visited = true;
		// add goal here?
	}

	draw() {
		banner.width = this.width + gridWidth;
		banner.height = this.height + gridWidth;
		canvas.fillStyle = primaryGradient(banner.width, banner.height);
		canvas.fillRect(0, 0, banner.width, banner.height);

		for (let row = 0; row < this.rows; row++) {
			for (let column = 0; column < this.columns; column++) {
				let grid = this.grid;
				grid[row][column].show(this.rows, this.columns);
			}
		}
		// Iterative maze generation
		let neighbor = currentCell.checkNeighbors();

		if (neighbor) {
			currentCell.highlight(this.columns, this.rows, 1);
			this.stack.push(currentCell);
			currentCell.removeWalls(neighbor);
			neighbor.params.visited = true;
			this.stack.push(neighbor);
			currentCell = neighbor;
		} else if (this.stack.length > 0) {
			currentCell = this.stack.pop();
			currentCell.highlight(this.columns, this.rows, 1);
		}

		if (this.stack.length == 0) {
			console.log("Maze gen finished");
			return;
		}

		// while there are cells to traverse (i.e. stack)
		//while (this.stack.length !== 0) {
		//// take top of stack and call it current
		//let current = this.stack.pop();
		////debugger;
		//current.highlight(this.columns, this.rows, 1);
		//let neighbors = current.checkNeighbors();
		//// if current has any neighbors
		//if (neighbors.length > 0) {
		//// push current back to stack which
		//// allows for backtracking
		//this.stack.push(current);

		//// select random neighbor
		//let neighbor =
		//current.randomNeighbor(neighbors);
		//// remove walls between cells
		//current.removeWalls(neighbor);
		//neighbor.params.visited = true;
		//this.stack.push(neighbor);
		//}
		//}
		// Since this method get called at least 30fps,  we need to streamline the maze generation algorithm to run in a more conditional manner
		window.requestAnimationFrame(() => {
			this.draw();
		});
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

	show(rows, columns) {
		let x = (this.params.column * this.mazeWidth) / columns;
		let y = (this.params.row * this.mazeHeight) / rows;
		//canvas.strokeStyle = "black"; // used for debugging
		canvas.strokeStyle = primaryGradient(
			this.mazeWidth,
			this.mazeHeight
		);
		canvas.lineWidth = gridWidth;
		// Removes walls
		WallRenderer.renderWalls(
			this.params.walls,
			x,
			y,
			this.mazeWidth,
			this.mazeHeight,
			rows,
			columns
		);

		// probably should call this a separate function for clarity
		if (this.params.visited) {
			canvas.fillStyle = "black";
			canvas.fillRect(
				x + gridWidth,
				y + gridWidth,
				this.mazeWidth / columns - gridWidth,
				this.mazeHeight / rows - gridWidth
			);
		}
	}

	// Columns and rows from maze are passed in to set size of cell
	highlight(columns, rows, transparency) {
		// transparency added to add a trailing effect
		let alpha = "";
		if (transparency == 1) alpha = "FF";
		if (transparency == 0.5) alpha = "80";

		let x = (this.params.column * this.mazeWidth) / columns;
		let y = (this.params.row * this.mazeHeight) / rows;
		canvas.fillStyle = "#edcb96" + alpha;
		canvas.fillRect(
			x + gridWidth,
			y + gridWidth,
			this.mazeWidth / columns - gridWidth,
			this.mazeHeight / rows - gridWidth
		);
	}

	// Logically removes walls, but doesn't render this change
	removeWalls(neighborCell) {
		// compares two neighboring cells on x-axis and y-axis respectively to determine relative location
		let x = this.params.column - neighborCell.params.column;
		let y = this.params.row - neighborCell.params.row;

		// Since two neighboring cells have overlapping walls, two walls must be turned off at the same time
		if (x === -1) {
			this.params.walls.rightWall = false;
			neighborCell.params.walls.leftWall = false;
		} else if (x === 1) {
			this.params.walls.leftWall = false;
			neighborCell.params.walls.rightWall = false;
		}

		// Same concept for y-axis
		if (y === -1) {
			this.params.walls.bottomWall = false;
			neighborCell.params.walls.topWall = false;
		} else if (y === 1) {
			this.params.walls.topWall = false;
			neighborCell.params.walls.bottomWall = false;
		}
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
		if (top && !top.params.visited) neighbors.push(top);
		if (bottom && !bottom.params.visited) neighbors.push(bottom);
		if (right && !right.params.visited) neighbors.push(right);
		if (left && !left.params.visited) neighbors.push(left);

		// Return neighbors array
		return this.randomNeighbor(neighbors);
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

class WallRenderer {
	// Wall hiding functions that are used on cells marked 'false
	static hideTopWall(x, y, width, columns) {
		canvas.beginPath();
		canvas.strokeStyle = bgColor;
		canvas.moveTo(x + gridWidth, y + gridOffset);
		canvas.lineTo(x + width / columns, y + gridOffset);
		canvas.stroke();
	}

	static hideBottomWall(x, y, width, height, rows, columns) {
		canvas.beginPath();
		canvas.strokeStyle = bgColor;
		canvas.moveTo(x + gridWidth, gridOffset + y + height / rows);
		canvas.lineTo(
			x + width / columns,
			gridOffset + y + height / rows
		);
		canvas.stroke();
	}

	static hideRightWall(x, y, width, height, rows, columns) {
		canvas.beginPath();
		canvas.strokeStyle = bgColor;
		canvas.moveTo(x + width / columns + gridOffset, y + gridWidth);
		canvas.lineTo(
			x + width / columns + gridOffset,
			y + height / rows
		);
		canvas.stroke();
	}

	static hideLeftWall(x, y, height, rows) {
		canvas.beginPath();
		canvas.strokeStyle = bgColor;
		canvas.moveTo(x + gridOffset, y + gridWidth);
		canvas.lineTo(x + gridOffset, y + height / rows);
		canvas.stroke();
	}

	// Walls render as hidden depending on boolean status in Cell object
	static renderWalls(walls, x, y, w, h, r, c) {
		if (walls.topWall == false) WallRenderer.hideTopWall(x, y, w, c);
		if (walls.bottomWall == false) WallRenderer.hideBottomWall(x, y, w, h, r, c);
		if (walls.rightWall == false) WallRenderer.hideRightWall(x, y, w, h, r, c);
		if (walls.leftWall == false) WallRenderer.hideLeftWall(x, y, h, r);
	}

}
