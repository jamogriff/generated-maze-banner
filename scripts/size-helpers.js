/*
Used for generating correct proportions for different
sized banners. Squares up to 4:1 rectangles have been tested.
Cell factor results in different sized cells. Only 0.05, 0.1, 
and 0.2 produce consistent results.
*/
export function aspectRatio(width, cellFactor, ratio) {
	// would be preferable to implement promise here
	if (width < 200 || width > 800) return undefined;
	else {
		let numCol = width * cellFactor; // Wall rendering was visually tuned to cell size being 10%
		let height = width / ratio;
		let dimensions = {
			x: width,
			y: height,
			rows: (height * numCol) / width, // cross product
			columns: numCol,
		};
		return dimensions;
	}
}

// Used to place a logo/img directly in the center of a canvas
export function logoPlacement(width, height) {
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
		height: logoHeight,
	};
	return logo;
}

export function textPlacement(width, height) {
	let size = height / 5;
	let text = {
		x: 10,
		y: size + 5,
		fontSize: size,
		canvasWidth: width,
		canvasHeight: height
	};
	return text;
}
