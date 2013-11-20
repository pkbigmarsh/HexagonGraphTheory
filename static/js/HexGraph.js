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
		
		for(var current_direction = NN; current_direction <= NE; current_direction ++)
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
		for(var current_direction = NN; current_direction <= NE; current_direction ++)
		{
			for(var j = 0; j < this.num_vertices; j ++)
			{
				var test_hex = this.hexes[j];
				if(hex.get_direction_to_hex(test_hex) == current_direction)
				{
					if(info[current_direction] == undefined)
						info[current_direction] = test_hex;
					else
					{
						var distance_to_current = hex.get_distance(info[current_direction]);
						var distance_to_new     = hex.get_distance(test_hex);
						if(distance_to_new < distance_to_current)
							info[current_direction] = test_hex;
					}
				}
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