export const banner = document.querySelector("#banner");
export const canvas = banner.getContext("2d");

let currentNode; // will become a Cell object
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
		for (let row = 0; row < this.rows; row++) {
			let row = [];
			for (let column = 0; column < this.columns; column++) {
				// instantiate with reference to maze object
				let cell = new Cell(this);
				row.push(cell);
			}
			this.grid.push(row);
		}
		currentNode = this.grid[0][0]; // node at top right
	}

	draw() {
		banner.width = this.width;
		banner.height = this.height;
		canvas.fillStyle = primaryGradient(banner.width, banner.height);
		canvas.fillRect(0, 0, banner.width, banner.height);
		currentNode.visited = true;

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
		canvas.strokeStyle = primaryGradient(
			this.mazeWidth,
			this.mazeHeight
		);
		canvas.fillstyle = "black";
		canvas.fillRect(0, 0, this.mazeWidth, this.mazeHeight);
		canvas.lineWidth = 2;
		WallRenderer.draw(this.walls, x, y, width, height, rows, columns);

		// probably should call this a separate function for clarity
		if (this.visited) {
			canvas.fillRect(
				x + 1,
				y + 1,
				width / columns - 2,
				height / rows - 2
			);
		}
	}
}

class WallRenderer {
	// A massive amount of work is done on the maze to handle
	// drawing/hiding walls, therefore this separate class
	// is used to put that chunk of functionality
	// NOTE: may need a reference to canvas...
	// Wall drawing functions for each cell marked as 'true'
	showTopWall(x, y, width, columns) {
		canvas.beginPath();
		canvas.moveTo(x, y);
		canvas.lineTo(x + width / columns, y);
		canvas.stroke();
	}
	showBottomWall(x, y, width, rows, columns) {
		canvas.beginPath();
		canvas.moveTo(x, y + height / rows);
		canvas.lineTo(x + width / columns, y + height / rows);
		canvas.stroke();
	}

	showRightWall(x, y, width, height, rows, columns) {
		canvas.beginPath();
		canvas.moveTo(x + width / columns, y);
		canvas.lineTo(x + width / columns, y + height / rows);
		canvas.stroke();
	}

	showLeftWall(x, y, height, rows) {
		canvas.beginPath();
		canvas.moveTo(x, y);
		canvas.lineTo(x, y + height / rows);
		canvas.stroke();
	}

	// Wall hiding functions that are used on cells marked 'false'
	// Used due to using fillRect for maze bg, instead of CSS bg
	// NOTE: moveTo and lineTo are truncated so surrounding walls don't get cut into
	hideTopWall(x, y, width, columns) {
		canvas.beginPath();
		canvas.strokeStyle = "black";
		canvas.moveTo(x + 1, y);
		canvas.lineTo(x + width / columns - 1, y);
		canvas.stroke();
	}

	hideBottomPath(x, y, width, rows, columns) {
		canvas.beginPath();
		canvas.strokeStyle = "black";
		canvas.moveTo(x + 1, y + width / rows);
		canvas.lineTo(x + width / columns - 1, y + width / rows);
		canvas.stroke();
	}

	hideRightPath(x, y, width, rows, columns) {
		canvas.beginPath();
		canvas.strokeStyle = "black";
		canvas.moveTo(x + width / columns, y + 1);
		canvas.lineTo(x + width / columns, y + width / rows - 1);
		canvas.stroke();
	}

	hideLeftPath(x, y, height, rows) {
		canvas.beginPath();
		canvas.strokeStyle = "black";
		canvas.moveTo(x, y + 1);
		canvas.lineTo(x, y + height / rows - 1);
		canvas.stroke();
	}
	// Sorry for one letter params, but these get repeated a lot
	// Walls get either shown or hidden depending on boolean
	static draw(walls, x, y, w, h, r, c) {
		walls.topWall
			? this.showTopWall(x, y, w, c)
			: this.hideTopWall(x, y, w, c);

		walls.bottomWall
			? this.showBottomWall(x, y, w, r, c)
			: this.hideBottomWall(x, y, w, r, c);

		walls.rightWall
			? this.showRightWall(x, y, w, h, r, c)
			: this.hideRightWall(x, y, w, h, r, c);

		walls.leftWall
			? this.showLeftWall(x, y, h, r)
			: this.hideLeftWall(x, y, h, r);
	}
}
