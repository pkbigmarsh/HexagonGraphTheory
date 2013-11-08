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