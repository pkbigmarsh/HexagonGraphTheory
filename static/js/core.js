function default_arg(value, default_value)
{
	return (typeof value != "undefined") ? value : default_value;
}

function truncate(number, digits)
{
	digits = default_arg(digits, 0);
	var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
}

function opposite_direction(direction){
	return (direction + 3) % 6;
}

function get_next(direction) {
	return (direction + 1) % 6;
}

function get_previous(direction) {
	return (direction + 5) % 6;
}

function throw_error(source_function, message, data)
{
	source_function = default_arg(source_function, "throw_error");
	message 		= default_arg(message, "No message supplied");
	data 			= default_arg(data, {});

	console.error("Function: %s\n\tMessage: %s\n\t\tData: %o", source_function, message, data);
}

function get_hex_under_point(point)
{
	var highest = null;
	for(var i = 0; i < placed_hexes.length; i ++)
	{
		var test_hex = placed_hexes[i];
		var test_point = main_stage.localToLocal(point.x, point.y, test_hex.shape);
		while(test_hex.above != null)
		{
			if(test_hex.hitTest(test_point))
				break;
			test_hex = test_hex.above;
		}
		if(test_hex.hitTest(test_point))
		{
			test_hex = test_hex.get_top();
			if(highest == null)
				highest = test_hex;
			else if(test_hex.height > highest.height)
				highest = test_hex;
			else if(test_hex.height == highest.height && test_hex.get_y() > highest.get_y())
				highest = test_hex;
		}
	}

	return highest;
}

function angle_between_two_points(start_point, end_point)
{
	var dx = end_point.x - start_point.x;
	var dy = end_point.y - start_point.y;

	if(dx == 0)
	{
		if(dy > 0)
			return Math.PI / 2;
		else if(dy < 0)
			return Math.PI * 3 / 2;
	}
	
	angle = Math.atan2(dy, dx);
	if(angle < 0)
		angle += 2 * Math.PI;

	return angle;

}

function get_direction_angle(direction)
{
	switch(direction)
	{
	case NN:
		return ANGLE_NN;
		break;
	case NE:
		return ANGLE_NE;
		break;
	case SE:
		return ANGLE_SE;
		break;
	case SS:
		return ANGLE_SS;
		break;
	case SW:
		return ANGLE_SW;
		break;
	case NW:
		return ANGLE_NW;
		break;
	}

	return -1;
}

function get_hextant(angle)
{
	if(angle > Math.PI * 2)
		angle -= Math.PI * 2;
	else if(angle < 0)
		angle += Math.PI * 2;
	for(var i = 0; i < 6; i ++)
	{
		var angle_1 = Math.PI * i / 3;
		var angle_2 = Math.PI * (i + 1) / 3;
		if(angle_1 < angle && angle < angle_2)
			return (i + 2) % 6;
	}
	return -1;
}

function enable_buttons() 
{
	$(".button").removeAttr("disabled");
}

function disable_buttons()
{
	$(".button").attr("disabled", "disabled");	
}

function print_direction(direction)
{
	switch(direction)
	{
		case NN:
			console.log("North");
			break;
		case NE:
			console.log("North East");
			break;
		case SE:
			console.log("South East");
			break;
		case SS:
			console.log("South");
			break;
		case SW:
			console.log("South West");
			break;
		case NW:
			console.log("North West");
			break;
		default:
			console.log("Invalid Direction");
			break;
	};
}


function clear_edges()
{
	for(var i = 0; i < placed_edges.length; i ++)
	{
		main_stage.removeChild(placed_edges[i].shape);
	}

	if(current_highlighted != null)
		current_highlighted.unHighlight();

	if(selected_start != null)
		selected_start.unHighlight();

	if(selected_end != null)
		selected_end.unHighlight();

	current_highlighted = null;
	edges = null;
	new_edges = null;
	timer = null;
	placed_edges = [];
	sorted_edges = [];
	edges = null;
	timer = null;
	selected_start = null;
	selected_end = null;
}

function clear_hexes()
{
	for(var i = 0; i < placed_hexes.length; i ++)
	{
		var hex = placed_hexes[i].get_bottom();
		while(hex != null)
		{
			main_stage.removeChild(hex.shape);
			hex = hex.above;
		}
	}

	clear_edges();
	current_hex = null;
	current_bottom_hex = null;
	placed_hexes = [];
}