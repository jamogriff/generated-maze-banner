/*
Used for animation flags, not ideal but
Object oriented approach is wonky with
how callbacks occur-- if we want to pass in fresh data
with each callback in setTimeout then we need to wrap
the function in an anon function. But when you do that,
the scope is high up in window instead of
staying local in scope, thus everything is a class method.
*/
let firstTrigger = 0;
let secondTrigger = 0;
	function saveCanvasState() {
		let canvas = document.getElementById("banner");
		let ctx = canvas.getContext("2d");
		ctx.save();
	}

export default class AnimationHandler {
	/*
	The main function that checks for end of maze gen
	and then starts the next animation, which then
	cascades onto the next check and so on
	*/
	static checkSequence(maze, logo) {
		let timeoutId = setTimeout(function () {
			AnimationHandler.checkSequence(maze, logo);
		}, 3000);
		let flag = maze.complete;
		console.log("checking for end of animation...");
		if (flag == true) {
			console.log("Maze is finished");
			clearTimeout(timeoutId);
			// start next animation
			Animation.fadeBlack(maze.width, maze.height, firstTrigger);
			AnimationHandler.checkFadeEnd(logo, maze.width, maze.height);
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
			saveCanvasState();
			Animation.drawLogo(logo, width, height, 0);
			return;
		}
	}

}

export class Animation {
	static drawLogo(logo, width, height, opacity) {
		if (opacity >= 1) return;
		let canvas = document.getElementById("banner");
		let ctx = canvas.getContext("2d");
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
		// we can put this somewhere else, but for now:
		let banner = document.getElementById("banner");
		let ctx = banner.getContext("2d");

		// each opacity layer is additive, so we only wait
		// until .6 or so so have a black screen
		if (opacity >= 0.3) return;
		ctx.fillStyle = `rgba(0, 0, 0, ${opacity}`;
		ctx.fillRect(0, 0, width, height);
		opacity += 0.01;
		setTimeout(function () {
			Animation.fadeBlack(width, height, opacity);
		}, 100);
	}

	//typeWriter = () => {
	//let text = "jamison.codes";
	//let letters = text.substr(0, this.textCounter) + "\u258B";
	//ctx.fillStyle = "black";
	//ctx.fillRect(0, 0, this.size, this.size);
	//let gradient = ctx.createLinearGradient(0,0,this.size,0);

	//gradient.addColorStop(0, 'pink');
	//gradient.addColorStop(1, 'orange');
	//ctx.fillStyle = gradient;
	//ctx.font = "40px serif";
	//ctx.fillText(letters, this.size/this.columns, this.size/2); // arbitrary location to test
	//if (this.textCounter<=text.length) {
	//setTimeout(this.typeWriter, 200),
	//this.textCounter++
	//}
	//}
}
