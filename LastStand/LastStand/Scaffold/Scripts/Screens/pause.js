MyGame.screens['pause'] = (function(game) {
	'use strict';
	
	function initialize() {
		document.getElementById('id-pause-resume').addEventListener(
			'click',
			function() { game.showScreen('game-play'); });
            
            document.getElementById('id-pause-quit').addEventListener(
			'click',
			function() { game.showScreen('main-menu'); });
            
	}
    
    function unPause(){
    }
	
	function run() {
		//
		// I know this is empty, there isn't anything to do.
	}
	
	return {
		initialize : initialize,
		run : run
	};
}(MyGame.game));
