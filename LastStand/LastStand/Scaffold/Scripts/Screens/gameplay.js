MyGame.screens['game-play'] = (function (game) {
    'use strict';
    
    var lastTime = 0,
        newTower = 0;
    
    //upgrade tower
    function upgradeEvent(e) {
        var temp = document.getElementById('bind1').innerHTML;
        console.log("upgrade: " + temp)
        var temp2 = temp.slice(-1);
        temp2 = temp2.charCodeAt(0);
        if (temp == "") {
            return;
        }
        if (temp.substring(0, 4) == "Ctrl") {
            if ((e.ctrlKey) && (e.keyCode == temp2)) {
                game.gameObjects.UpgradeSelectedTower();
            }
        }
        if (temp.substring(0, 5) == "Shift") {
            if ((e.shiftKey) && (e.keyCode == temp2)) {
                game.gameObjects.UpgradeSelectedTower();
            }
        }
        if (temp.substring(0, 3) == "Alt") {
            if ((e.altlKey) && (e.keyCode == temp2)) {
                game.gameObjects.UpgradeSelectedTower();
            }
        }
        if ((e.keyCode == temp2) && (temp.length == 1)) {
            game.gameObjects.UpgradeSelectedTower();
        }
    }

    //sell tower
    function sellEvent(e) {
        var temp = document.getElementById('bind2').innerHTML;
        console.log("sell: " + temp);
        var temp2 = temp.slice(-1);
        temp2 = temp2.charCodeAt(0);
        if (temp == "") {
            return;
        }
        if (temp.substring(0, 4) == "Ctrl") {
            if ((e.ctrlKey) && (e.keyCode == temp2)) {
                game.gameObjects.DeleteSelectedTower();
            }
        }
        if (temp.substring(0, 5) == "Shift") {
            if ((e.shiftKey) && (e.keyCode == temp2)) {
                game.gameObjects.DeleteSelectedTower();
            }
        }
        if (temp.substring(0, 3) == "Alt") {
            if ((e.altlKey) && (e.keyCode == temp2)) {
                game.gameObjects.DeleteSelectedTower();
            }
        }
        if ((e.keyCode == temp2) && (temp.length == 1)) {
            game.gameObjects.DeleteSelectedTower();
        }
    }

    //start game
    function startLevelEvent(e){
        var temp = document.getElementById('bind3').innerHTML;
        console.log("start: " + temp);
        var temp2 = temp.slice(-1);
        temp2 = temp2.charCodeAt(0);
        if (temp == "") {
            return;
        }
        if (temp.substring(0, 4) == "Ctrl") {
            if ((e.ctrlKey) && (e.keyCode == temp2)) {
                game.gameObjects.startNextLevel();
            }
        }
        if (temp.substring(0, 5) == "Shift") {
            if ((e.shiftKey) && (e.keyCode == temp2)) {
                game.gameObjects.startNextLevel();
            }
        }
        if (temp.substring(0, 3) == "Alt") {
            if ((e.altlKey) && (e.keyCode == temp2)) {
                game.gameObjects.startNextLevel();
            }
        }
        if ((e.keyCode == temp2) && (temp.length == 1)) {
            game.gameObjects.startNextLevel();
        }        
    }

    function gameOver(message) {
    }
    
    function initialize() {
        window.addEventListener('click', clickEvent);

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
        } else if ((x > 704) && (x < 786) && (y > 471) && (y < 493)) {
            game.gameObjects.UpgradeSelectedTower();
        } else if ((x > 789) && (x < 871) && (y > 471) && (y < 493)) {
            game.gameObjects.DeleteSelectedTower(false);
        } else if ((x < 700) && newTower != 0) {
            if (game.gameObjects.PlaceTower(x, y)) {
                newTower = 0;
            }
        } else {
            if (x < 700) {
                game.gameObjects.Click(x, y);
            }
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
        window.addEventListener('keydown', upgradeEvent);
        window.addEventListener('keydown', sellEvent);
        window.addEventListener('keydown', startLevelEvent);
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));