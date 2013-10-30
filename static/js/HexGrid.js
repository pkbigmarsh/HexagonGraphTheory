function HexGrid(parameters) {
	parameters = default_arg(parameters, {});
	this.ctx 			= default_arg(parameters.context, null);
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

	this.draw_hex = function(x, y, line_style)
	{
		line_style = default_arg(line_style, {});
		if(this.ctx == null)
			return false;

		// --- Draw Hexagon Face --- //
		this.ctx.beginPath();
		this.ctx.lineWidth = default_arg(line_style.width, "1");
		this.ctx.fillStyle = default_arg(line_style.style, "green");
		this.ctx.lineStyle = default_arg(line_style.style, "black");
		var angle = 0;

		this.ctx.moveTo(Math.cos(angle) * HEX_RADIUS + x, Math.sin(angle) * HEX_RADIUS + y);
		for(var i = 0; i < 5; i ++)
		{
			angle += Math.PI / 3;
			this.ctx.lineTo(Math.cos(angle) * HEX_RADIUS + x, Math.sin(angle) * HEX_RADIUS + y);
		}
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		// --- Draw South West Face --- //
		points = [];
		this.ctx.beginPath();
		this.ctx.lineWidth = default_arg(line_style.width, "1");
		this.ctx.fillStyle = default_arg(line_style.style, "brown");
		this.ctx.lineStyle = default_arg(line_style.style, "black");

		points[0] = { x: (x + HEX_RADIUS * Math.cos(Math.PI)),			y: y }; 
		points[1] = { x: (x + HEX_RADIUS * Math.cos(2 * Math.PI / 3)),	y: y + HEX_RADIUS * Math.sin(2 * Math.PI / 3)};
		points[2] = { x: points[1].x,									y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,									y: points[0].y + HEX_BASE };

		this.ctx.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < 4; i ++)
			this.ctx.lineTo(points[i].x, points[i].y);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		// --- Draw South Face --- //
		points = [];
		this.ctx.beginPath();
		this.ctx.lineWidth = default_arg(line_style.width, "1");
		this.ctx.fillStyle = default_arg(line_style.style, "brown");
		this.ctx.lineStyle = default_arg(line_style.style, "black");

		points[0] = { x: (x + HEX_RADIUS * Math.cos(Math.PI / 3)),			y: y + HEX_RADIUS * Math.sin(Math.PI / 3) }; 
		points[1] = { x: (x + HEX_RADIUS * Math.cos(2 * Math.PI / 3)),		y: y + HEX_RADIUS * Math.sin(2 * Math.PI / 3)};
		points[2] = { x: points[1].x,										y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,										y: points[0].y + HEX_BASE };

		this.ctx.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < 4; i ++)
			this.ctx.lineTo(points[i].x, points[i].y);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		// --- Draw South East Face --- //
		points = [];
		this.ctx.beginPath();
		this.ctx.lineWidth = default_arg(line_style.width, "1");
		this.ctx.fillStyle = default_arg(line_style.style, "brown");
		this.ctx.lineStyle = default_arg(line_style.style, "black");

		points[0] = { x: (x + HEX_RADIUS),								y: y }; 
		points[1] = { x: (x + HEX_RADIUS * Math.cos(Math.PI / 3)),		y: y + HEX_RADIUS * Math.sin(Math.PI / 3)};
		points[2] = { x: points[1].x,									y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,									y: points[0].y + HEX_BASE };

		this.ctx.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < 4; i ++)
			this.ctx.lineTo(points[i].x, points[i].y);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		// --- Draw South Face --- //
		points = [];
		this.ctx.beginPath();
		this.ctx.lineWidth = default_arg(line_style.width, "1");
		this.ctx.fillStyle = default_arg(line_style.style, "brown");
		this.ctx.lineStyle = default_arg(line_style.style, "black");

		points[0] = { x: (x + HEX_RADIUS * Math.cos(Math.PI / 3)),			y: y + HEX_RADIUS * Math.sin(Math.PI / 3) }; 
		points[1] = { x: (x + HEX_RADIUS * Math.cos(2 * Math.PI / 3)),		y: y + HEX_RADIUS * Math.sin(2 * Math.PI / 3)};
		points[2] = { x: points[1].x,										y: points[1].y + HEX_BASE }; 
		points[3] = { x: points[0].x,										y: points[0].y + HEX_BASE };

		this.ctx.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < 4; i ++)
			this.ctx.lineTo(points[i].x, points[i].y);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.stroke();

		return true;
	}
}