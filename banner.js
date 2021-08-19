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
let firstTrigger = 0;
let secondTrigger = 0;
const canvas = document.getElementById("banner");
const ctx = canvas.getContext("2d");

export default class Banner {
	constructor(context, width, height) {
		this.ctx = context;
		this.width = width;
		this.height = height;
	}

	draw(color) {
		banner.width = this.width;
		banner.height = this.height;
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, banner.width, banner.height);
	}
}

export class AnimationHandler {
	/*
	The main function that checks for end of maze gen
	and then starts the next animation, which then
	cascades onto the next check and so on
	*/
	static checkSequence(banner, maze, logo) {
		let timeoutId = setTimeout(function () {
			AnimationHandler.checkSequence(banner, maze, logo);
		}, 3000);
		let flag = maze.complete;
		console.log("checking for end of animation...");
		if (flag == true) {
			console.log("Maze is finished");
			clearTimeout(timeoutId);
			// start next animation
			Animation.fadeBlack(
				banner.width,
				banner.height,
				firstTrigger
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
		secondTrigger += 1;
		// Basically will just initiate after 3 seconds
		if (secondTrigger >= 3) {
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
	static fadeBlack(width, height, opacity) {
		// each opacity layer is additive, so we only wait
		// until .3 or so so have a black screen
		if (opacity >= 0.3) return;
		ctx.fillStyle = `rgba(0, 0, 0, ${opacity}`;
		ctx.fillRect(0, 0, width, height);
		opacity += 0.01;
		setTimeout(function () {
			Animation.fadeBlack(width, height, opacity);
		}, 100);
	}

	static typeWriter(textObj) {
		let text = "node maze-gen.js";
		let letters = "> " + text.substr(0, textCounter) + "\u258B";
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, textObj.canvasWidth, textObj.canvasHeight);
		let gradient = ctx.createLinearGradient(
			0,
			0,
			textObj.canvasWidth / 2,
			0
		);

		gradient.addColorStop(0, "blue");
		gradient.addColorStop(1, "pink");
		ctx.fillStyle = gradient;
		ctx.font = `${textObj.fontSize}px serif`;
		ctx.fillText(letters, textObj.x, textObj.y);
		if (textCounter <= text.length) {
			setTimeout(function () {
				Animation.typeWriter(textObj);
			}, 150);
			textCounter++;
		}
	}
}
