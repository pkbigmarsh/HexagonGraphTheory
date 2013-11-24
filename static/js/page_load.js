var main_stage;
var hex_select_stage;
var hex_info_stage;

var graph;
var hex_button_simple;
var hex_button_medium;
var hex_button_hard;

var current_hex;
var current_bottom_hex;
var placed_hexes = [];

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

		graph = new HexGraph();
		hex_button_simple 	= new HexVertex({color: HEX_GREEN});
		hex_button_medium 	= new HexVertex({color: HEX_BROWN});
		hex_button_hard		= new HexVertex({color: HEX_RED});


		hex_button_simple.set_x(HEX_RADIUS * 2);
		hex_button_simple.set_y(50);
		hex_button_simple.addEventListener("click", function() {
			add_new_hex(new HexVertex({color: HEX_GREEN, terrain: TERRAIN_EASY}));
		});
		hex_select_stage.addChild(hex_button_simple.shape);

		hex_button_medium.set_x(HEX_RADIUS * 5);
		hex_button_medium.set_y(50);
		hex_button_medium.addEventListener("click", function() {
			add_new_hex(new HexVertex({color: HEX_BROWN, terrain: TERRAIN_MEDIUM}));
		});
		hex_select_stage.addChild(hex_button_medium.shape);

		hex_button_hard.set_x(HEX_RADIUS * 8);
		hex_button_hard.set_y(50);
		hex_button_hard.addEventListener("click", function() {
			add_new_hex(new HexVertex({color: HEX_RED, terrain: TERRAIN_HARD}));
		});
		hex_select_stage.addChild(hex_button_hard.shape);

		current_hex = null;
		current_bottom_hex = null;
});

function add_new_hex(new_hex)
{
	if(current_hex == null)
	{
		current_hex = new_hex;
		current_hex.set_pos({x: 0, y: 0});
		main_stage.addChild(new_hex.shape);
		main_stage.addEventListener("stagemousemove", move_hex);
		main_stage.addEventListener("stagemousedown", place_hex);
	}
}

function move_hex(event) 
{
	var x = event.stageX;
	var y = event.stageY;

	var x_dis = HEX_RADIUS * 1.5;
	var y_dis = HEX_APOTHEM * 2;

	var colum = truncate(x / x_dis);
	var row = truncate(y / y_dis);

	x = colum * x_dis;
	y = row * y_dis;
	if(colum % 2 == 1)
		y += HEX_APOTHEM;
	current_hex.set_pos({x: x, y: y});

	// adjust height for overlap
	current_bottom_hex = null;
	for(var i = 0; i < placed_hexes.length && current_bottom_hex == null; i ++)
	{
		var test_point = main_stage.localToLocal(event.stageX, event.stageY, placed_hexes[i].shape)
		var test_hex = placed_hexes[i].get_top();
		if(test_hex.shape.hitTest(test_point.x, test_point.y))
		{
			current_bottom_hex = placed_hexes[i].get_bottom();
			var top = current_bottom_hex.get_top();
			var height = top.height + 1;
			y = current_bottom_hex.get_y() - HEX_BASE * height;
			x = current_bottom_hex.get_x();
			current_hex.set_pos({x: x, y: y});
			current_hex.height = height;
		}
	}

	placed_hexes.push(current_hex);
	placed_hexes.sort(function(hex1, hex2) {
		if(hex1.height < hex2.height)
			return -1;
		if(hex1.get_y() < hex2.get_y())
			return -1;
		if(hex1.get_y() > hex2.get_y())
			return 1;
		return 0;
	});
	main_stage.removeAllChildren;
	for(var i = 0; i < placed_hexes.length; i ++)
	{
		current = placed_hexes[i];
		while(current != null)
		{
			main_stage.addChild(current.shape);
			current = current.above;
		}
	}
	placed_hexes.splice(placed_hexes.indexOf(current_hex), 1);
	current_hex.height = 0;
}

function place_hex(event)
{
	main_stage.removeEventListener("stagemousemove", move_hex);
	main_stage.removeEventListener("stagemousedown", place_hex);
	// Come back to this.
	//graph.add_hex(current_hex);

	if(current_bottom_hex == null)
	{
		placed_hexes.push(current_hex);
	}
	else
	{
		current_bottom_hex.place_above(current_hex);
	}

	current_bottom_hex = null;
	current_hex = null;
}

function place_placed_hexes_into_graph(origin)
{
	graph = new HexGraph();
	graph.add_hex(origin);
	for(var i = 0; i < placed_hexes.length; i ++)
	{
		if(placed_hexes[i] != origin)
		{
			graph.add_hex(placed_hexes[i]);
		}
	}
}