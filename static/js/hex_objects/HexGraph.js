function HexGraph(parameters) {
	parameters 			= default_arg(parameters, {});
	this.origin			= default_arg(parameters.origin, null);
	this.position 		= {
		x: default_arg(parameters.x, 0),
		y: default_arg(parameters.y, 0)
	};
	this.num_vertices 	= default_arg(parameters.num_vertices, 0);
	this.num_edges 		= default_arg(parameters.num_edges, 0);
	this.hex_visited	= default_arg(parameters.hex_visited, []);
	this.hexes 			= default_arg(parameters.hexes, []);
	this.parent 		= default_arg(parameters.parent, []);
	this.distance 		= default_arg(parameters.distance, []);

	this.clean = function() {
		this.hex_visited = [];
		this.parent = [];
		this.distance = [];
		for(var i = 0; i < this.num_vertices; i ++)
		{
			this.hexes[i].graph_index = i;
			this.parent.push(i);
			this.hex_visited.push(false);
			this.distance.push(Number.MAX_VALUE);
		}
	};

	this.get_parent_index = function(hex) {
		var index = hex.graph_index;
		while(index != this.parent[index])
			index = this.parent[index];

		return index;
	};

	this.get_parent_height = function(hex) {
		var index = hex.graph_index;
		var height = 0;
		while(index != this.parent[index])
		{
			index = this.parent[index];
			height ++;
		}

		return height;
	};

	this.get_parent_hex = function(hex) {
		var index = hex.graph_index;
		while(index != this.parent[index])
			index = this.parent[index];

		return graph.hexes[index];
	}

	this.get_edges = function(hex) {
		var edges = [];
		for(var i = NN; i <= NW; i ++)
		{
			if(hex.neighbors[i] != null)
			{
				var index = hex.neighbors[i].graph_index;
				if(!this.hex_visited[index])
				{
					var edge = new HexEdge();
					edge.from = hex;
					edge.to = hex.neighbors[i];
					edge.calculate_distance();
					edges.push(edge);
				}
			}
		}
		return edges;
	};

	this.get_all_edges = function(hex) {
		var edges = [];
		for(var i = NN; i <= NW; i ++)
		{
			if(hex.neighbors[i] != null)
			{
				var index = hex.neighbors[i].graph_index;
				var edge = new HexEdge();
				edge.from = hex;
				edge.to = hex.neighbors[i];
				edge.calculate_distance();
				edges.push(edge);
			}
		}
		return edges;
	};

	this.get_all_edges = function() {
		var edges = [];
		for(var i = 0; i < this.num_vertices; i ++)
		{
			var current = this.hexes[i];
			for(var dir = NN; dir <= NW; dir ++)
			{
				var next = current.neighbors[dir];
				if(typeof next != 'undefined' && next != null)
				{
					var edge = new HexEdge();
					edge.from = current;
					edge.to = next;
					edge.calculate_distance();
					edges.push(edge);
				}
			}
		}

		return edges;
	}

	this.add_hex = function(new_hex) {
		if(this.origin == null)
		{
			this.origin = new_hex;
			this.hexes.push(new_hex);
			this.num_vertices ++;
			this.position = new_hex.get_pos();
			return true;
		}

		var connecting_hexes = this.get_connections(new_hex);
		this.hexes.push(new_hex);
		this.num_vertices ++;
		
		for(var current_direction = NN; current_direction <= NW; current_direction ++)
		{
			if(connecting_hexes[current_direction] != undefined)
			{
				new_hex.add_connection(current_direction, connecting_hexes[current_direction]);
			}
		}

		return true;
	};

	this.get_connections = function(hex) {
		if(this.num_vertices == 0)
		{
			throw_error("get_connections", "Graph does not have any hexes in graph");
			return null;
		}	

		info = [];
		for(var j = 0; j < this.num_vertices; j ++)
		{
			var test_hex = this.hexes[j];
			var direction = hex.get_direction_to_hex(test_hex);
			if(info[direction] == undefined)
				info[direction] = test_hex;
			else if(direction != -1)
			{
				var distance_to_current = hex.get_distance(info[direction]);
				var distance_to_new     = hex.get_distance(test_hex);
				if(distance_to_new < distance_to_current)
					info[direction] = test_hex;
			}
		}

		return info;
	};

	this.find_hex_by_position = function(position) {
		if(this.origin == null || this.num_vertices == 0 || typeof position == 'undefined')
		{
			throw_error("find_hex_by_position", "Graph does not have an origin or position was not given", position);
			return null;
		}	

		position.x = default_arg(position.x, 0);
		position.y = default_arg(position.y, 0);

		var current_hex = this.origin;
		var current_pos = current_hex.get_pos();
		var direction;
		var dir_check;
		while(current_hex != null && !(current_pos.x == position.x && current_pos.y == position.y))
		{
			direction = current_hex.get_direction_to_point(position);
			
			if(current_hex.neighbors[direction] == null)
			{
				throw_error("find_hex_by_position", "Target point is not on a hex in the graph. Edge reached", {position: position, edge: current_hex});
				return null;
			}

			current_hex = current_hex.neighbors[direction];
			dir_check = current_hex.get_direction_to_point(position);
			if(direction == opposite_direction(dir_check))
			{
				throw_error("find_hex_by_position", "Target point is not on a hex in the graph", position);
				return null;
			}

			current_pos = current_hex.get_pos();
		}

		return current_hex;
	};
}

HexGraph.prototype.toString = function()
{
	return this.origin.toString();
}