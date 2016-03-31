MyGame.screens['game-play'] = (function(game) {
	'use strict';
    
    var lastTime = 0;
        
    function gameOver(message){
    }
	
    function initialize() {
        /* Initialing placing towers for the demo */
        game.gameObjects.Turret({
            position : { x: 500, y: 500 },
            gridIds : ['1'],
            size : 40
        });

        game.gameObjects.Missile({
            position : { x: 400, y: 400 },
            gridIds : ['1'],
            size : 40
        });

        game.gameObjects.Bomb({
            position : { x: 600, y: 400 },
            gridIds : ['1'],
            size : 40
        });

        game.gameObjects.Frost({
            position : { x: 500, y: 300 },
            gridIds : ['1'],
            size : 40
        });
	}
    
    function render(elapsedTime){
        game.gameObjects.RenderAll();
    }
    
    function update(elapsedTime) {
        //game.particleSystem.update(elapsedTime);
        game.gameObjects.UpdateAll(elapsedTime);
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

        requestAnimationFrame(gameLoop);
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