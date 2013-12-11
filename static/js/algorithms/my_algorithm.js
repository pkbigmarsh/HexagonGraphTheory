var my_info = "<p style='margin: 3px;'>Please click to select two hexes to find the shortest path between them.</p";
var distance_to_target = null;
var direction_to_target = null;


$("#my_button").on("click", function() {
	clear_edges();
	disable_buttons();
	$("#info_panel").html(my_info);

	main_stage.addEventListener("stagemousemove", ap_highlight);
	main_stage.addEventListener("stagemousedown", my_start);
});

function my_start()
{
	if(current_highlighted == null)
	{
		$("#info_panel").html(my_info + "Please click on a hex.</br>" + dijkstras_button);
		return false;
	}
	else if(current_highlighted != null && selected_start == null)
	{
		selected_start = current_highlighted.get_bottom();
		return true;
	}

	main_stage.removeEventListener("stagemousemove", ap_highlight);
	main_stage.removeEventListener("stagemousedown", my_start);
	
	$("#info_panel").html("");
	selected_end = current_highlighted.get_bottom();

	place_placed_hexes_into_graph(selected_start);
	graph.clean();

	edges = [];
	placed_edges = [];
	graph.hex_visited[selected_start.graph_index] = true;
	graph.distance[selected_start.graph_index] = 0;
	edges = get_new_edges(selected_start, selected_end);
	my_next_edge();
	timer = setInterval(my_next_edge, PLACING_SPEED);
}

function get_new_edges(cur_hex, end_hex)
{
	var angle = angle_between_two_points(cur_hex.get_pos(), end_hex.get_pos());
	var dir_start = get_hextant(angle);
	dir_start = get_previous(dir_start);
	var new_edges = [];
	for(var i = dir_start; i < dir_start + 3; i ++)
	{
		var dir = i % 6;
		if(cur_hex.neighbors[i] != null)
		{
			var edge = new HexEdge();
			edge.from = cur_hex;
			edge.to = cur_hex.neighbors[i];
			edge.calculate_distance();
			new_edges.push(edge);
		}
	}

	return new_edges;
}

function my_next_edge()
{
	if(!visited_target())
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
			var new_edges = get_new_edges(min_edge.to, selected_end);
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

function visited_target()
{
	var index = selected_end.graph_index;
	return graph.hex_visited[index];
}