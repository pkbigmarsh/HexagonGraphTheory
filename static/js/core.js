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