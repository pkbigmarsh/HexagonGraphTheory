var dijkstras_info = "<p style='margin: 3px;'>Please click to select a hex as the origin for the Shortest Path tree.</p>";

$("#dijkstras_button").on("click", function() {
	clear_edges();
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

	current_highlighted = current_highlighted.get_bottom();
	place_placed_hexes_into_graph(current_highlighted);
	graph.clean();
	dijkstras();
}

function dijkstras()
{
	edges = [];
	placed_edges = [];
	new_edges = graph.get_all_edges(graph.origin);
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
			var current_distance = graph.distance[to_index];
			var new_distance = graph.distance[from_index] + edges[i].distance
			if(new_distance < current_distance)
				current_distance = new_distance;
			if(graph.hex_visited[to_index])
			{
				edges.splice(i, 1);
				i --;
			}
			else if(new_distance <  min && !graph.hex_visited[to_index])
			{
				min_edge = edges[i];
				min = new_distance;
				min_pos = i;
			}
		}
		if(min_edge != null)
		{
			var to_index = min_edge.to.graph_index;
			var from_index = min_edge.from.graph_index;
			var new_distance = graph.distance[from_index] + min_edge.distance
			
			edges.splice(min_pos, 1);
			graph.hex_visited[to_index] = true;
			graph.parent[to_index] = from_index;
			graph[to_index] = new_distance;
			graph.distance[to_index] = new_distance;
			var new_edges = graph.get_edges(min_edge.to);
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