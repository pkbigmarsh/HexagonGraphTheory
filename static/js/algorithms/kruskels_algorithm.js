var kruskels_info = '<p style="margin: 3px;">Now beginning Kruskel\'s Algorithm.</p>';
var sorted_edges = [];
var kruskel_edges = [];
var kruskel_timer = null;


$("#kruskels_button").on("click", function() {
	disable_buttons();
	$("#info_panel").html(kruskels_info);

	sorted_edges = [];
	kruskel_edges = [];
	kruskel_timer = null;

	place_placed_hexes_into_graph();
	graph.clean();
	sorted_edges = graph.get_all_edges();
	sorted_edges.sort(function(edge1, edge2) {
		if(edge1.distance < edge2.distance)
			return -1;
		else if(edge1.distance > edge2.distance)
			return 1;
		else 
			return 0;
	});
	next_kruskel_edge();
	kruskel_timer = setInterval(next_kruskel_edge, PLACING_SPEED);
});

function next_kruskel_edge()
{
	if(sorted_edges.length != 0)
	{
		var min_edge = null;
		var min_pos = 0;

		for(var i = 0; i < sorted_edges.length; i ++)
		{
			var edge = sorted_edges[i];
			if(is_viable_edge(edge))
			{
				if(min_edge == null)
				{
					min_edge = edge;
					min_pos = i;
				}
				else if(edge.distance < min_edge.distance)
				{
					min_edge = edge;
					min_pos = i;
				}
			}
			else
			{
				sorted_edges.splice(i, 1);
				i --;
			}
		}

		if(min_edge != null)
		{
			sorted_edges.splice(min_pos, 1);
			kruskel_edges.push(min_edge);

			var from_height = graph.get_parent_height(min_edge.from);
			var to_height = graph.get_parent_height(min_edge.to);

			if(to_height < from_height)
			{
				new_edge = new HexEdge();
				new_edge.from = min_edge.to;
				new_edge.to = min_edge.from;
				min_edge = new_edge;
			}

			var to_parent = graph.get_parent_hex(min_edge.to);
			var index = to_parent.graph_index;

			graph.parent[index] = graph.get_parent_index(min_edge.from);

			min_edge.draw_undirected("black");
			main_stage.addChild(min_edge.shape);

		}
	}
	else
	{
		clearInterval(kruskel_timer);
		enable_buttons();
	}
}

function is_viable_edge(edge)
{
	return graph.get_parent_index(edge.from) != graph.get_parent_index(edge.to);
}