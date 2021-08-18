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

function logoPlacement(width, height) {
	// Using Canvas height to constrain height of logo
	let yBuffer = 20; // space buffer above and below logo
	let logoHeight = height - yBuffer;
	let logoWidth = logoHeight * 2.5; // 2.5:1 is aspect ratio of my logo, YMMV
	let logoX = width / 2 - logoWidth / 2;
	let logoY = yBuffer / 2;
	let logo = {
		x: logoX,
		y: logoY,
		width: logoWidth,
		height: logoHeight
	}
	return logo;
}

function drawLogo(logo) {
	let canvas = document.getElementById("banner");
	let ctx = canvas.getContext("2d");
	let image = document.getElementById("brand");
	ctx.drawImage(image, logo.x, logo.y, logo.width, logo.height);
}


const size = aspectRatio(400, 30, 4);
//const logo = logoPlacement(size.x, size.y);

/*
create a new maze banner where:
(width, height, # rows, # columns)
*/
let maze = new Maze(size.x, size.y, size.rows, size.columns);
maze.initialize();
drawLogo(logoPlacement(size.x, size.y));
//maze.draw();
