MyGame.screens['game-play'] = (function(game, models) {
	'use strict';
    
    var lastTime = 0,
        gameObjects = [];
        
    function gameOver(message){
    }
	
    function initialize() {
        var imageList = [];
        imageList.push({
            imageId : 'T1',
            src : 'Images/TurretLevel1.png'
        });
        
        imageList.push({
            imageId : 'M1',
            src : 'Images/MissileLevel1.png'
        });
        
        imageList.push({
            imageId : 'B1',
            src : 'Images/BombLevel1.png'
        });
        
        imageList.push({
            imageId : 'F1',
            src : 'Images/FrostLevel1.png'
        });

        game.graphics.loadImages(imageList);
         
        gameObjects.push(models.Turret({
            position : { x: 500, y: 500 },
            gridIds : ['1'],
            size : 40
        }));

        gameObjects.push(models.Missile({
            position : { x: 400, y: 400 },
            gridIds : ['1'],
            size : 40
        }));

        gameObjects.push(models.Bomb({
            position : { x: 600, y: 400 },
            gridIds : ['1'],
            size : 40
        }));

        gameObjects.push(models.Frost({
            position : { x: 500, y: 300 },
            gridIds : ['1'],
            size : 40
        }));
	}
    
    function render(elapsedTime){
        game.graphics.clearCanvas();
        for (var i = 0; i < gameObjects.length; ++i) {
            var obj = gameObjects[i];
            game.graphics.drawGameObject({
                position : obj.position,
                rotation : obj.rotation,
                size : obj.size,
                imageId : obj.imageId
            });
        }
    }
    
    function update(elapsedTime) {
        //game.particleSystem.update(elapsedTime);
        for (var i = 0; i < gameObjects.length; ++i) {
            gameObjects[i].update(elapsedTime);
        }
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
}(MyGame.game, MyGame.models));