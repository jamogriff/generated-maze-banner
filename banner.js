import Constants from "./constants.js";
/*
Used for animation flags, not ideal but
Object oriented approach is wonky with
how callbacks occur-- if we want to pass in fresh data
with each callback in setTimeout then we need to wrap
the function in an anon function. But when you do that,
the scope is high up in window instead of
staying local in scope, thus everything is a class method.
*/
let textCounter = 0;
let timeCheck1 = 0;
let opacityCheck1 = 0;
let timeCheck2 = 0;
let opacityCheck2 = 0;

const ctx = Constants.CANVAS.getContext("2d");

export default class Banner {
	constructor(context, width, height, gradient) {
		this.ctx = context;
		this.width = width;
		this.height = height;
		this.color = gradient;
	}

	initialize() {
		banner.width = this.width;
		banner.height = this.height;
	}

	draw(color) {
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, banner.width, banner.height);
	}
}

export class AnimationHandler {
	static start(text, color) {
		Animation.typeWriter(text, color);
	}
	/*
	The main function that checks for end of maze gen
	and then starts the next animation, which then
	cascades onto the next check and so on
	*/
	static directSequence(banner, maze, logo) {
		let timeoutId = setTimeout(function () {
			AnimationHandler.directSequence(
				banner,
				maze,
				logo
			);
		}, 2000);
		console.log("Waiting for end of text animation...");
		timeCheck1 += 1;
		if (timeCheck1 >= 3) {
			console.log("Text is finished");
			clearTimeout(timeoutId);
			// start next animation
			Animation.fadeIn(
				banner.width,
				banner.height,
				banner.color,
			);
			AnimationHandler.checkFadeIn(
				banner,
				maze,
				logo
			);
			return;
		}
	}

	static checkFadeIn(banner, maze, logo) {
		let timeoutId = setTimeout(function () {
			AnimationHandler.checkFadeIn(banner, maze, logo);
		}, 1000);
		console.log("Checking for end of fade in sequence...");

		// Basically will just initiate after 3 seconds
		if (opacityCheck1 >= .6) {
			console.log("Maze start");
			clearTimeout(timeoutId);
			ctx.globalAlpha = 1;
			banner.draw(banner.color);
			maze.draw();
			AnimationHandler.checkMazeEnd(banner, maze, logo);
			return;
		}
	}
	static checkMazeEnd(banner, maze, logo) {
		let timeoutId = setTimeout(function () {
			AnimationHandler.checkMazeEnd(
				banner,
				maze,
				logo
			);
		}, 3000);
		let flag = maze.complete;
		console.log("Checking for end of animation...");
		if (flag == true) {
			console.log("Maze is finished");
			clearTimeout(timeoutId);
			// start next animation
			Animation.fadeBlack(
				banner.width,
				banner.height,
			);
			AnimationHandler.checkFadeEnd(
				logo,
				banner.width,
				banner.height
			);
			return;
		}
	}

	//static checkCursorEnd(flag) {
	//let timeoutId = setTimeout(checkCursorEnd, 1000);
	//console.log("checking for end of blinking...");
	//// Cursor blink count
	//if (flag.count == 5) {
	//console.log("Fade out start");
	//clearTimeout(timeoutId);
	//Animation.fadeBlack();
	//checkFadeEnd();
	//return;
	//}
	//}

	static checkFadeEnd(logo, width, height) {
		let timeoutId = setTimeout(function () {
			AnimationHandler.checkFadeEnd(logo, width, height);
		}, 1000);
		console.log("checking for end of fade sequence...");
		timeCheck2 += 1;
		// Basically will just initiate after 3 seconds
		if (timeCheck2 >= 3) {
			console.log("Logo start");
			clearTimeout(timeoutId);
			Animation.drawLogo(logo, width, height, 0);
			return;
		}
	}
}

export class Animation {
	static drawLogo(logo, width, height, opacity) {
		if (opacity >= 1) return;
		let image = document.getElementById("brand");
		ctx.globalAlpha = 1;

		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);
		opacity += 0.04;
		ctx.globalAlpha = opacity;
		ctx.drawImage(image, logo.x, logo.y, logo.width, logo.height);
		// callback function has to be wrapped in an anonymous function
		// otherwise the function gets called immediately
		setTimeout(function () {
			Animation.drawLogo(logo, width, height, opacity);
		}, 100);
	}

	static fadeIn(width, height, color) {
		// each opacity layer is additive, so we only wait
		// until .3 or so so have a black screen
		if (opacityCheck1 >= 0.6) return;
		opacityCheck1 += 0.04;
		ctx.globalAlpha = opacityCheck1;
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, width, height);
		opacityCheck1 += 0.01;
		setTimeout(function () {
			Animation.fadeIn(width, height, color);
		}, 100);
	}
	//blink = () => {
	//if (this.cursor >= 8) return;
	//let cursorFill = this.cursor;
	//let width = this.size / this.columns - 2;
	//let height = this.size / this.rows - 2;

	//if (cursorFill % 2 == 0) {
	//ctx.fillStyle = "orange";
	//ctx.fillRect(1, 1, width, height);
	//} else {
	//ctx.fillStyle = "rgba(0, 0, 0, 1)";
	//ctx.fillRect(1, 1, width, height);
	//}

	//this.cursor += 1;
	//setTimeout(this.blink, 1000);
	//// flip-flopping opacity values
	//}

	// We could make Animation objects that hold params like width, height, opacity etc, so we wouldn't need to pass in arguments ******8
	static fadeBlack(width, height) {
		// each opacity layer is additive, so we only wait
		// until .3 or so so have a black screen
		if (opacityCheck2 >= 0.3) return;
		ctx.fillStyle = `rgba(0, 0, 0, ${opacityCheck2}`;
		ctx.fillRect(0, 0, width, height);
		opacityCheck2 += 0.01;
		setTimeout(function () {
			Animation.fadeBlack(width, height);
		}, 100);
	}

	static typeWriter(textObj, color) {
		let text = "node maze-gen.js";
		let letters = "> " + text.substr(0, textCounter) + "\u258B";
		ctx.fillStyle = Constants.BG_COLOR;
		ctx.fillRect(0, 0, textObj.canvasWidth, textObj.canvasHeight);

		ctx.fillStyle = color;
		ctx.font = `${textObj.fontSize}px serif`;
		ctx.fillText(letters, textObj.x, textObj.y);
		if (textCounter <= text.length) {
			setTimeout(function () {
				Animation.typeWriter(textObj, color);
			}, 150);
			textCounter++;
		}
	}
}
