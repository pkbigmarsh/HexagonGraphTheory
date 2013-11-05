var main_stage;
var hex_select_stage;
var hex_info_stage;

var grid;
var hex_button_simple;
var hex_button_medium;
var hex_button_hard;

$(document).ready(function() {
		main_stage 			= new createjs.Stage("grid_canvas");
		hex_select_stage 	= new createjs.Stage("hex_canvas");
		hex_info_stage 		= new createjs.Stage("hex_info_canvas");

		grid = new HexGrid();
		hex_button_simple 	= grid.create_hex("green");
		hex_button_medium 	= grid.create_hex(createjs.Graphics.getRGB(138, 86, 57));
		hex_button_hard		= grid.create_hex(createjs.Graphics.getRGB(155, 00, 00));


		hex_button_simple.x = HEX_RADIUS * 2;
		hex_button_simple.y = 50;
		hex_button_simple.addEventListener("click", click_simple_hex);
		hex_select_stage.addChild(hex_button_simple);

		hex_button_medium.x = HEX_RADIUS * 5;
		hex_button_medium.y = 50;
		hex_button_medium.addEventListener("click", click_medium_hex);
		hex_select_stage.addChild(hex_button_medium);

		hex_button_hard.x = HEX_RADIUS * 8;
		hex_button_hard.y = 50;
		hex_button_hard.addEventListener("click", click_hard_hex);
		hex_select_stage.addChild(hex_button_hard);

		// main_stage.addChild(hex);
		main_stage.update();
		hex_select_stage.update();

});

function click_simple_hex(event)
{
	console.log("simple");
}

function click_medium_hex(event)
{
	console.log("medium");
}

function click_hard_hex(event)
{
	console.log("hard");
}