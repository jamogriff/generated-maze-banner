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
				let cell = new Cell(
					this.width,
					this.height,
					this.grid,
					row,
					column
				);
				row.push(cell);
			}
			this.grid.push(row);
		}
		currentNode = this.grid[0][0];
	}
}

class Cell {
	constructor(parentX, parentY, parentGrid, rowNum, colNum) {
		this.parentWidth = parentX;
		this.parentHeight = parentY;
		this.parentGrid = parentGrid;
		this.visited = false;
		this.walls = {
			topWall: true,
			bottomWall: true,
			rightWall: true,
			leftWall: true,
		};
	}
}
