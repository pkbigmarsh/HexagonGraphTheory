function HexGrid(parameters) {
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

	this.add_hex_with_connection = function(new_hex, connecting_hex, direction_c_to_n) {
		if(this.origin == null && typeof connecting_hex == 'undefined')
		{
			this.origin = new_hex;
			this.hexes.push(new_hex);
			this.num_vertices ++;
			this.position = new_hex.get_pos();
			return true;
		}
		else if(typeof connecting_hex == 'undefined')
			return false;

		this.hexes.push(new_hex);
		this.num_vertices ++;
		connecting_hex.neighbors[direction_c_to_n] = new_hex;
		new_hex.neighbors[(direction_c_to_n + 3) % 6] = connecting_hex;
		return true;
	};

	this.add_hex = function(new_hex) {
		if(this.origin == null)
		{
			this.origin = new_hex;
			this.hexes.push(new_hex);
			this.num_vertices ++;
			this.position = new_hex.get_pos();
			return true;
		}

		var connection_info = this.get_closest_hex_and_direction(new_hex);
		this.hexes.push(new_hex);
		this.num_vertices ++;
		if(typeof connection_info.close_hex != 'undefined')
		{
			connection_info.close_hex[connection_info.direction] = new_hex;
			new_hex[opposite_direction(connection_info.direction)] = connection_info.close_hex;
		}
		else
		{
			connection_info.left.neighbors[connection_info.direction] = new_hex;
			new_hex.neighbors[opposite_direction(connection_info).direction];
		}
		return true;
	};

	this.get_closest_hex_and_direction = function(new_hex) {
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
				return {
					direction: direction,
					close_hex: current_hex
				};
			}

			current_hex = current_hex.neighbors[direction];
			dir_check = current_hex.get_direction_to_point(position);
			if(direction == opposite_direction(dir_check))
			{
				return {
					left_hex: current_hex,
					direction: direction,
					right_hex: current_hex.neighbors[direction]
				};
			}

			current_pos = current_hex.get_pos();
		}
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