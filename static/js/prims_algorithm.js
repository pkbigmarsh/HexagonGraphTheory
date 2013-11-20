var selected_origin = null;
var current_highlighted = null;

var prims_info = "<p style='margin: 3px;'>Please click to select a hex as the origin for the minimum spanning tree. After that hit start.</p></br>";
var prims_button = '<a style="margin: 3px;" class="button" id="prim_start">Start</a>';


$("#prims_button").on("click", function() {
	$("#info_panel").html(prims_info + prims_button);

	$("#prim_start").on("click", start);
	
	main_stage.addEventListener("stagemousemove", highlight);
	main_stage.addEventListener("stagemousedown", start);
});

function highlight(event)
{
	hover_hex = get_hex_under_point({x: event.stageX, y:event.stageY});
	if(hover_hex != null)
	{
		if(current_highlighted != null && hover_hex != current_highlighted)
			current_highlighted.unHighlight();
		current_highlighted = hover_hex;
		current_highlighted.highlight();
	}
	else
	{
		if(current_highlighted != null)
			current_highlighted.unHighlight();
		current_highlighted = null;
	}
}

function start()
{
	if(current_highlighted == null)
	{
		$("#info_panel").html(prims_info + "Please click on a hex.</br>" + prims_button);
		return false;
	}

	main_stage.removeEventListener("stagemousemove", highlight);
	main_stage.removeEventListener("stagemousedown", start);
	$("#info_panel").html("");

	place_placed_hexes_into_graph(current_highlighted);
	console.log(graph.toString());
}