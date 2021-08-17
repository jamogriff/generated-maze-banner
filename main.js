import "./banner.js";
import Maze from "./maze.js";

// create x:1 aspect ratio
function aspectRatio(width, cellSize, ratio) {
	// would be preferable to implement promise here
	if (width < 200 || width > 800) return undefined;
	else {
		let height = width / ratio;
		// Wall rendering was visually tuned to cell size being 10%
		// of height or width
		let dimensions = {
			x: width,
			y: height,
			rows: width / cellSize,
			columns: width / cellSize 
		};
		return dimensions;
	}
}
const size = aspectRatio(200, 20, 1);

/*
create a new maze banner where:
(width, height, # rows, # columns)
*/
let maze = new Maze(size.x, size.y, size.rows, size.columns);
maze.initialize();
maze.draw();
