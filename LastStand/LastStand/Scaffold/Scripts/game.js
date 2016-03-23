MyGame.game = (function(screens, input, graphics, particles) {
	'use strict';
    
    var keyBoard = input.Keyboard();
	
	function showScreen(id, newGame) {
		var screen = 0,
			active = null;

		active = document.getElementsByClassName('active');
		for (screen = 0; screen < active.length; screen++) {
			active[screen].classList.remove('active');
		}
		screens[id].run(newGame);
		document.getElementById(id).classList.add('active');
	}
    
    function registerControls(controlList){
        keyBoard.clear();
        for(var i = 0; i < controlList.length; ++i){
            keyBoard.registerCommand(controlList[i].key, controlList[i].handler);
        }
    }
    
    function updateKeyboard(elapsedTime){
        keyBoard.update(elapsedTime);
    }

	function initialize() {
		var screen = null;
		for (screen in screens) {
			if (screens.hasOwnProperty(screen)) {
				screens[screen].initialize();
			}
		}
		
		showScreen('main-menu');
	}
	
	return {
		initialize : initialize,
		showScreen : showScreen,
        registerControls : registerControls,
        updateKeyboard : updateKeyboard,
        Graphics : graphics,
        ParticleSystem : particles
	};
}(MyGame.screens, MyGame.input, MyGame.graphics, MyGame.particles));