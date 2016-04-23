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
        
        if ((x > 774) && (x < 826)) {
            menuClick(x, y);
        } else if (newTower != 0) {
            if (game.gameObjects.PlaceTower(x, y)) {
                newTower = 0;
            }
        } else {
            game.gameObjects.Click(x, y);
        }
    }
    
    function menuClick(x, y) {
        var oldTowerId = newTower;
        if ((y > 9) && (y < 61)) {
            newTower = 1;
        }
        if ((y > 89) && (y < 141)) {
            newTower = 2;
        }
        if ((y > 169) && (y < 221)) {
            newTower = 3;
        }
        if ((y > 249) && (y < 301)) {
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
                    size : 40,
                    type : 'Turret'
                });
            case 2:
                return game.gameObjects.Missile({
                    useMouse : true,
                    size : 40,
                    type : 'Missile'
                });
            case 3:
                return game.gameObjects.Bomb({
                    useMouse : true,
                    size : 40,
                    type : 'Bomb'
                });
            case 4:
                return game.gameObjects.Frost({
                    useMouse : true,
                    size : 40,
                    type : 'Frost'
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