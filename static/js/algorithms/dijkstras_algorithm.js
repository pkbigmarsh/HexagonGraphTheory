var selected_origin = null;
var current_highlighted = null;
var edges = null;
var new_edegs = null;
var timer = null;

var dijkstras_info = "<p style='margin: 3px;'>Please click to select a hex as the origin for the Shortest Path tree.</p>";
var placed_edges = [];

$("#dijkstras_button").on("click", function() {
	disable_buttons();
	$("#info_panel").html(dijkstras_info);
	
	main_stage.addEventListener("stagemousemove", dijkstra_highlight);
	main_stage.addEventListener("stagemousedown", dikstra_start);
});

function dijkstra_highlight(event)
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

function dikstra_start()
{
	if(current_highlighted == null)
	{
		$("#info_panel").html(dijkstras_info + "Please click on a hex.</br>" + dijkstras_button);
		return false;
	}

	main_stage.removeEventListener("stagemousemove", dijkstra_highlight);
	main_stage.removeEventListener("stagemousedown", dikstra_start);
	$("#info_panel").html("");

	place_placed_hexes_into_graph(current_highlighted);
	graph.clean();
	dijkstras();
}

function dijkstras()
{
	edges = [];
	placed_edges = [];
	new_edges = graph.get_edges(graph.origin);
	graph.clean();
	graph.hex_visited[graph.origin.graph_index] = true;
	graph.distance[graph.origin.graph_index] = 0;
	edges = edges.concat(new_edges);
	dijsktra_next_edge();
	timer = setInterval(dijsktra_next_edge, PLACING_SPEED);
}

function dijsktra_next_edge()
{
	if(!all_visited())
	{
		var min = 9999999;
		var min_edge = null;
		var min_pos = -1;
		for(var i = 0; i < edges.length; i ++)
		{
			var to_index = edges[i].to.graph_index;
			var from_index = edges[i].from.graph_index;
			if(graph.distance[to_index] > graph.distance[from_index] + edges[i].distance)
			{
				min_edge = edges[i];
				min = edges[i].distance;
				min_pos = i;
			}
		}
		if(min_edge != null)
		{
			// check to see if the an edge has already been placed
			if(graph.hex_visited[min_edge.to.graph_index])
			{
				// remove the old edge
				for(var i = 0; i < placed_edges.length; i ++)
				{
					if(placed_edges.to = min_edge.to)
					{
						main_stage.removeChild(placed_edges.shape);
						placed_edges.splice(i, 1);
						break;
					}
				}
			}

			edges.splice(min_pos, 1);
			graph.hex_visited[min_edge.to.graph_index] = true;
			graph.parent[min_edge.to.graph_index] = min_edge.from.graph_index;
			graph.distance[min_edge.to.graph_index] = graph.distance[min_edge.from.graph_index] + min_edge.distance;
			new_edges = graph.get_edges(min_edge.to);
			edges = edges.concat(new_edges);
			placed_edges.push(min_edge);
			min_edge.draw_directed("black");
			main_stage.addChild(min_edge.shape);
		}
	}
	else
	{
		clearInterval(timer);
		enable_buttons();
	}
}

function all_visited()
{
	for(var i = 0; i < graph.hex_visited.length; i ++)
	{
		if(!graph.hex_visited[i])
			return false;
	}
	return true;
}