MyGame.screens['game-play'] = (function(game) {
	'use strict';
    
    var lastTime = 0;
        
    function gameOver(message){
    }
	
	function initialize() {
	}
    
    function render(elapsedTime){
        game.Graphics.clearCanvas();
    }
    
    function update(elapsedTime) {
        game.ParticleSystem.update(elapsedTime);
    }
    
	function gameLoop(time) {
        if(lastTime == 0){
            lastTime = performance.now();
        }
        
        var currentTime = performance.now();
        var elapsedTime = currentTime - lastTime;
        lastTime = currentTime;
        
        game.updateKeyboard(elapsedTime);
        update(elapsedTime);
        render(elapsedTime);  
	}
	
	function run(newGame) {
        lastTime = 0;
		requestAnimationFrame(gameLoop);
	}
	
	return {
		initialize : initialize,
		run : run
	};
}(MyGame.game));