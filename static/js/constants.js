var NN 						= 0;
var NW 						= 1;
var SW 						= 2;
var SS 						= 3;
var SE 						= 4;
var NE 						= 5;

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