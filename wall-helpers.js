// A massive amount of work is done on the maze to handle
// drawing/hiding walls, therefore this separate class
// is used to put that chunk of functionality

// NOTE: may need a reference to ctx...
export default class WallHelpers {
  // Wall drawing functions for each cell marked as 'true'
  static showTopWall(x, y, width, columns) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width / columns, y);
    ctx.stroke();
  }
  static showBottomWall(x, y, width, rows, columns) {
    ctx.beginPath();
    ctx.moveTo(x, y + height / rows);
    ctx.lineTo(x + width / columns, y + height / rows);
    ctx.stroke();
  }

  static showRightWall(x, y, width, height, rows, columns) {
    ctx.beginPath();
    ctx.moveTo(x + width / columns, y);
    ctx.lineTo(x + width / columns, y + height / rows);
    ctx.stroke();
  }

  static showLeftWall(x, y, height, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height / rows);
    ctx.stroke();
  }

  // Wall hiding functions that are used on cells marked 'false'
  // Used due to using fillRect for maze bg, instead of CSS bg
  // NOTE: moveTo and lineTo are truncated so surrounding walls don't get cut into
  hideTopWall(x, y, width, columns) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(x + 1, y);
    ctx.lineTo(x + width / columns - 1, y);
    ctx.stroke();
  }

  hideBottomPath(x, y, width, rows, columns) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(x + 1, y + width / rows);
    ctx.lineTo(x + width / columns - 1, y + width / rows);
    ctx.stroke();
  }

  hideRightPath(x, y, width, rows, columns) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(x + width / columns, y + 1);
    ctx.lineTo(x + width / columns, y + width / rows - 1);
    ctx.stroke();
  }

  hideLeftPath(x, y, height, rows) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(x, y + 1);
    ctx.lineTo(x, y + height / rows - 1);
    ctx.stroke();
  }
}
