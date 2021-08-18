export default class AnimationHandler {

	static checkMazeEnd(maze) {
		let timeoutId = setTimeout(function(){AnimationHandler.checkMazeEnd(maze);}, 3000);
		let flag = maze.complete;
		console.log("checking for end of animation...");
		if (flag == true) {
			console.log("Maze is finished");
			clearTimeout(timeoutId);
			// start next animation
			Animation.fadeBlack(maze.width, maze.height, 0);
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

	//static checkFadeEnd(flag) {
		//let timeoutId = setTimeout(checkFadeEnd, 1000);
		//console.log("checking for end of fade sequence...");
		//if (flag.opacity >= 0.3) {
			//console.log("Typewriter start");
			//clearTimeout(timeoutId);
			//Animation.typeWriter();
			//return;
		//}
	//}
//}

}

export class Animation {


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
      if (opacity >= .3) return;
	  ctx.fillStyle = `rgba(0, 0, 0, ${opacity}`;
	  ctx.fillRect(0, 0, width, height);
	  opacity += .01;
      setTimeout(function(){ Animation.fadeBlack(width, height, opacity); }, 100);
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
