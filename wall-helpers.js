// A massive amount of work is done on the maze to handle
// drawing/hiding walls, therefore this separate class
// is used to put that chunk of functionality
export default class WallHelpers {
  // Wall drawing functions for each cell marked as 'true'
  static drawTopWall(x, y, width, columns) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width / columns, y);
    ctx.stroke();
  }
  static drawBottomWall(x, y, width, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y + height / rows);
    ctx.lineTo(x + width / columns, y + height / rows);
    ctx.stroke();
  }

  static drawRightWall(x, y, width, height, columns, rows) {
    ctx.beginPath();
    ctx.moveTo(x + width / columns, y);
    ctx.lineTo(x + width / columns, y + height / rows);
    ctx.stroke();
  }

  static drawLeftWall(x, y, height, rows) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height / rows);
    ctx.stroke();
  }

  // Wall hiding functions that are used on cells marked 'false'

}
