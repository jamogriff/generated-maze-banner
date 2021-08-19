import Constants from "./constants.js";

// Very straightforward class
export default class Banner {
	constructor(context, width, height) {
		this.ctx = context;
		this.width = width;
		this.height = height;
		this.color = this.primaryGradient();
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

	// Gradient used for primary background
	primaryGradient() {
		let gradient = this.ctx.createLinearGradient(
			0,
			0,
			this.width,
			this.height
		);
		gradient.addColorStop(0, Constants.GRADIENT_3); // midnight blue
		gradient.addColorStop(0.5, Constants.GRADIENT_2); // cotton candy
		gradient.addColorStop(1, Constants.GRADIENT_1); // cinnabar
		return gradient;
	}
}
