var main_stage;
var hex_select_stage;

var graph;
var hex_button_simple;
var hex_button_medium;
var hex_button_hard;

var current_hex;
var current_bottom_hex;
var placed_hexes = [];

// Algorithm Variables
var current_highlighted = null;
var edges = null;
var new_edges = null;
var timer = null;
var placed_edges = [];
var sorted_edges = [];
var edges = null;
var timer = null;
var selected_start = null;
var selected_end = null;

$(document).ready(function() {
		main_stage 			= new createjs.Stage("grid_canvas");
		hex_select_stage 	= new createjs.Stage("hex_canvas");

		createjs.Ticker.setFPS(40);
		createjs.Ticker.addEventListener('tick', function(){
			main_stage.update();
			hex_select_stage.update();
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

		var hex_label_simple = new createjs.Text("Simple", "bold 18px Arial", HEX_GREEN);
		hex_label_simple.x = HEX_RADIUS;
		hex_label_simple.y = 50 + HEX_RADIUS + HEX_BASE;

		hex_select_stage.addChild(hex_label_simple);
		hex_select_stage.addChild(hex_button_simple.shape);

		hex_button_medium.set_x(HEX_RADIUS * 5);
		hex_button_medium.set_y(50);
		hex_button_medium.addEventListener("click", function() {
			add_new_hex(new HexVertex({color: HEX_BROWN, terrain: TERRAIN_MEDIUM}));
		});

		var hex_label_medium = new createjs.Text("Difficult", "bold 18px Arial", HEX_BROWN);
		hex_label_medium.x = HEX_RADIUS * 4;
		hex_label_medium.y = 50 + HEX_RADIUS + HEX_BASE;

		hex_select_stage.addChild(hex_label_medium);
		hex_select_stage.addChild(hex_button_medium.shape);

		hex_button_hard.set_x(HEX_RADIUS * 8);
		hex_button_hard.set_y(50);
		hex_button_hard.addEventListener("click", function() {
			add_new_hex(new HexVertex({color: HEX_RED, terrain: TERRAIN_HARD}));
		});

		var hex_label_hard = new createjs.Text("Ardous", "bold 18px Arial", HEX_RED);
		hex_label_hard.x = HEX_RADIUS * 7;
		hex_label_hard.y = 50 + HEX_RADIUS + HEX_BASE;

		hex_select_stage.addChild(hex_label_hard);
		hex_select_stage.addChild(hex_button_hard.shape);

		current_hex = null;
		current_bottom_hex = null;
});

function add_new_hex(new_hex)
{
	if(current_hex == null)
	{
		current_hex = new_hex;
		var data = {
			stageX: MAIN_STAGE_WIDTH / 2,
			stageY: MAIN_STAGE_HEIGHT / 2
		};
		main_stage.addChild(new_hex.shape);
		main_stage.addEventListener("stagemousemove", move_hex);
		main_stage.addEventListener("stagemousedown", place_hex);
		move_hex(data);
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

	if(current_bottom_hex == null)
	{
		for(var i = 0; i < placed_hexes.length; i ++)
		{
			if(current_hex.get_distance(placed_hexes[i].get_bottom()) == 0)
			{
				current_bottom_hex = null;
				current_hex = null;
				return;
			}
		}
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
	origin = default_arg(origin, placed_hexes[0]);
	graph.add_hex(origin);
	for(var i = 0; i < placed_hexes.length; i ++)
	{
		if(placed_hexes[i] != origin)
		{
			graph.add_hex(placed_hexes[i]);
		}
	}
}

$("#clear_hexes_button").on("click", clear_hexes);
$("#clear_edges_button").on("click", clear_edges);