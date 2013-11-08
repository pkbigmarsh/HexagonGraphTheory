var main_stage;
var hex_select_stage;
var hex_info_stage;

var grid;
var hex_button_simple;
var hex_button_medium;
var hex_button_hard;
var placement_hex;

$(document).ready(function() {
		main_stage 			= new createjs.Stage("grid_canvas");
		hex_select_stage 	= new createjs.Stage("hex_canvas");
		hex_info_stage 		= new createjs.Stage("hex_info_canvas");

		createjs.Ticker.setFPS(40);
		createjs.Ticker.addEventListener('tick', function(){
			main_stage.update();
			hex_select_stage.update();
			hex_info_stage.update();
		});

		grid = new HexGrid();
		hex_button_simple 	= new HexVertex({color: "green"});
		hex_button_medium 	= new HexVertex({color: createjs.Graphics.getRGB(138, 86, 57)});
		hex_button_hard		= new HexVertex({color: createjs.Graphics.getRGB(155, 00, 00)});


		hex_button_simple.set_x(HEX_RADIUS * 2);
		hex_button_simple.set_y(50);
		hex_button_simple.addEventListener("click", function() {
			add_new_hex(hex_button_simple.clone());
		});
		hex_select_stage.addChild(hex_button_simple.shape);

		hex_button_medium.set_x(HEX_RADIUS * 5);
		hex_button_medium.set_y(50);
		hex_button_medium.addEventListener("click", function() {
			add_new_hex(hex_button_medium.clone());
		});
		hex_select_stage.addChild(hex_button_medium.shape);

		hex_button_hard.set_x(HEX_RADIUS * 8);
		hex_button_hard.set_y(50);
		hex_button_hard.addEventListener("click", function() {
			add_new_hex(hex_button_hard.clone());
		});
		hex_select_stage.addChild(hex_button_hard.shape);

		placement_hex = null;
});

function add_new_hex(new_hex)
{
	if(placement_hex == null)
	{
		placement_hex = new_hex;
		placement_hex.set_pos({x: 0, y: 0});
		main_stage.addChild(new_hex.shape);
		main_stage.addEventListener("stagemousemove", move_hex);
		main_stage.addEventListener("stagemousedown", place_hex);
	}
}

function move_hex(event) 
{
	var x = event.stageX;
	var y = event.stageY;

	var row 	= truncate(y / HEX_APOTHEM);
	var colum 	= truncate(x / HEX_APOTHEM);

	x = colum * HEX_APOTHEM;
	y = row * HEX_APOTHEM;

	if(colum % 2 == 1)
		y += HEX_APOTHEM / 2;

	placement_hex.set_pos({x: x, y: y});
}

function place_hex(event)
{
	main_stage.removeEventListener("stagemousemove", move_hex);
	main_stage.removeEventListener("stagemousedown", place_hex);

	placement_hex = null;
}