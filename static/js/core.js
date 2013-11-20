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