var dijkstras_info = "<p style='margin: 3px;'>Please click a starting hex and then an ending hex</p>";

var dijksras_timer = null;
var current_path = null;
var options = null;
var color = null;
var edges = [];

var current_highlighted = null;
var start_hex = null;
var end_hex = null; 

$("#dijksras_button").on("click", function() {
	disable_buttons();
	$("#info_panel").html(dijkstras_info);

	color = "yellow";

	current_path = [];
	options = [];
	edges = [];


	main_stage.addEventListener("stagemousemove", dijkstra_highlight);
	main_stage.addEventListener("stagemousedown", dijkstra_click);
});

function dijkstra_highlight(event)
{
	hover_hex = get_hex_under_point({x: event.stageX, y:event.stageY});
	if(hover_hex != null && hover_hex != start_hex)
	{
		if(current_highlighted != null && hover_hex != current_highlighted)
			current_highlighted.unHighlight();
		current_highlighted = hover_hex;
		current_highlighted.highlight(color);
	}
	else
	{
		if(current_highlighted != null)
			current_highlighted.unHighlight();
		current_highlighted = null;
	}
}

function dijsktra_click(event)
{
	if(current_highlighted == null)
	{
		$("#info_panel").html("Please click a hex");
		return false;
	}
	else if(start_hex == null)
	{
		start_hex = current_highlighted;
		current_highlighted = null;
		color = "blue";
	}
	else if(end_hex == null)
	{
		end_hex = current_highlighted;
		current_highlighted = null;
		main_stage.removeEventListener("stagemousemove", dijkstra_highlight);
		main_stage.removeEventListener("stagemousedown", dijkstra_click);
		dijkstra_start();
	}
}

function dijkstra_start()
{
	place_placed_hexes_into_graph();
	graph.clean();

	dijkstra_next()
	dijksras_timer = setInterval(dijkstra_next, PLACING_SPEED);
}

function dijkstra_next()
{

}

function dijsktra_path() {
	this.distance = 0;
	this.path = [];

	this.add_hex = function(hex) {
		this.path.push(hex);
		this.distance = 0;
		for(var i = 1; i < this.path.length; i ++)
		{
			var edge = new HexEdge({
				from: this.path[i - 1],
				to: this.path[i]
			});
			edge.calculate_distance();
			this.distance +=
		}
	};
}