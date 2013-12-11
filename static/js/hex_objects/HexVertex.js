function HexVertex(parameters){
	parameters 			= default_arg(parameters, {});
	this.shape 			= default_arg(parameters.shape, new createjs.Shape());
	this.graphics 		= this.shape.graphics;
	this.above 			= default_arg(parameters.above, null);
	this.height 		= default_arg(parameters.height, 0);
	this.neighbors 		= default_arg(parameters.neighbors, [null, null, null, null, null, null]);
	this.below 			= default_arg(parameters.below, null);
	this.terrain 		= default_arg(parameters.terrain, TERRAIN_EASY);
	this.color 			= default_arg(parameters.color, HEX_GREEN);
	this.graph_index 	= -1;

	this.set_x = function(new_x) {
		this.shape.x = new_x;
	};

	this.get_x = function() {
		return this.shape.x;
	};

	this.set_y = function(new_y) {
		this.shape.y = new_y;
	};

	this.get_y = function() {
		return this.shape.y;
	};

	this.set_pos = function(pos){
		this.shape.x = pos.x;
		this.shape.y = pos.y;
	};

	this.get_pos = function() {
		return {x: this.shape.x, y: this.shape.y};
	};

	this.get_distance = function(other_hex) {
		var o_pos = other_hex.get_pos();
		var t_pos = this.get_pos();

		return Math.sqrt(Math.pow(o_pos.x - t_pos.x, 2) + Math.pow(o_pos.y - t_pos.y, 2));
	};

	this.get_top = function() {
		var current_hex = this;
		while(current_hex.above != null)
			current_hex = current_hex.above;
		return current_hex;
	};

	this.get_bottom = function() {
		var current_hex = this;
		while(current_hex.below != null)
			current_hex = current_hex.below;
		return current_hex;
	}

	this.highlight = function(color)
	{
		var hex = this.get_top();
		color = default_arg(color, "yellow");
		// --- Draw Hexagon Face --- //
		hex.graphics.beginStroke(color);
		hex.graphics.setStrokeStyle(3);
		var angle = 0;

		hex.graphics.moveTo(Math.cos(angle) * HEX_RADIUS, Math.sin(angle) * HEX_RADIUS);
		for(var i = 0; i < 6; i ++)
		{
			angle += Math.PI / 3;
			hex.graphics.lineTo(Math.cos(angle) * HEX_RADIUS, Math.sin(angle) * HEX_RADIUS);
		}
		hex.graphics.endStroke();
	}

	this.unHighlight = function()
	{
		this.get_top().create_hex(this.color);
	}

	this.create_hex = function(color)
	{
		this.graphics.clear();


		color = default_arg(color, "green");

		// --- Draw Hexagon Face --- //
		this.graphics.beginStroke("black");
		this.graphics.setStrokeStyle(1);
		this.graphics.beginFill(color);
		var angle = 0;

		this.graphics.moveTo(Math.cos(angle) * HEX_RADIUS, Math.sin(angle) * HEX_RADIUS);
		for(var i = 0; i < 6; i ++)
		{
			angle += Math.PI / 3;
			this.graphics.lineTo(Math.cos(angle) * HEX_RADIUS, Math.sin(angle) * HEX_RADIUS);
		}
		this.graphics.endStroke();
		this.graphics.endFill();

		// --- Draw South West Face --- //
		points = [];
		this.graphics.beginStroke("black");
		this.graphics.setStrokeStyle(1);
		this.graphics.beginFill("brown");

		points[0] = { x: (HEX_RADIUS * Math.cos(Math.PI)),			y: 0 }; 
		points[1] = { x: (HEX_RADIUS * Math.cos(2 * Math.PI / 3)),	y: HEX_RADIUS * Math.sin(2 * Math.PI / 3)};
		points[2] = { x: points[1].x,									y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,									y: points[0].y + HEX_BASE };

		this.graphics.moveTo(points[0].x, points[0].y);
		for(var i = 3; i >= 0; i --)
			this.graphics.lineTo(points[i].x, points[i].y);
		this.graphics.endStroke();
		this.graphics.endFill();

		// --- Draw South Face --- //
		points = [];
		this.graphics.beginStroke("black");
		this.graphics.setStrokeStyle(1);
		this.graphics.beginFill("brown");

		points[0] = { x: (HEX_RADIUS * Math.cos(Math.PI / 3)),			y: HEX_RADIUS * Math.sin(Math.PI / 3) }; 
		points[1] = { x: (HEX_RADIUS * Math.cos(2 * Math.PI / 3)),		y: HEX_RADIUS * Math.sin(2 * Math.PI / 3)};
		points[2] = { x: points[1].x,										y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,										y: points[0].y + HEX_BASE };

		this.graphics.moveTo(points[0].x, points[0].y);
		for(var i = 3; i >= 0; i --)
			this.graphics.lineTo(points[i].x, points[i].y);
		this.graphics.endStroke();
		this.graphics.endFill();

		// --- Draw South East Face --- //
		points = [];
		this.graphics.beginStroke("black");
		this.graphics.setStrokeStyle(1);
		this.graphics.beginFill("brown");

		points[0] = { x: (HEX_RADIUS),								y: 0 }; 
		points[1] = { x: (HEX_RADIUS * Math.cos(Math.PI / 3)),		y: HEX_RADIUS * Math.sin(Math.PI / 3)};
		points[2] = { x: points[1].x,									y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,									y: points[0].y + HEX_BASE };

		this.graphics.moveTo(points[0].x, points[0].y);
		for(var i = 3; i >= 0; i --)
			this.graphics.lineTo(points[i].x, points[i].y);
		this.graphics.endStroke();
		this.graphics.endFill();
	};

	this.addEventListener = function(event_str, event_function) {
		this.shape.addEventListener(event_str, event_function);
	};

	this.clone = function() {
		return new HexVertex({
			shape: this.shape.clone(true),
			above: this.above,
			height: this.height
		});
	};

	this.get_direction_to_point = function(end_pos) {
		if(typeof end_pos.x == 'undefined' || typeof end_pos.y == 'undefined')
		{
			throw_error("get_direction_to_point", "Given point is missing x/y component", end_pos);
			return null;
		}	

		var range = Math.PI / 24;
		var angle = angle_between_two_points(this.get_pos(), end_pos);

		if(ANGLE_NN - range <= angle && ANGLE_NN + range >= angle)
		return NN;

		if(ANGLE_NW - range <= angle && ANGLE_NW + range >= angle)
			return NW;

		if(ANGLE_SW - range <= angle && ANGLE_SW + range >= angle)
			return SW;

		if(ANGLE_SS - range <= angle && ANGLE_SS + range >= angle)
			return SS;

		if(ANGLE_SE - range <= angle && ANGLE_SE + range >= angle)
			return SE;

		if(ANGLE_NE - range <= angle && ANGLE_NE + range >= angle)
			return NE;

		return -1;
	};

	this.get_direction_to_hex = function(other_hex) {
		if(other_hex == null)
		{
			throw_error("get_direction_to_hex", "Given Hex is empty", other_hex);
			return null;
		}
		other_hex = other_hex.get_bottom();

		return this.get_direction_to_point(other_hex.get_pos());
	};

	this.place_above = function(new_hex) {
		new_hex.height += 1;
		if(this.above == null)
		{
			this.above = new_hex;
			new_hex.below = this;
		}
		else
			this.above.place_above(new_hex);
	};

	this.add_connection = function(direction, new_hex) {
		this.neighbors[direction] = new_hex;
		new_hex.neighbors[opposite_direction(direction)] = this;
	}

	this.hitTest = function(point) {
		if( typeof point.x == "undefined" ||  typeof point.y == "undefined")
			return false;

		return this.shape.hitTest(point.x, point.y);
	}

	this.create_hex(parameters.color);
};

HexVertex.prototype.toString = function()
{
    return {
    	height: this.height,
    	terrain: this.terrain,
    	neighbors: this.neighbors
    };
}