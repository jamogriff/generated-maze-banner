import "./banner.js";
import Maze from "./maze.js";

// Width and cellSize are in pixels, ratio determines the x:1 aspect ratio
function aspectRatio(width, cellSize, ratio) {
	// would be preferable to implement promise here
	if (width < 200 || width > 800) return undefined;
	else {
		let numCol = width * 0.1; // Wall rendering was visually tuned to cell size being 10%
		let height = width / ratio;
		let dimensions = {
			x: width,
			y: height,
			rows: (height * numCol) / width, // cross product
			columns: numCol
		};
		return dimensions;
	}
}

const size = aspectRatio(400, 30, 4);

/*
create a new maze banner where:
(width, height, # rows, # columns)
*/
let maze = new Maze(size.x, size.y, size.rows, size.columns);
maze.initialize();
maze.draw();
