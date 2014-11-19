// SETTINGS ========

require.config({
	paths : {
		"text"						: "lib/require/text",
		"jquery" 					: "lib/jquery/jquery"
	},
	shim : {
	}
});


// INIT APP ========
define(
	[
		// "require" as depencency so paths are relative to
		// current context
		"require",
		"jquery"
	],
	function(require, $){
		
	}
);