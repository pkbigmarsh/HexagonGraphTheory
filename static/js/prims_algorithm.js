var selected_origin = null;
var current_highlighted = null;

$("#prims_button").on("click", function() {
	$("#info_panel").html(
			"<p style='margin: 3px;'>Please click to select a hex as the origin for the minimum spanning tree. After that hit start.</p></br>" +
			'<a style="margin: 3px;" class="button" id="prim_start">Start</a>'
		);

	$("#prim_start").on("click", start);
	
	main_stage.addEventListener("stagemousemove", function(event) {
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
	});
});

function highlight(hex)
{
	console.log(hex);
}

function start()
{

}