var NN 						= 0;
var NE 						= 1;
var SE 						= 2;
var SS 						= 3;
var SW 						= 4;
var NW 						= 5;

var ANGLE_NN				= Math.PI * 9 / 6;
var ANGLE_NE 				= Math.PI * 11 / 6;
var ANGLE_SE 				= Math.PI * 1 / 6;
var ANGLE_SS 				= Math.PI * 3 / 6;
var ANGLE_SW 				= Math.PI * 5 / 6;
var ANGLE_NW 				= Math.PI * 7 / 6;

var HEX_RADIUS 				= 30;
var HEX_BASE 				= 15;
var HEX_APOTHEM			 	= Math.cos(Math.PI / 6) * HEX_RADIUS;

var MAIN_STAGE_WIDTH 		= 845;
var MAIN_STAGE_HEIGHT 		= 478;

// Colors
var HEX_BROWN 				= createjs.Graphics.getRGB(138, 086, 057);
var HEX_RED 				= createjs.Graphics.getRGB(155, 000, 000);
var HEX_GREEN 				= createjs.Graphics.getRGB(000, 155, 000);

// Terrain
var TERRAIN_EASY 			= 0;
var TERRAIN_MEDIUM 			= 1;
var TERRAIN_HARD			= 2;