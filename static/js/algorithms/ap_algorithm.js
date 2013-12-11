$("#all_pairs_button").on("click", function() {
	disable_buttons();
	ap_start();
});

function ap_start()
{
	place_placed_hexes_into_graph();
	graph.clean();
	var ap = new ap_struct(graph.num_vertices);

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

	console.log("Before");
	print_ap(ap);

	var through_k;
	for(var k = 1; k < graph.num_vertices - 1; k ++)
	{
		for(var i = 1; i <= graph.num_vertices - 1; i ++)
		{
			for(var j = 1; j <= graph.num_vertices - 1; j ++)
			{
				// console.log(k, i, j);
				through_k = ap.weight[i][k] + ap.weight[k][j];
				if(through_k < ap.weight[i][j]) 
					ap.weight[i][j] = through_k;
			}
		}
	}

	console.log("After");
	print_ap(ap);
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

function ap_struct(nverticies)
{
	this.weight = [];
	this.nverts = nverticies;

	for(var i = 0; i < this.nverts; i ++)
	{
		this.weight.push([]);
		for(var j = 0; j < this.nverts; j ++)
			this.weight[i].push(LARGE_INT);
	}
}