// Very straightforward object
export default class Banner {
	constructor(context, width, height, gradient) {
		this.ctx = context;
		this.width = width;
		this.height = height;
		this.color = gradient;
	}

	// This sets w/h of the CSS "banner" element
	// NOT an instance
	initialize() {
		banner.width = this.width;
		banner.height = this.height;
	}

	draw(color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, banner.width, banner.height);
	}
}
