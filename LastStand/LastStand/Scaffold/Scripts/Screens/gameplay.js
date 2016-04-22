MyGame.screens['game-play'] = (function (game) {
    'use strict';
    
    var lastTime = 0,
        newTower = 0;
    
    function startLevelEvent(e){
        if (e.keyCode == 13) {
            game.gameObjects.startNextLevel();
        }        
    }

    function gameOver(message) {
    }
    
    function initialize() {
        window.addEventListener('click', clickEvent);
        window.addEventListener('keydown', startLevelEvent);

        var controlList = [];
        controlList.push({ key: KeyEvent.DOM_VK_ESCAPE, handler: escapeKey });
        game.registerControls(controlList);
    }
    
    function escapeKey(){
        if (newTower != 0) {
            game.gameObjects.DeleteSelectedTower(true);
            game.gameObjects.ToggleTowerGrid();
            newTower = 0;
        }
    }
    
    function clickEvent(event) {
        var x = event.clientX;
        var y = event.clientY;
        
        if ((x > 724) && (x < 776)) {
            menuClick(x, y);
        } else if (newTower != 0) {
            if (game.gameObjects.PlaceTower(x, y)) {
                newTower = 0;
            }
        }
    }
    
    function menuClick(x, y) {
        var oldTowerId = newTower;
        if ((y > 99) && (y < 151)) {
            newTower = 1;
        }
        if ((y > 199) && (y < 251)) {
            newTower = 2;
        }
        if ((y > 299) && (y < 351)) {
            newTower = 3;
        }
        if ((y > 399) && (y < 451)) {
            newTower = 4;
        }
        
        if (newTower != 0 && oldTowerId == 0) {
            if (createNewTower()) {
                game.gameObjects.ToggleTowerGrid();
            } else {
                newTower = 0;
            }
        } else if (newTower != 0 && oldTowerId != newTower) {
            game.gameObjects.DeleteSelectedTower(true);
            newTower = 0;
            createNewTower();
        }
    }
    
    function createNewTower() {
        switch (newTower) {
            case 1:
                return game.gameObjects.Turret({
                    useMouse : true,
                    size : 40
                });
            case 2:
                return game.gameObjects.Missile({
                    useMouse : true,
                    size : 40
                });
            case 3:
                return game.gameObjects.Bomb({
                    useMouse : true,
                    size : 40
                });
            case 4:
                return game.gameObjects.Frost({
                    useMouse : true,
                    size : 40
                });
        }
        return false;
    }
    
    function render(elapsedTime) {
        game.gameObjects.RenderAll();
    }
    
    function update(elapsedTime) {
        game.gameObjects.UpdateAll(elapsedTime);
    }
    
    function gameLoop(time) {
        if (lastTime == 0) {
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