$(document).ready(function() {
	var canvas = document.getElementById("grid_canvas");
	var parent = canvas.parentElement;
	var ctx = canvas.getContext("2d");
	

	grid = new HexGrid({
		context: ctx
	});

	grid.draw_hex(50,50);
	grid.draw_hex(50,50 - HEX_BASE);
	grid.draw_hex(50,50 + HEX_RADIUS * 2 * Math.sin(Math.PI / 3));

	//grid.draw_hex(50,50 + (Math.sin(Math.PI / 3) * 2 * HEX_RADIUS));
});