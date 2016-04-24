MyGame.GameObjects = (function (graphics, particleSystem) {
    'use strict';
    
    var gameObjects = {},
        towerGridActive = false,
        towerGrid = [],
        collisionGrid = [],
        selectedTower = 0,
        trackTargetRotationSpeed = Math.PI,
        sprites = {},
        moneyEarned = 0,
        scoreTotal = 0,
        renderEvent = [],
        gameLive = false,
        currentLevel = 0,
        currentWave = 0,
        towerValues = 0,
        creepsEscaped = 0, 
        creepsDestroyed = 0,
        gameLost = false;
    
    //level stuff
    var levels = {};
    //level 1
    levels[0] = {
        waveOne: function () {
            ClearCollisionGrid();
            currentWave = 1;
            triggerLevelEvent(250, 40, "Level One Start!");
            var int1Counter = 0;
            var interval1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 25,
                    hp : 30
                }, "right");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(interval1);
                    var temp = setInterval(function () {
                        levels[currentLevel].waveTwo();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 5000);
        },
        waveTwo: function () {
            ClearCollisionGrid();
            var int1Counter = 0,
                int2Counter = 0;
            var interval1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 25,
                    hp : 30
                }, "right");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(interval1);
                    var temp = setInterval(function () {
                        levels[currentLevel].waveThree();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 5000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 10,
                    hp : 80
                }, "right");
                int2Counter++;
                if (int2Counter == 5) {
                    clearInterval(interval2);
                }
            }, 8000);
        },
        waveThree: function () {
            ClearCollisionGrid();
            var int1Counter = 0,
                int2Counter = 0,
                int3Counter = 0;
            var interval1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 20,
                    hp : 30
                }, "right");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(interval1);
                    currentLevel++;
                    currentWave = 0;
                    gameLive = false;
                }
            }, 5000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 10,
                    hp : 80
                }, "right");
                int2Counter++;
                if (int2Counter == 5) {
                    clearInterval(interval2);
                }
            }, 8000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 20,
                    hp : 30
                }, "right");
                int3Counter++;
                if (int1Counter == 6) {
                    clearInterval(interval3);
                }
            }, 5000);
        }
    };
    //level 2
    levels[1] = {
        waveOne: function () {
            ClearCollisionGrid();
            triggerLevelEvent(250, 40, "Level Two Start!");
            currentWave = 1;
            var int1Counter = 0;
            var int2Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 25,
                    hp : 35
                }, "left");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 35
                }, "right");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[1].waveTwo();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 3000);
        }, 
        waveTwo: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 25,
                    hp : 35
                }, "right");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 35
                }, "left");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[1].waveThree();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 20,
                    hp : 100
                }, "left");
                int3Counter++;
                if (int3Counter == 5) {
                    clearInterval(interval3);
                }
            }, 4000);
        }, 
        waveThree: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 40
                }, "left");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[1].waveFour();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 20,
                    hp : 100
                }, "left");
                int3Counter++;
                if (int3Counter == 5) {
                    clearInterval(interval3);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int4Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral4);
                }
            }, 2000);
        }, 
        waveFour: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var int5Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int1Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 40
                }, "left");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 25,
                    hp : 100
                }, "left");
                int3Counter++;
                if (int3Counter == 10) {
                    clearInterval(interval3);
                    var temp = setInterval(function () {
                        clearInterval(temp);
                        currentWave = 0;
                        currentLevel++;
                        gameLive = false;
                    }, 20000);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int4Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral4);
                }
            }, 2000);
            var intveral5 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 25,
                    hp : 100
                }, "right");
                int5Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral5);
                }
            }, 1500);
        }
    };
    
    //level 3
    levels[2] = {
        waveOne: function () {
            ClearCollisionGrid();
            triggerLevelEvent(250, 40, "Level Three Start!");
            currentWave = 1;
            var int1Counter = 0;
            var int2Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 45
                }, "top");
                int1Counter++;
                if (int1Counter == 20) {
                    clearInterval(intveral1);
                }
            }, 1500);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 45
                }, "right");
                int2Counter++;
                if (int2Counter == 15) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[2].waveTwo();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 2000);
        }, 
        waveTwo: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 25,
                    hp : 35
                }, "right");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 35
                }, "left");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[2].waveThree();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 25,
                    hp : 100
                }, "top");
                int3Counter++;
                if (int3Counter == 5) {
                    clearInterval(interval3);
                }
            }, 4000);
        }, 
        waveThree: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "top");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 40
                }, "left");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[2].waveFour();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 20,
                    hp : 100
                }, "top");
                int3Counter++;
                if (int3Counter == 5) {
                    clearInterval(interval3);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int4Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral4);
                }
            }, 2000);
        }, 
        waveFour: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var int5Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int1Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 40
                }, "top");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 25,
                    hp : 100
                }, "left");
                int3Counter++;
                if (int3Counter == 10) {
                    clearInterval(interval3);
                    var temp = setInterval(function () {
                        clearInterval(temp);
                        currentWave++;
                        levels[2].waveFive();
                    }, 20000);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int4Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral4);
                }
            }, 2000);
            var intveral5 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 35,
                    hp : 110
                }, "top");
                int5Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral5);
                }
            }, 1500);
        }, 
        waveFive: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var int5Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int1Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 40
                }, "top");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 25,
                    hp : 100
                }, "left");
                int3Counter++;
                if (int3Counter == 10) {
                    clearInterval(interval3);
                    var temp = setInterval(function () {
                        clearInterval(temp);
                        currentWave = 0;
                        currentLevel++;
                        gameLive = false;
                    }, 20000);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 35
                }, "right");
                int4Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral4);
                }
            }, 2000);
            var intveral5 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 35,
                    hp : 110
                }, "top");
                int5Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral5);
                }
            }, 1500);
        }
    };
    
    //level 4
    levels[3] = {
        waveOne: function () {
            ClearCollisionGrid();
            triggerLevelEvent(250, 40, "Level Four Start!");
            currentWave = 1;
            var int1Counter = 0;
            var int2Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 0 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "bottom");
                int1Counter++;
                if (int1Counter == 20) {
                    clearInterval(intveral1);
                }
            }, 1500);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 50
                }, "right");
                int2Counter++;
                if (int2Counter == 15) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[3].waveTwo();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 2000);
        }, 
        waveTwo: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 35,
                    hp : 40
                }, "right");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 0 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 50,
                    hp : 20
                }, "bottom");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[3].waveThree();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 5,
                    hp : 140
                }, "top");
                int3Counter++;
                if (int3Counter == 5) {
                    clearInterval(interval3);
                }
            }, 4000);
        }, 
        waveThree: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "top");
                int1Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 50
                }, "left");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                    var temp = setInterval(function () {
                        levels[3].waveFour();
                        clearInterval(temp);
                        currentWave++;
                    }, 20000);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 0 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 30,
                    hp : 100
                }, "bottom");
                int3Counter++;
                if (int3Counter == 5) {
                    clearInterval(interval3);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "right");
                int4Counter++;
                if (int1Counter == 10) {
                    clearInterval(intveral4);
                }
            }, 2000);
        }, 
        waveFour: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var int5Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "right");
                int1Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 50
                }, "top");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 25,
                    hp : 100
                }, "left");
                int3Counter++;
                if (int3Counter == 10) {
                    clearInterval(interval3);
                    var temp = setInterval(function () {
                        clearInterval(temp);
                        currentWave++;
                        levels[3].waveFive();
                    }, 20000);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "right");
                int4Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral4);
                }
            }, 2000);
            var intveral5 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 0 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 35,
                    hp : 120
                }, "bottom");
                int5Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral5);
                }
            }, 1500);
        }, 
        waveFive: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var int5Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "right");
                int1Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 50
                }, "top");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 25,
                    hp : 100
                }, "left");
                int3Counter++;
                if (int3Counter == 10) {
                    clearInterval(interval3);
                    var temp = setInterval(function () {
                        clearInterval(temp);
                        currentWave++;
                        levels[3].waveSix();
                    }, 20000);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "right");
                int4Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral4);
                }
            }, 2000);
            var intveral5 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 0 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 35,
                    hp : 120
                }, "bottom");
                int5Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral5);
                }
            }, 1500);
        }, 
        waveSix: function () {
            ClearCollisionGrid();
            var int1Counter = 0;
            var int2Counter = 0;
            var int3Counter = 0;
            var int4Counter = 0;
            var int5Counter = 0;
            var intveral1 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "right");
                int1Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral1);
                }
            }, 2000);
            var interval2 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 699 },
                    size : 30,
                    spriteSheetId : 1,
                    speed : 35,
                    hp : 50
                }, "top");
                int2Counter++;
                if (int2Counter == 12) {
                    clearInterval(interval2);
                }
            }, 3000);
            var interval3 = setInterval(function () {
                Creep({
                    position : { x: 699, y: 325 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 25,
                    hp : 100
                }, "left");
                int3Counter++;
                if (int3Counter == 10) {
                    clearInterval(interval3);
                    var temp = setInterval(function () {
                        clearInterval(temp);
                        currentWave = 0;
                        //game over
                    }, 20000);
                }
            }, 4000);
            var intveral4 = setInterval(function () {
                Creep({
                    position : { x: 0, y: 325 },
                    size : 30,
                    spriteSheetId : 3,
                    speed : 30,
                    hp : 50
                }, "right");
                int4Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral4);
                }
            }, 2000);
            var intveral5 = setInterval(function () {
                Creep({
                    position : { x: 325, y: 0 },
                    size : 30,
                    spriteSheetId : 2,
                    speed : 35,
                    hp : 120
                }, "bottom");
                int5Counter++;
                if (int1Counter == 12) {
                    clearInterval(intveral5);
                    gameLost = true;
                    clearGame();
                }
            }, 1500);
        }
    };
    
    function ClearCollisionGrid() {
        collisionGrid.length = 0;
        collisionGrid = [];
        
        var temp = [],
            rows = 14,
            cols = 14;
        
        for (var i = 0; i < rows / 2; ++i) {
            temp = [];
            for (var k = 0; k < cols / 2; ++k) {
                temp[k] = [];
            }
            collisionGrid.push(temp);
        }
    };
    
    function startNextLevel() {
        if (!gameLive) {
            gameLive = true;
            levels[currentLevel].waveOne();
        }
    }
    
    function triggerScoreEvent(x, y, worth) {
        renderEvent.push([x, y, worth, 100, 0]);
    }
    
    function triggerLevelEvent(x, y, type) {
        renderEvent.push([x, y, type, 200, 1]);
    }
    
    function PlaySound(id, loop) {
        var audio = document.getElementById(id);
        if (!audio.paused) audio.pause();
        audio.currentTime = 0;
        if (loop) {
            audio.loop = true;
        }
        audio.play();
    }
    
    function SpriteObject(spec) {
        var that = {},
            imageIds = spec.imageIds,
            imageTimes = spec.imageTimes;
        
        that.update = function (creep) {
            if (creep.imageElapsedTime >= imageTimes[creep.currentId]) {
                creep.imageElapsedTime = 0;
                creep.currentId++;
                if (creep.currentId >= imageIds.length) {
                    creep.currentId = 0;
                }
            }
            return imageIds[creep.currentId];
        }
        
        return that;
    }
    
    function GenerateSpritesList() {
        sprites[1] = SpriteObject({
            imageIds : ['Red1', 'Red2', 'Red3', 'Red4', 'Red5', 'Red6'],
            imageTimes : [1000, 200, 100, 1000, 100, 200]
        });
        sprites[2] = SpriteObject({
            imageIds : ['Yellow1', 'Yellow2', 'Yellow3', 'Yellow4'],
            imageTimes : [200, 1000, 200, 600]
        });
        sprites[3] = SpriteObject({
            imageIds : ['Blue1', 'Blue2', 'Blue3', 'Blue4'],
            imageTimes : [1000, 200, 200, 200]
        });
    }
    
    function GameObjects() {
        var that = {},
            objectsList = {},
            nextId = 0;
        
        that.add = function (gameObject) {
            var newId = ++nextId;
            gameObject.id = newId;
            objectsList[newId] = gameObject;
        }
        
        that.remove = function (objectId) {
            delete objectsList[objectId];
        }
        
        that.getObject = function (objectId) {
            if (objectsList.hasOwnProperty(objectId))
                return objectsList[objectId];
        }
        
        that.getObjectList = function () {
            var objects = [];
            for (var key in objectsList) {
                if (objectsList.hasOwnProperty(key)) {
                    objects.push(objectsList[key]);
                }
            }
            return objects;
        }
        
        that.detectCollisions = function (projectile) {
            if (projectile.gridX < 0) {
                projectile.gridX = 0;
            }
            if (projectile.gridX > 6) {
                projectile.gridX = 6;
            }
            if (projectile.gridY < 0) {
                projectile.gridY = 0;
            }
            if (projectile.gridY > 6) {
                projectile.gridY = 6;
            }
            
            var itemsInGrid = collisionGrid[projectile.gridY][projectile.gridX];
            
            for (var i = 0; i < itemsInGrid.length; ++i) {
                if (itemsInGrid[i] !== projectile.id) {
                    var object1 = { x: projectile.position.x, y: projectile.position.y, radius: projectile.size / 2 },
                        item = gameObjects.getObject(itemsInGrid[i]);
                    if (item && item.isCreep) {
                        if (ValidateTarget(item.isAir, projectile.targetTypes)) {
                            var object2 = { x: item.position.x, y: item.position.y, radius: item.size / 2 };
                            if (circleCollisionDetection(object1, object2)) {
                                item.hp -= projectile.damage;
                                if (projectile.slow) {
                                    item.slow();
                                }
                                if (projectile.sound) {
                                    PlaySound(projectile.sound);
                                }
                                
                                if (item.hp <= 0) {
                                    /* Creep dies */
                                    
                                    PlaySound('CreepDeath');
                                    
                                    RemoveFromCollisionGrid(item.gridX, item.gridX, item.id);
                                    
                                    particleSystem.CreepDeathExplosion({
                                        center: { x: item.position.x, y: item.position.y }
                                    });
                                    moneyEarned += item.worth;
                                    scoreTotal += item.worth * 2;
                                    creepsDestroyed++;
                                    gameObjects.remove(item.id);
                                    triggerScoreEvent(item.position.x, item.position.y, item.worth);
                                } else {
                                    if (projectile.hitEffect) {
                                        switch (projectile.hitEffect) {
                                            case 'BombHit':
                                                particleSystem.CreateBombHit({
                                                    center: { x: projectile.position.x, y: projectile.position.y }
                                                });
                                                break;
                                            case 'FrostHit':
                                                particleSystem.CreateFrostHit({
                                                    center: { x: item.position.x, y: item.position.y }
                                                });
                                                break;
                                        }
                                    }
                                }
                                RemoveFromCollisionGrid(projectile.gridX, projectile.gridY, projectile.id);
                                gameObjects.remove(projectile.id);
                                return true;
                            }
                        }
                    }
                }
            }
            
            return false;
        }
        
        return that;
    }
    
    function ToggleTowerGrid() {
        towerGridActive = !towerGridActive;
    }
    
    function PlaceTower(x, y) {
        var dx = 0,
            dy = 0,
            tower = gameObjects.getObject(selectedTower);
        
        for (var rows = 0; rows < towerGrid.length; ++rows) {
            if (y < dy + 50) {
                /* the tower is in this row */
                for (var items = 0; items < towerGrid[rows].length; ++items) {
                    if (x < dx + 50) {
                        /* the tower is in the column */
                        if (towerGrid[rows][items] == 0) {
                            //don't allow placement of tower at 0, 6
                            if ((rows == 0) && (items == 6)) {
                                return false;
                            }
                            //don't allow placement of tower at 13, 6
                            if ((rows == 13) && (items == 6)) {
                                return false;
                            }
                            //don't allow placement of tower at 6, 0
                            if ((rows == 6) && (items == 0)) {
                                return false;
                            }
                            //don't allow placement of tower at 6, 13
                            if ((rows == 6) && (items == 13)) {
                                return false;
                            }
                            
                            towerGrid[rows][items] = tower.id;
                            //no horizontal blocks
                            var temp2 = findShortestTopToBottom(6, 0);
                            if (temp2 == null) {
                                towerGrid[rows][items] = 0;
                                return false;
                            }
                            //no vertical blocks
                            var temp3 = findShortestLeftToRight(0, 6);
                            if (temp3 == null) {
                                towerGrid[rows][items] = 0;
                                return false;
                            }
                            //make sure creeps can't be blocked in
                            var objectList = gameObjects.getObjectList();
                            for (var i = 0; i < objectList.length; i++) {
                                //console.log(i);
                                if (objectList[i].isCreep) {
                                    //console.log("checking!");
                                    var temp = null;
                                    var destinationCollecter = objectList[i].destination;
                                    if (destinationCollecter == "bottom") {
                                        temp = findShortestTopToBottom(objectList[i].gridCoordX, objectList[i].gridCoordY);
                                    }
                                    if (destinationCollecter == "top") {
                                        temp = findShortestBottomToTop(objectList[i].gridCoordX, objectList[i].gridCoordY);
                                    }
                                    if (destinationCollecter == "right") {
                                        temp = findShortestLeftToRight(objectList[i].gridCoordX, objectList[i].gridCoordY);
                                    }
                                    if (destinationCollecter == "left") {
                                        temp = findShortestRightToLeft(objectList[i].gridCoordX, objectList[i].gridCoordY);
                                    }
                                    if (temp == null) {
                                        towerGrid[rows][items] = 0;
                                        return false;
                                        //console.log("blockage found!");
                                    }

                                }
                            }
                            tower.useMouse = false;
                            tower.position = { x: dx + 25, y: dy + 25 };
                            tower.size = 40;
                            selectedTower = 0;
                            PlaySound('TowerPlaced');
                            ToggleTowerGrid();
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        dx += 50;
                    }
                }
            } else {
                dy += 50;
            }
        }
        return false;
    }
    
    function Click(x, y) {
        var dx = Math.floor(x / 50),
            dy = Math.floor(y / 50);
        
        selectedTower = towerGrid[dy][dx];
    }
    
    function TrackTower(tower, elapsedTime) {
        var target = gameObjects.getObject(tower.targetId);
        var diffX = target.position.x - tower.position.x;
        var diffY = target.position.y - tower.position.y;
        var angle = Math.atan2(diffY, diffX) * (180 / Math.PI);
        if (angle >= -90) {
            angle += 90;
        }
        else {
            angle += 450;
        }
        var diffAngle = ((tower.rotation * (180 / Math.PI)) % 360) - angle;
        if (diffAngle > 0) {
            tower.rotation -= trackTargetRotationSpeed * (elapsedTime / 1000);
        }      
        else if (diffAngle < 0) {
            tower.rotation += trackTargetRotationSpeed * (elapsedTime / 1000);
        }
        
        return Math.abs(diffAngle) < 20;
    }
    
    function findTarget(tower) {
        var thisTower = { x: tower.position.x, y: tower.position.y, radius: tower.radius },
            needNewTarget = true;
        
        /* Check if have a target already */
        if (tower.targetId != -1) {
            var target = gameObjects.getObject(tower.targetId);
            if (target) {
                var targetCircle = { x: target.position.x, y: target.position.y, radius: target.radius };
                /* Need to check if the current target is still in range */
                needNewTarget = !circleCollisionDetection(targetCircle, thisTower);
            }
        }
        
        if (needNewTarget) {
            tower.targetId = -1;
            var objectList = gameObjects.getObjectList();
            for (var i = 0; i < objectList.length; ++i) {
                /* target types: 0 = ground only, 1 = air only, 2 = both */
                if (objectList[i].isCreep) {
                    if (ValidateTarget(objectList[i].isAir, tower.targetTypes)) {
                        var creep = { x: objectList[i].position.x, y: objectList[i].position.y, radius: objectList[i].size / 2 };
                        if (circleCollisionDetection(creep, thisTower)) {
                            tower.targetId = objectList[i].id;
                            break;
                        }
                    }
                }
            }
        }
    }
    
    function ValidateTarget(isAir, targetTypes) {
        return targetTypes === 2 || (isAir && targetTypes === 1) || (!isAir && targetTypes === 0);
    };
    
    function GameObject(spec) {
        var that = {
            /* x,y coordinate of the GameObject */
            position : spec.useMouse ? { x: 0, y: 0 } : spec.position,
            /* list of gridIds that this GameObject is a member of */
            gridX : 0,
            gridY : 0,
            rotation : 0,
            size : spec.size,
            id : 0,
            useMouse : spec.useMouse
        };
        
        that.removeGridId = function (idToRemove) {
            var index = gridIds.indexOf(idToRemove);
            if (index !== -1)
                gridIds.splice(index, 1);
        }
        
        that.getType = function () {
            return spec.type;
        }
        
        return that;
    };
    
    function DeleteSelectedTower(refund) {
        if (selectedTower != 0) {
            var item = gameObjects.getObject(selectedTower);
            if (item && item.value) {
                moneyEarned += refund ? item.value : Math.floor(item.value / 2);
                towerValues -= refund ? item.value : Math.floor(item.value);
            }
            
            if (!item.useMouse) {
                particleSystem.CreateTowerSold({
                    center: { x: item.position.x, y: item.position.y }
                });
            }
            
            PlaySound('TowerSold');
            gameObjects.remove(selectedTower);
            var tempY = Math.floor(item.position.y / 50);
            var tempX = Math.floor(item.position.x / 50);
            towerGrid[tempY][tempX] = 0;
            selectedTower = 0;
        }
    }
    
    function UpgradeSelectedTower() {
        if (selectedTower != 0) {
            var item = gameObjects.getObject(selectedTower);
            if (item && item.upgradeCost != 0) {
                item.upgrade();
                PlaySound('TowerPlaced');
            }
        }
    }
    
    function UpdateGrid(object, lastCollisionGridX, lastCollisionGridY) {
        var collisionGridX = Math.floor(object.position.x / 100),
            collisionGridY = Math.floor(object.position.y / 100);
        
        if (collisionGridX < 0 || collisionGridY < 0 || collisionGridX > 6 || collisionGridY > 6) {
            RemoveFromCollisionGrid(lastCollisionGridX, lastCollisionGridY, object.id);
        } else {
            if (lastCollisionGridX !== collisionGridX || lastCollisionGridY !== lastCollisionGridY) {
                RemoveFromCollisionGrid(lastCollisionGridX, lastCollisionGridY, object.id);
                collisionGrid[collisionGridY][collisionGridX].push(object.id);
            }
        }
        
        object.gridX = collisionGridX;
        object.gridY = collisionGridY;
    }
    
    function RemoveFromCollisionGrid(x, y, id) {
        if (x < 0) {
            x = 0;
        }
        if (x > 6) {
            x = 6;
        }
        if (y < 0) {
            y = 0;
        }
        if (y > 6) {
            y = 6;
        }
        var index = collisionGrid[y][x].indexOf(id);
        if (index > -1) {
            collisionGrid[y][x].splice(index, 1);
        }
    }
    
    function Projectile(spec) {
        var that = GameObject(spec),
            distanceTraveled = 0,
            speed = spec.speed,
            direction = spec.direction,
            maxRange = spec.maxRange + 60,
            targetId = spec.targetId,
            trail = spec.trail;
        
        that.hitEffect = spec.hitEffect;
        that.targetTypes = spec.targetTypes;
        that.slow = spec.slow;
        that.imageId = spec.imageId;
        that.damage = spec.damage;
        that.sound = spec.sound;
        
        that.update = function (elapsedTime) {
            if (targetId) {
                var target = gameObjects.getObject(targetId);
                if (target) {
                    direction.x = target.position.x - that.position.x;
                    direction.y = target.position.y - that.position.y;
                    var Dp = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
                    direction.x = direction.x / Dp;
                    direction.y = direction.y / Dp;
                }
            }
            
            if (trail) {
                particleSystem.CreateTrail({
                    center: { x: that.position.x, y: that.position.y }
                });
            }
            
            var movementX = speed * (elapsedTime / 1000) * direction.x,
                movementY = speed * (elapsedTime / 1000) * direction.y,
                lastCollisionGridX = Math.floor(that.position.x / 100),
                lastCollisionGridY = Math.floor(that.position.y / 100);
            
            that.position.x += movementX;
            that.position.y += movementY;
            
            UpdateGrid(that, lastCollisionGridX, lastCollisionGridY);
            if (that.position.y >= (700 + that.size / 2) || that.position.y <= -that.size / 2 || that.position.x <= -that.size / 2 || that.position.x >= (800 + that.size / 2)) {
                gameObjects.remove(that.id);
            } else {
                distanceTraveled += Math.abs(movementX) + Math.abs(movementY);
                
                if (!gameObjects.detectCollisions(that) && distanceTraveled >= maxRange) {
                    RemoveFromCollisionGrid(that.gridX, that.gridY, that.id);
                    gameObjects.remove(that.id);
                }
            }
        }
        
        gameObjects.add(that);
    }
    
    function Creep(spec, des) {
        var that = GameObject(spec),
            originalHp = spec.hp,
            spriteSheetId = spec.spriteSheetId,
            timeSlowed = 0,
            isSlowed = false;
        
        
        that.imageId = sprites[spriteSheetId].update(0);
        that.velocity = { x: 1, y: 1 };
        that.speed = spec.speed;
        that.hp = spec.hp;
        that.percentage = 1;
        that.isCreep = true;
        that.isAir = spriteSheetId == 3;
        that.gridCoordX;
        that.gridCoordY;
        that.directionX;
        that.directionY;
        that.nextMove;
        that.imageElapsedTime = 0,
        that.currentId = 0;
        that.destination = des;
        if (spec.spriteSheetId == 1) {
            that.worth = 10;
        }
        if (spec.spriteSheetId == 2) {
            that.worth = 20;
        }
        if (spec.spriteSheetId == 3) {
            that.worth = 15;
        }
        
        //for fly creeps going top
        if (that.destination == "top") {
            that.directionX = 0;
            that.directionY = -1;
        }
        
        //for fly creeps going bottom
        if (that.destination == "bottom") {
            that.directionX = 0;
            that.directionY = 1;
        }
        
        //for fly creeps going east
        if (that.destination == "right") {
            that.directionX = 1;
            that.directionY = 0;
        }
        
        //for fly creeps going west
        if (that.destination == "left") {
            that.directionX = -1;
            that.directionY = 0;
        }
        
        that.update = function (elapsedTime) {
            that.percentage = that.hp / originalHp;
            
            if (isSlowed) {
                console.log(that.speed);
                timeSlowed += elapsedTime;
                if (timeSlowed >= 2000) {
                    timeSlowed = 0;
                    isSlowed = false;
                    that.speed = that.speed * 2;
                }
            }
            
            that.imageElapsedTime += elapsedTime;
            that.imageId = sprites[spriteSheetId].update(that);
            
            that.gridCoordX = Math.floor(that.position.x / 50);
            that.gridCoordY = Math.floor(that.position.y / 50);
            //console.log("current loc: " + that.gridCoordX + " " + that.gridCoordY);
            
            //object is not air so its movements vary based on tower locations
            if (!that.isAir) {
                
                //handles creeps going south
                if (that.destination == "bottom") {
                    //creep reached the bottom of map and needs to be removed
                    if ((that.gridCoordX == 6) && (that.gridCoordY == 15)) {
                        //this is the code that handles the removal of this object
                        gameObjects.remove(that.id);
                        return;
                    }
                    that.nextMove = findShortestTopToBottom(that.gridCoordX, that.gridCoordY);
                }
                
                //handles creeps going north
                if (that.destination == "top") {
                    that.nextMove = findShortestBottomToTop(that.gridCoordX, that.gridCoordY)
                    //creep reached the top of map and need to be removed
                    if ((that.gridCoordX == 6) && (that.gridCoordY == -2)) {
                        //this is the code that handles the removal of this object
                        gameObjects.remove(that.id);
                        return;
                    }
                }
                
                //handles creeps going east
                if (that.destination == "right") {
                    that.nextMove = findShortestLeftToRight(that.gridCoordX, that.gridCoordY)
                    //creep reached the top of map and need to be removed
                    if ((that.gridCoordX == 14) && (that.gridCoordY == 6)) {
                        //this is the code that handles the removal of this object
                        gameObjects.remove(that.id);
                        creepsEscaped++;
                        return;
                    }
                }
                
                //handles creeps going west
                if (that.destination == "left") {
                    that.nextMove = findShortestRightToLeft(that.gridCoordX, that.gridCoordY)
                    //creep reached the top of map and need to be removed
                    if ((that.gridCoordX == -2) && (that.gridCoordY == 6)) {
                        //this is the code that handles the removal of this object
                        gameObjects.remove(that.id);
                        return;
                    }
                }
                
                //if a creeps next move is null there is no reason to do anything else
                if (that.nextMove == null) {
                    return;
                }
                
                //console.log("Next move: " + that.nextMove[1] + " " + that.nextMove[0]);
                that.directionX = that.nextMove[1] - that.gridCoordX;
                //console.log("that.directionX: " + that.directionX);
                that.directionY = that.nextMove[0] - that.gridCoordY;
                //console.log("that.directionY: " + that.directionY);
                
                //these helps the creep stay closer to the center of the square its in (x coords)
                if (that.directionX == 0) {
                    var correction = that.position.x % (that.gridCoordX * 50);
                    if (correction > 30) {
                        that.position.x -= that.speed * (elapsedTime / 1000);
                    }
                    if (correction < 20) {
                        that.position.x += that.speed * (elapsedTime / 1000);
                    }
                }
                
                //these helps the creep stay closer to the center of the square its in (y coords)
                if (that.directionY == 0) {
                    var correction = that.position.y % (that.gridCoordY * 50);
                    if (correction > 30) {
                        that.position.y -= that.speed * (elapsedTime / 1000);
                    }
                    if (correction < 20) {
                        that.position.y += that.speed * (elapsedTime / 1000);
                    }
                }
            }
            
            var lastCollisionGridX = Math.floor(that.position.x / 50),
                lastCollisionGridY = Math.floor(that.position.y / 50);
            
            that.position.x += that.speed * (elapsedTime / 1000) * that.directionX;
            that.position.y += that.speed * (elapsedTime / 1000) * that.directionY;
            
            that.rotation = Math.atan2(that.directionY, that.directionX);
            
            UpdateGrid(that, lastCollisionGridX, lastCollisionGridY);
            
            if (that.position.y >= (700 + that.size / 2) || that.position.y <= -that.size / 2 || that.position.x <= -that.size / 2 || that.position.x >= (700 + that.size / 2)) {
                /* Creep escaped */
                RemoveFromCollisionGrid(that.gridX, that.gridY, that.id);
                gameObjects.remove(that.id);
                creepsEscaped++;
            }
        }
        
        that.slow = function () {
            if (isSlowed) {
                timeSlowed = 0;
            } else {
                isSlowed = true;
                that.speed = that.speed / 2;
            }
        }
        
        gameObjects.add(that);
    }
    
    function Turret(spec) {
        if (moneyEarned >= 100) {
            moneyEarned -= 100;
            towerValues += 100;
            var that = GameObject(spec),
                defaultRotationSpeed = Math.PI * .3,
                lastFiredElapsedTime = 0,
                upgradeLevel = 1;
            
            that.imageId = 'T1';
            that.fireRate = .25;
            that.damage = 3;
            that.targetTypes = 2;
            that.radius = 100;
            that.targetId = -1;
            that.value = 100;
            that.upgradeCost = 75;
            
            that.update = function (elapsedTime) {
                findTarget(that);
                if (that.targetId == -1) {
                    that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
                } else {
                    lastFiredElapsedTime += (elapsedTime / 1000);
                    if (TrackTower(that, elapsedTime) && lastFiredElapsedTime >= that.fireRate) {
                        lastFiredElapsedTime = 0;
                        
                        PlaySound('TurretFiring');
                        
                        Projectile({
                            position : { x: that.position.x, y: that.position.y },
                            size : 5,
                            speed : 150,
                            direction : { x: Math.cos(that.rotation - Math.PI / 2), y: Math.sin(that.rotation - Math.PI / 2) },
                            maxRange : that.radius,
                            imageId : 'TurretShot',
                            damage : that.damage,
                            targetTypes : that.targetTypes
                        });
                    }
                }
            }
            
            that.upgrade = function () {
                if (moneyEarned >= that.upgradeCost) {
                    moneyEarned -= that.upgradeCost;
                    towerValues += that.upgradeCost;
                    that.imageId = 'T' + ++upgradeLevel;
                    that.damage += 2;
                    that.radius += 25;
                    that.value += that.upgradeCost;
                    that.upgradeCost += 75;
                    
                    if (upgradeLevel == 3) {
                        that.upgradeCost = 0;
                    }
                }
            }
            
            gameObjects.add(that);
            selectedTower = that.id;
            return true;
        } else { return false; }
    }
    
    function Missile(spec) {
        if (moneyEarned >= 150) {
            moneyEarned -= 150;
            towerValues += 150;
            var that = GameObject(spec),
                defaultRotationSpeed = Math.PI * .75,
                lastFiredElapsedTime = 0,
                upgradeLevel = 1;
            
            that.imageId = 'M1';
            that.fireRate = 1;
            that.damage = 5;
            that.targetTypes = 1;
            that.radius = 300;
            that.targetId = -1;
            that.value = 150;
            that.upgradeCost = 125;
            
            that.update = function (elapsedTime) {
                findTarget(that);
                if (that.targetId == -1) {
                    that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
                } else {
                    lastFiredElapsedTime += (elapsedTime / 1000);
                    if (TrackTower(that, elapsedTime) && lastFiredElapsedTime >= that.fireRate) {
                        lastFiredElapsedTime = 0;
                        
                        PlaySound('MissileFiring');
                        
                        Projectile({
                            position : { x: that.position.x, y: that.position.y },
                            size : 15,
                            speed : 100,
                            direction : { x: Math.cos(that.rotation - Math.PI / 2), y: Math.sin(that.rotation - Math.PI / 2) },
                            maxRange : 800,
                            imageId : 'MissileShot',
                            damage : that.damage,
                            targetTypes : that.targetTypes,
                            targetId : that.targetId,
                            trail : true
                        });
                    }
                }
                
            }
            
            that.upgrade = function () {
                if (moneyEarned >= that.upgradeCost) {
                    moneyEarned -= that.upgradeCost;
                    towerValues += that.upgradeCost;
                    that.imageId = 'M' + ++upgradeLevel;
                    that.damage += 4;
                    that.radius += 75;
                    that.value += that.upgradeCost;
                    that.upgradeCost += 100;
                    
                    if (upgradeLevel == 3) {
                        that.upgradeCost = 0;
                    }
                }
            }
            
            gameObjects.add(that);
            selectedTower = that.id;
            return true;
        } else { return false; }
    }
    
    function Bomb(spec) {
        if (moneyEarned >= 200) {
            moneyEarned -= 200;
            towerValues += 200;
            var that = GameObject(spec),
                defaultRotationSpeed = Math.PI * .2,
                lastFiredElapsedTime = 0,
                upgradeLevel = 1;
            
            that.imageId = 'B1';
            that.fireRate = 3;
            that.damage = 20;
            that.targetTypes = 0;
            that.radius = 250;
            that.targetId = -1;
            that.value = 200;
            that.upgradeCost = 175;
            
            that.update = function (elapsedTime) {
                findTarget(that);
                if (that.targetId == -1) {
                    that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
                } else {
                    lastFiredElapsedTime += (elapsedTime / 1000);
                    if (TrackTower(that, elapsedTime) && lastFiredElapsedTime >= that.fireRate) {
                        lastFiredElapsedTime = 0;
                        
                        PlaySound('BombFiring');
                        
                        Projectile({
                            position : { x: that.position.x, y: that.position.y },
                            size : 20,
                            speed : 70,
                            direction : { x: Math.cos(that.rotation - Math.PI / 2), y: Math.sin(that.rotation - Math.PI / 2) },
                            maxRange : that.radius,
                            imageId : 'BombShot',
                            damage : that.damage,
                            targetTypes : that.targetTypes,
                            sound : 'BombHits',
                            hitEffect : 'BombHit',
                            trail : true
                        });
                    }
                }
            }
            
            that.upgrade = function () {
                if (moneyEarned >= that.upgradeCost) {
                    moneyEarned -= that.upgradeCost;
                    towerValues += that.upgradeCost;
                    that.imageId = 'B' + ++upgradeLevel;
                    that.damage += 10;
                    that.radius += 50;
                    that.value += that.upgradeCost;
                    that.upgradeCost += 125;
                    
                    if (upgradeLevel == 3) {
                        that.upgradeCost = 0;
                    }
                }
            }
            
            gameObjects.add(that);
            selectedTower = that.id;
            return true;
        } else { return false; }
    }
    
    function Frost(spec) {
        if (moneyEarned >= 125) {
            moneyEarned -= 125;
            towerValues += 125;
            var that = GameObject(spec),
                defaultRotationSpeed = Math.PI * .5,
                lastFiredElapsedTime = 0,
                upgradeLevel = 1;
            
            that.imageId = 'F1';
            that.fireRate = 1;
            that.damage = 2;
            that.targetTypes = 0;
            that.radius = 125;
            that.targetId = -1;
            that.value = 125;
            that.upgradeCost = 100;
            
            that.update = function (elapsedTime) {
                if (!that.useMouse)
                    findTarget(that);
                
                if (that.targetId == -1) {
                    that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
                } else {
                    lastFiredElapsedTime += (elapsedTime / 1000);
                    if (TrackTower(that, elapsedTime) && lastFiredElapsedTime >= that.fireRate) {
                        lastFiredElapsedTime = 0;
                        
                        PlaySound('FrostFiring');
                        
                        Projectile({
                            position : { x: that.position.x, y: that.position.y },
                            size : 10,
                            speed : 70,
                            direction : { x: Math.cos(that.rotation - Math.PI / 2), y: Math.sin(that.rotation - Math.PI / 2) },
                            maxRange : that.radius,
                            imageId : 'FrostShot',
                            damage : that.damage,
                            targetTypes : that.targetTypes,
                            hitEffect : 'FrostHit',
                            slow : true
                        });
                    }
                }
                
            }
            
            that.upgrade = function () {
                if (moneyEarned >= that.upgradeCost) {
                    moneyEarned -= that.upgradeCost;
                    towerValues += that.upgradeCost;
                    that.imageId = 'F' + ++upgradeLevel;
                    that.damage += 3;
                    that.radius += 20;
                    that.value += that.upgradeCost;
                    that.upgradeCost += 75;
                    
                    if (upgradeLevel == 3) {
                        that.upgradeCost = 0;
                    }
                }
            }
            
            gameObjects.add(that);
            
            selectedTower = that.id;
            return true;
        } else { return false; }
    }
    
    function clearGame() {
        var scoreObject = {
            totalScore : scoreTotal + moneyEarned + creepsDestroyed - towerValues + (currentLevel * 10 + 1) + (currentWave + 1) - (creepsEscaped * 10),
            remainingFunds : moneyEarned,
            creepsDestroyed : creepsDestroyed,
            towerValues : towerValues,
            levelReached : currentLevel + 1,
            waveReached : currentWave + 1,
            remainingLives : 30 - creepsEscaped
            },
            highScores = localStorage.getItem('HighScores-All');

        if (highScores !== null) {
            highScores = JSON.parse(highScores);
        } else {
            highScores = [];
        }

        highScores.push(scoreObject);
        localStorage['HighScores-All'] = JSON.stringify(highScores);
    }
    
    function UpdateAll(elapsedTime) {
        if (!gameLost) {
            var objectList = gameObjects.getObjectList();
            for (var i = 0; i < objectList.length; ++i) {
                objectList[i].update(elapsedTime);
            }
            particleSystem.update(elapsedTime);
            for (var a = 0; a < renderEvent.length; ++a) {
                renderEvent[a][3] -= 1;
                if (renderEvent[a][3] <= 0) {
                    renderEvent.splice(a, 1);
                }
            }
            if (creepsEscaped >= 30) {
                gameLost = true;
                clearGame();
            }
        }
    }
    
    function RenderAll() {
        graphics.clearCanvas();
        graphics.drawStaticObjects();
        graphics.drawMoney(moneyEarned, scoreTotal, currentLevel + 1, currentWave, 30 - creepsEscaped);
        graphics.drawMoneyFloat(renderEvent);
        
        if (towerGridActive) {
            graphics.drawGrid({
                grid : towerGrid,
                size : 50
            });
        }
        
        var objectList = gameObjects.getObjectList();
        for (var i = 0; i < objectList.length; ++i) {
            var obj = objectList[i];
            graphics.drawGameObject({
                useMouse : obj.useMouse,
                position : obj.position,
                rotation : obj.rotation,
                size : obj.size,
                imageId : obj.imageId,
                radius : obj.radius,
                percentage : obj.percentage,
                towerGridActive : towerGridActive,
                isSelected : selectedTower == obj.id
            });
        }
        particleSystem.render();
        
        if (selectedTower != 0) {
            var tower = gameObjects.getObject(selectedTower);
            
            graphics.drawSelectedTower({
                type : tower.getType(),
                damage : tower.damage,
                fireRate : tower.fireRate,
                upgradeCost : tower.upgradeCost
            });
        }
        
        if (!gameLive) {
            //render start game message
            graphics.drawGameStartMessage();
        }
        
        if (gameLost) {
            graphics.drawGameLostMessage();
            window.setTimeout(function () { window.location = window.location; }, 3000);
        }
    }
    
    function circleCollisionDetection(circle1, circle2) {
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < circle1.radius + circle2.radius;
    }
    
    function findShortestTopToBottom(currentX, currentY) {
        if ((currentX === undefined) || (currentY === undefined)) {
            return null;
        }
        //this code is when the creep has made it to the final square and now needs to exit the game
        if ((currentX == 6) && (currentY == 13)) {
            //console.log("special case 1");
            return [14, 6];
        }
        //the creep is offically off the grid, but still appears on the screen
        //the code below continues the animation so the creep will move off the screen completely 
        if ((currentX == 6) && (currentY == 14)) {
            //console.log("special case 2");
            return [15, 6];
        }
        //creates a new 2d array of objects that are used for BFS
        //searchArray contains the objects that correspond to towerGrid array
        var searchArry = [];
        var pathArray = [];
        for (var x = 0; x < towerGrid.length; x++) {
            var temp = [];
            for (var y = 0; y < towerGrid[x].length; y++) {
                var node = { posX: x, posY: y, pre: "null", visited: false, dis: 1000000 };
                temp.push(node);
            }
            searchArry.push(temp);
        }
        
        //this is where the BFS happens
        var searchQueue = [];
        searchArry[currentY][currentX].dis = 0; // it looks like its backwards for the x and y here but its not
        searchQueue.push(searchArry[currentY][currentX]);
        while (searchQueue.length != 0) {
            var node = searchQueue[0];
            searchQueue.splice(0, 1);
            node.visited = true;
            if (node.posX + 1 <= 13) {
                //check down
                if ((!searchArry[node.posX + 1][node.posY].visited) && (towerGrid[node.posX + 1][node.posY] == 0)) {
                    if (searchArry[node.posX + 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX + 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX + 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX + 1][node.posY]);
                    }
                }
            }
            if (node.posX - 1 >= 0) {
                //check up
                if ((!searchArry[node.posX - 1][node.posY].visited) && (towerGrid[node.posX - 1][node.posY] == 0)) {
                    if (searchArry[node.posX - 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX - 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX - 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX - 1][node.posY]);
                    }
                }
            }
            if (node.posY + 1 <= 13) {
                //check right
                if ((!searchArry[node.posX][node.posY + 1].visited) && (towerGrid[node.posX][node.posY + 1] == 0)) {
                    if (searchArry[node.posX][node.posY + 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY + 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY + 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY + 1]);
                    }
                }
            }
            if (node.posY - 1 >= 0) {
                //check left
                if ((!searchArry[node.posX][node.posY - 1].visited) && (towerGrid[node.posX][node.posY - 1] == 0)) {
                    if (searchArry[node.posX][node.posY - 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY - 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY - 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY - 1]);
                    }
                   
                }
            }
        }
        
        pathArray.push([13, 6]);
        //output of shortest path to endNode
        var endNode = searchArry[13][6];
        if (endNode.pre == "null") {
            //this is stuff happens if a creep's path had been blocked
            return null;
        }
        //console.log("shortest path to [13][6] is...");
        while (endNode.pre != "null") {
            endNode = endNode.pre;
            //console.log("[" + endNode.posX + "," + endNode.posY + "] " + endNode.dis);
            pathArray.splice(0, 0, [endNode.posX, endNode.posY]);
        }
        //return next array to move to 
        return pathArray[1];
    }
    
    function findShortestBottomToTop(currentX, currentY) {
        if ((currentX === undefined) || (currentY === undefined)) {
            return null;
        }
        //this code is when the creep has made it to the final square and now needs to exit the game
        if ((currentX == 6) && (currentY == 0)) {
            //console.log("special case 1");
            return [-1, 6];
        }
        //the creep is offically off the grid, but still appears on the screen
        //the code below continues the animation so the creep will move off the screen completely 
        if ((currentX == 6) && (currentY == -1)) {
            //console.log("special case 2");
            return [-2, 6];
        }
        //creates a new 2d array of objects that are used for BFS
        //searchArray contains the objects that correspond to towerGrid array
        var searchArry = [];
        var pathArray = [];
        for (var x = 0; x < towerGrid.length; x++) {
            var temp = [];
            for (var y = 0; y < towerGrid[x].length; y++) {
                var node = { posX: x, posY: y, pre: "null", visited: false, dis: 1000000 };
                temp.push(node);
            }
            searchArry.push(temp);
        }
        
        //this is where the BFS happens
        var searchQueue = [];
        searchArry[currentY][currentX].dis = 0; // it looks like its backwards for the x and y here but its not
        searchQueue.push(searchArry[currentY][currentX]);
        while (searchQueue.length != 0) {
            var node = searchQueue[0];
            searchQueue.splice(0, 1);
            node.visited = true;
            if (node.posX + 1 <= 13) {
                //check down
                if ((!searchArry[node.posX + 1][node.posY].visited) && (towerGrid[node.posX + 1][node.posY] == 0)) {
                    if (searchArry[node.posX + 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX + 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX + 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX + 1][node.posY]);
                    }
                }
            }
            if (node.posX - 1 >= 0) {
                //check up
                if ((!searchArry[node.posX - 1][node.posY].visited) && (towerGrid[node.posX - 1][node.posY] == 0)) {
                    if (searchArry[node.posX - 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX - 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX - 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX - 1][node.posY]);
                    }
                }
            }
            if (node.posY + 1 <= 13) {
                //check right
                if ((!searchArry[node.posX][node.posY + 1].visited) && (towerGrid[node.posX][node.posY + 1] == 0)) {
                    if (searchArry[node.posX][node.posY + 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY + 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY + 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY + 1]);
                    }
                }
            }
            if (node.posY - 1 >= 0) {
                //check left
                if ((!searchArry[node.posX][node.posY - 1].visited) && (towerGrid[node.posX][node.posY - 1] == 0)) {
                    if (searchArry[node.posX][node.posY - 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY - 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY - 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY - 1]);
                    }
                   
                }
            }
        }
        
        pathArray.push([0, 6]);
        //output of shortest path to endNode
        var endNode = searchArry[0][6];
        if (endNode.pre == "null") {
            //this is stuff happens if a creep's path had been blocked
            return null;
        }
        //console.log("shortest path to [13][6] is...");
        while (endNode.pre != "null") {
            endNode = endNode.pre;
            //console.log("[" + endNode.posX + "," + endNode.posY + "] " + endNode.dis);
            pathArray.splice(0, 0, [endNode.posX, endNode.posY]);
        }
        //return next array to move to 
        return pathArray[1];
    }
    
    function findShortestLeftToRight(currentX, currentY) {
        if ((currentX === undefined) || (currentY === undefined)) {
            return null;
        }
        //this code is when the creep has made it to the final square and now needs to exit the game
        if ((currentX == 13) && (currentY == 6)) {
            //console.log("special case 1");
            return [6, 14];
        }
        //the creep is offically off the grid, but still appears on the screen
        //the code below continues the animation so the creep will move off the screen completely 
        if ((currentX == 14) && (currentY == 6)) {
            //console.log("special case 2");
            return [6, 15];
        }
        //creates a new 2d array of objects that are used for BFS
        //searchArray contains the objects that correspond to towerGrid array
        var searchArry = [];
        var pathArray = [];
        for (var x = 0; x < towerGrid.length; x++) {
            var temp = [];
            for (var y = 0; y < towerGrid[x].length; y++) {
                var node = { posX: x, posY: y, pre: "null", visited: false, dis: 1000000 };
                temp.push(node);
            }
            searchArry.push(temp);
        }
        
        //this is where the BFS happens
        var searchQueue = [];
        searchArry[currentY][currentX].dis = 0; // it looks like its backwards for the x and y here but its not
        searchQueue.push(searchArry[currentY][currentX]);
        while (searchQueue.length != 0) {
            var node = searchQueue[0];
            searchQueue.splice(0, 1);
            node.visited = true;
            if (node.posX + 1 <= 13) {
                //check down
                if ((!searchArry[node.posX + 1][node.posY].visited) && (towerGrid[node.posX + 1][node.posY] == 0)) {
                    if (searchArry[node.posX + 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX + 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX + 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX + 1][node.posY]);
                    }
                }
            }
            if (node.posX - 1 >= 0) {
                //check up
                if ((!searchArry[node.posX - 1][node.posY].visited) && (towerGrid[node.posX - 1][node.posY] == 0)) {
                    if (searchArry[node.posX - 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX - 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX - 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX - 1][node.posY]);
                    }
                }
            }
            if (node.posY + 1 <= 13) {
                //check right
                if ((!searchArry[node.posX][node.posY + 1].visited) && (towerGrid[node.posX][node.posY + 1] == 0)) {
                    if (searchArry[node.posX][node.posY + 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY + 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY + 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY + 1]);
                    }
                }
            }
            if (node.posY - 1 >= 0) {
                //check left
                if ((!searchArry[node.posX][node.posY - 1].visited) && (towerGrid[node.posX][node.posY - 1] == 0)) {
                    if (searchArry[node.posX][node.posY - 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY - 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY - 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY - 1]);
                    }
                   
                }
            }
        }
        
        pathArray.push([6, 13]);
        //output of shortest path to endNode
        var endNode = searchArry[6][13];
        if (endNode.pre == "null") {
            //this is stuff happens if a creep's path had been blocked
            return null;
        }
        //console.log("shortest path to [13][6] is...");
        while (endNode.pre != "null") {
            endNode = endNode.pre;
            //console.log("[" + endNode.posX + "," + endNode.posY + "] " + endNode.dis);
            pathArray.splice(0, 0, [endNode.posX, endNode.posY]);
        }
        //return next array to move to 
        return pathArray[1];
    }
    
    function findShortestRightToLeft(currentX, currentY) {
        if ((currentX === undefined) || (currentY === undefined)) {
            return null;
        }
        //this code is when the creep has made it to the final square and now needs to exit the game
        if ((currentX == 0) && (currentY == 6)) {
            //console.log("special case 1");
            return [6, -1];
        }
        //the creep is offically off the grid, but still appears on the screen
        //the code below continues the animation so the creep will move off the screen completely 
        if ((currentX == -1) && (currentY == 6)) {
            //console.log("special case 2");
            return [6, -2];
        }
        //creates a new 2d array of objects that are used for BFS
        //searchArray contains the objects that correspond to towerGrid array
        var searchArry = [];
        var pathArray = [];
        for (var x = 0; x < towerGrid.length; x++) {
            var temp = [];
            for (var y = 0; y < towerGrid[x].length; y++) {
                var node = { posX: x, posY: y, pre: "null", visited: false, dis: 1000000 };
                temp.push(node);
            }
            searchArry.push(temp);
        }
        
        //this is where the BFS happens
        var searchQueue = [];
        searchArry[currentY][currentX].dis = 0; // it looks like its backwards for the x and y here but its not
        searchQueue.push(searchArry[currentY][currentX]);
        while (searchQueue.length != 0) {
            var node = searchQueue[0];
            searchQueue.splice(0, 1);
            node.visited = true;
            if (node.posX + 1 <= 13) {
                //check down
                if ((!searchArry[node.posX + 1][node.posY].visited) && (towerGrid[node.posX + 1][node.posY] == 0)) {
                    if (searchArry[node.posX + 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX + 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX + 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX + 1][node.posY]);
                    }
                }
            }
            if (node.posX - 1 >= 0) {
                //check up
                if ((!searchArry[node.posX - 1][node.posY].visited) && (towerGrid[node.posX - 1][node.posY] == 0)) {
                    if (searchArry[node.posX - 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX - 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX - 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX - 1][node.posY]);
                    }
                }
            }
            if (node.posY + 1 <= 13) {
                //check right
                if ((!searchArry[node.posX][node.posY + 1].visited) && (towerGrid[node.posX][node.posY + 1] == 0)) {
                    if (searchArry[node.posX][node.posY + 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY + 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY + 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY + 1]);
                    }
                }
            }
            if (node.posY - 1 >= 0) {
                //check left
                if ((!searchArry[node.posX][node.posY - 1].visited) && (towerGrid[node.posX][node.posY - 1] == 0)) {
                    if (searchArry[node.posX][node.posY - 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY - 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY - 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY - 1]);
                    }
                   
                }
            }
        }
        
        pathArray.push([6, 0]);
        //output of shortest path to endNode
        var endNode = searchArry[6][0];
        if (endNode.pre == "null") {
            //this is stuff happens if a creep's path had been blocked
            return null;
        }
        //console.log("shortest path to [6][0] is...");
        while (endNode.pre != "null") {
            endNode = endNode.pre;
            //console.log("[" + endNode.posX + "," + endNode.posY + "] " + endNode.dis);
            pathArray.splice(0, 0, [endNode.posX, endNode.posY]);
        }
        //return next array to move to 
        return pathArray[1];
    }
    
    /* Initialize */
    gameObjects = GameObjects();
    GenerateSpritesList();
    
    var temp = [],
        temp2 = [],
        rows = 14,
        cols = 14;
    
    for (var x = 0; x < rows; x++) {
        temp = [];
        for (var y = 0; y < cols; y++) {
            temp[y] = 0;
        }
        towerGrid.push(temp);
    }
    
    for (var i = 0; i < rows / 2; ++i) {
        temp2 = [];
        for (var k = 0; k < cols / 2; ++k) {
            temp2[k] = [];
        }
        collisionGrid.push(temp2);
    }
    
    graphics.drawStaticObjects();
    moneyEarned = 500;
    
    PlaySound('ThemeMusic', true);
    
    return {
        Turret : Turret,
        Missile : Missile,
        Bomb : Bomb,
        Frost : Frost,
        Creep : Creep,
        UpdateAll : UpdateAll,
        RenderAll : RenderAll,
        ToggleTowerGrid : ToggleTowerGrid,
        DeleteSelectedTower : DeleteSelectedTower,
        PlaceTower : PlaceTower,
        startNextLevel: startNextLevel,
        Click : Click,
        UpgradeSelectedTower : UpgradeSelectedTower
    };

}(MyGame.graphics, MyGame.particles));