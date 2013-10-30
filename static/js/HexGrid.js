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

	this.draw_hex = function(x, y, r, line_style)
	{
		line_style = default_arg(line_style, {});
		if(this.ctx == null)
			return false;

		this.ctx.beginPath();
		this.ctx.lineWidth = default_arg(line_style.width, "1");
		this.ctx.strokeStyle = default_arg(line_style.style, "black");
		var angle = 0;

		this.ctx.moveTo(Math.cos(angle) * r + x, Math.sin(angle) * r + y);
		for(var i = 0; i < 5; i ++)
		{
			angle += Math.PI / 3;
			this.ctx.lineTo(Math.cos(angle) * r + x, Math.sin(angle) * r + y);
		}
		this.ctx.closePath();

		this.ctx.stroke();
		return true;
	}
}