class AnimationHandler {
	static checkMazeEnd(flag) {
		let timeoutId = setTimeout(checkMazeEnd, 300);
		console.log("checking for end of animation...");
		if (flag == true) {
			console.log("Maze is finished");
			clearTimeout(timeoutId);
			// start next animation
			Animation.blink();
			checkCursorEnd(#flag here);
			return;
		}
	}

	static checkCursorEnd(flag) {
		let timeoutId = setTimeout(checkCursorEnd, 1000);
		console.log("checking for end of blinking...");
		// Cursor blink count
		if (flag.count == 5) {
			console.log("Fade out start");
			clearTimeout(timeoutId);
			Animation.fadeBlack();
			checkFadeEnd();
			return;
		}
	}

	static checkFadeEnd(flag) {
		let timeoutId = setTimeout(checkFadeEnd, 1000);
		console.log("checking for end of fade sequence...");
		if (flag.opacity >= 0.3) {
			console.log("Typewriter start");
			clearTimeout(timeoutId);
			Animation.typeWriter();
			return;
		}
	}
}

class Message {}
