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

	this.add_hex = function(new_hex, connecting_hex, direction) {

	};

	this.create_hex = function(color)
	{
		color = default_arg(color, "green");

		var new_hex = new createjs.Shape();
		var graphics = new_hex.graphics;
		// --- Draw Hexagon Face --- //
		graphics.beginStroke("black");
		graphics.setStrokeStyle(1);
		graphics.beginFill(color);
		var angle = 0;

		graphics.moveTo(Math.cos(angle) * HEX_RADIUS, Math.sin(angle) * HEX_RADIUS);
		for(var i = 0; i < 6; i ++)
		{
			angle += Math.PI / 3;
			graphics.lineTo(Math.cos(angle) * HEX_RADIUS, Math.sin(angle) * HEX_RADIUS);
		}
		graphics.endStroke();
		graphics.endFill();

		// --- Draw South West Face --- //
		points = [];
		graphics.beginStroke("black");
		graphics.setStrokeStyle(1);
		graphics.beginFill("brown");

		points[0] = { x: (HEX_RADIUS * Math.cos(Math.PI)),			y: 0 }; 
		points[1] = { x: (HEX_RADIUS * Math.cos(2 * Math.PI / 3)),	y: HEX_RADIUS * Math.sin(2 * Math.PI / 3)};
		points[2] = { x: points[1].x,									y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,									y: points[0].y + HEX_BASE };

		graphics.moveTo(points[0].x, points[0].y);
		for(var i = 3; i >= 0; i --)
			graphics.lineTo(points[i].x, points[i].y);
		graphics.endStroke();
		graphics.endFill();

		// --- Draw South Face --- //
		points = [];
		graphics.beginStroke("black");
		graphics.setStrokeStyle(1);
		graphics.beginFill("brown");

		points[0] = { x: (HEX_RADIUS * Math.cos(Math.PI / 3)),			y: HEX_RADIUS * Math.sin(Math.PI / 3) }; 
		points[1] = { x: (HEX_RADIUS * Math.cos(2 * Math.PI / 3)),		y: HEX_RADIUS * Math.sin(2 * Math.PI / 3)};
		points[2] = { x: points[1].x,										y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,										y: points[0].y + HEX_BASE };

		graphics.moveTo(points[0].x, points[0].y);
		for(var i = 3; i >= 0; i --)
			graphics.lineTo(points[i].x, points[i].y);
		graphics.endStroke();
		graphics.endFill();

		// --- Draw South East Face --- //
		points = [];
		graphics.beginStroke("black");
		graphics.setStrokeStyle(1);
		graphics.beginFill("brown");

		points[0] = { x: (HEX_RADIUS),								y: 0 }; 
		points[1] = { x: (HEX_RADIUS * Math.cos(Math.PI / 3)),		y: HEX_RADIUS * Math.sin(Math.PI / 3)};
		points[2] = { x: points[1].x,									y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,									y: points[0].y + HEX_BASE };

		graphics.moveTo(points[0].x, points[0].y);
		for(var i = 3; i >= 0; i --)
			graphics.lineTo(points[i].x, points[i].y);
		graphics.endStroke();
		graphics.endFill();

		// --- Draw South Face --- //
		points = [];
		graphics.beginStroke("black");
		graphics.setStrokeStyle(1);
		graphics.beginFill("brown");

		points[0] = { x: (HEX_RADIUS * Math.cos(Math.PI / 3)),			y: HEX_RADIUS * Math.sin(Math.PI / 3) }; 
		points[1] = { x: (HEX_RADIUS * Math.cos(2 * Math.PI / 3)),		y: HEX_RADIUS * Math.sin(2 * Math.PI / 3)};
		points[2] = { x: points[1].x,										y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,										y: points[0].y + HEX_BASE };

		graphics.moveTo(points[0].x, points[0].y);
		for(var i = 3; i >= 0; i --)
			graphics.lineTo(points[i].x, points[i].y);
		graphics.endStroke();
		graphics.endFill();

		return new_hex;
	}
}