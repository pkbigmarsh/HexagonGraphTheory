function HexEdge(parameters) {
	parameters 				= default_arg(parameters, {});
	this.from 				= default_arg(parameters.from, null);
	this.to 				= default_arg(parameters.to, null);
	this.distance 			= default_arg(parameters.to, 0);
	this.shape 				= default_arg(parameters.shape, new createjs.Shape());
	this.graphics 			= this.shape.graphics;

	this.calculate_distance = function() {
		if(this.from == null || this.to == null)
		{
			this.distance = 0;
			return false;
		}
		
		var dis = Math.abs(this.from.terrain - this.to.terrain);
		dis += Math.abs(this.from.height - this.to.height);

		this.distance = dis;
		return true;
	}

	this.draw = function(color) {
		this.set_pos();
		console.log(this.get_x(), this.get_y());
		color = default_arg(color, "black");
		var dx = this.from.get_x() - this.to.get_x();
		var dy = this.from.get_y() - this.to.get_y();
		var radius = this.from.get_distance(this.to) * .9;
		var angle = Math.tan(dy / dx);
		var point_x = Math.cos(angle) * radius;
		var point_y = Math.sin(angle) * radius;

		this.graphics.clear();
		this.graphics.beginStroke(color);
		this.graphics.setStrokeStyle(3);

		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(point_x, point_y);
		this.graphics.endStroke();
	}

	this.set_pos = function() {
		if(this.from == null)
		{
			this.set_x(0);
			this.set_y(0);
		}
		else
		{
			this.set_x(this.from.get_x());
			this.set_y(this.from.get_y());
		}
	}

	this.set_x = function(x) {
		this.shape.x = x;
	}

	this.get_x = function() {
		return this.shape.x;
	}

	this.set_y = function(y) {
		this.shape.y = y;
	}

	this.get_y = function() {
		return this.shape.y;
	}

	this.calculate_distance();
}

HexEdge.prototype.toString = function()
{
	return {
		from: this.from.toString(),
		to: this.to.toString(),
		distance: this.distance,
	};
}