var ap;
var next;

var selected_one = null;
var selected_two = null;
var current_highlighted = null;
var placed_edges = [];
var time = null;

$("#all_pairs_button").on("click", function() {
	disable_buttons();

	place_placed_hexes_into_graph();
	graph.clean();
	ap = new ap_struct(graph.num_vertices);
	next = new ap_struct(graph.num_vertices, null);

	for(var i = 0; i < graph.num_vertices; i ++)
		ap.weight[i][i] = 0;

	for(var i = 0; i < graph.num_vertices; i ++)
	{
		var cur_hex = graph.hexes[i];
		for(var j = 0; j < cur_hex.neighbors.length; j ++)
		{
			if(cur_hex.neighbors[j] != null)
			{
				var edge = new HexEdge();
				edge.from = cur_hex;
				edge.to = cur_hex.neighbors[j];
				edge.calculate_distance();
				ap.weight[i][edge.to.graph_index] = edge.distance;
			}
		}
	}

	var through_k;
	for(var k = 0; k < graph.num_vertices; k ++)
	{
		for(var i = 0; i < graph.num_vertices; i ++)
		{
			for(var j = 0; j < graph.num_vertices; j ++)
			{
				through_k = ap.weight[i][k] + ap.weight[k][j];
				if(through_k < ap.weight[i][j]) 
				{
					ap.weight[i][j] = through_k;
					next.weight[i][j] = k;
				}
			}
		}
	}

	main_stage.addEventListener("stagemousemove", ap_highlight);
	main_stage.addEventListener("stagemousedown", ap_start);
});

function ap_highlight(event)
{
	hover_hex = get_hex_under_point({x: event.stageX, y:event.stageY});
	
	if(hover_hex != null)
	{
		if(current_highlighted != null && hover_hex != current_highlighted && current_highlighted != selected_one)
			current_highlighted.unHighlight();
		current_highlighted = hover_hex;
		current_highlighted.highlight();
	}
	else
	{
		if(current_highlighted != null && current_highlighted != selected_one)
			current_highlighted.unHighlight();
		current_highlighted = null;
	}
}

function ap_start()
{
	if(current_highlighted != null && selected_one == null)
	{
		selected_one = current_highlighted;
	}
	else if(current_highlighted != null)
	{
		selected_two = current_highlighted;

		main_stage.removeEventListener("stagemousemove", ap_highlight);
		main_stage.removeEventListener("stagemousedown", ap_start);

		$("#info_panel").html("");
		var p = path(selected_one.graph_index, selected_two.graph_index);	
		if(p == "NO PATH")
			$("#info_panel").html("There is no path between the two points");
		draw_path(selected_one, selected_two, p);
	}
	else
	{
		$("#info_panel").html(prims_info + "Please click on a hex.</br>" + prims_button);
		return false;
	}
}

function draw_path(start, end, path)
{
	path_index = path.split(",");
	var index_current = start.graph_index;
	var index_next;
	var edge;

	for(var i = 1; i < path_index.length - 1; i ++)
	{
		index_next = path_index[i];
		edge = new HexEdge();
		edge.from = graph.hexes[index_current];
		edge.to = graph.hexes[index_next];
		edge.calculate_distance();
		edge.draw_directed("black");
		placed_edges.push(edge);
		main_stage.addChild(edge.shape);
		index_current = index_next;
	}

	index_next = end.graph_index;
	edge = new HexEdge();
	edge.from = graph.hexes[index_current];
	edge.to = graph.hexes[index_next];
	edge.calculate_distance();
	edge.draw_directed("black");
	placed_edges.push(edge);
	main_stage.addChild(edge.shape);
	index_current = index_next;
}

function path(i, j)
{
	if(ap.weight[i][j] >= LARGE_INT)
		return "NO PATH";
	var intermediate = next.weight[i][j];
	if(intermediate == null)
		return ",";
	else 
		return path(i, intermediate) + intermediate + path(intermediate, j);
}

function print_ap(ap)
{
	var str;
	for(var i = 0; i < ap.weight.length; i ++)
	{
		str = "";
		for(var j = 0; j < ap.weight.length; j ++)
		{
			if(ap.weight[i][j] < LARGE_INT)
				str += ap.weight[i][j];
			else
				str += "0";
			str += ",";
		}
		console.log(str);
	}
}

function ap_struct(nverticies, default_val)
{
	this.weight = [];
	this.nverts = nverticies;
	default_val = default_arg(default_val, LARGE_INT)

	for(var i = 0; i < this.nverts; i ++)
	{
		this.weight.push([]);
		for(var j = 0; j < this.nverts; j ++)
			this.weight[i].push(default_val);
	}
}