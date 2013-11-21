var selected_origin = null;
var current_highlighted = null;

var prims_info = "<p style='margin: 3px;'>Please click to select a hex as the origin for the minimum spanning tree. After that hit start.</p></br>";
var prims_button = '<a style="margin: 3px;" class="button" id="prim_start">Start</a>';
var placed_edges = [];

$("#prims_button").on("click", function() {
	$("#info_panel").html(prims_info + prims_button);

	$("#prim_start").on("click", start);
	
	main_stage.addEventListener("stagemousemove", highlight);
	main_stage.addEventListener("stagemousedown", start);
});

function highlight(event)
{
	hover_hex = get_hex_under_point({x: event.stageX, y:event.stageY});
	if(hover_hex != null)
	{
		if(current_highlighted != null && hover_hex != current_highlighted)
			current_highlighted.unHighlight();
		current_highlighted = hover_hex;
		current_highlighted.highlight();
	}
	else
	{
		if(current_highlighted != null)
			current_highlighted.unHighlight();
		current_highlighted = null;
	}
}

function start()
{
	if(current_highlighted == null)
	{
		$("#info_panel").html(prims_info + "Please click on a hex.</br>" + prims_button);
		return false;
	}

	main_stage.removeEventListener("stagemousemove", highlight);
	main_stage.removeEventListener("stagemousedown", start);
	$("#info_panel").html("");

	place_placed_hexes_into_graph(current_highlighted);
	graph.clean();
	prims();
	//console.log(graph.toString());
}

function prims()
{
	var edges = [];
	placed_edges = [];
	var new_edges = graph.get_edges(graph.origin);
	console.log(graph.origin.toString());
	graph.clean();
	graph.hex_visited[graph.origin.graph_index] = true;
	edges = edges.concat(new_edges);
	var edge_count = 1;
	while(edges.length != 0)
	{
		var min = 9999999;
		var min_edge = null;
		var min_pos = -1;
		for(var i = 0; i < edges.length; i ++)
		{
			var to_index = edges[i].to.graph_index;
			if(edges[i].distance < min && !graph.hex_visited[to_index])
			{
				min_edge = edges[i];
				min = edges[i].distance;
				min_pos = i;
			}
		}

		edges.splice(min_pos, 1);
		graph.hex_visited[min_edge.to.graph_index] = true;
		new_edges = graph.get_edges(min_edge.to);
		edges = edges.concat(new_edges);
		placed_edges.push(min_edge);
		min_edge.draw("black", edge_count);
		edge_count ++;
		main_stage.addChild(min_edge.shape);
		main_stage.addChild(min_edge.text);
	}
}