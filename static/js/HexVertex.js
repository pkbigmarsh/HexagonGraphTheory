function HexVertex(parameters){
	parameters 			= default_arg(parameters, {});
	this.shape 			= default_arg(parameters.shape, new createjs.Shape());
	this.graphics 		= this.shape.graphics;
	this.above 			= default_arg(parameters.above, null);
	this.height 		= default_arg(parameters.height, 0);

	this.set_x = function(new_x) {
		this.shape.x = new_x;
	};

	this.set_y = function(new_y) {
		this.shape.y = new_y;
	}

	this.set_pos = function(pos){
		this.shape.x = pos.x;
		this.shape.y = pos.y;
	}

	this.create_hex = function(color)
	{
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
	}

	this.addEventListener = function(event_str, event_function) {
		this.shape.addEventListener(event_str, event_function);
	}

	this.clone = function() {
		return new HexVertex({
			shape: this.shape.clone(true),
			above: this.above,
			height: this.height
		});
	}

	this.create_hex(parameters.color);
}