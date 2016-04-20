MyGame.GameObjects = (function (graphics, particleSystem) {
    'use strict';
    
    var gameObjects = {},
        towerGridActive = false,
        towerGrid = [],
        collisionGrid = [],
        selectedTower = 0,
        trackTargetRotationSpeed = Math.PI,
        sprites = {};
    
    function SpriteObject(spec) {
        var that = {},
            imageIds = spec.imageIds,
            imageTimes = spec.imageTimes;

        that.update = function (creep){
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
                                //console.log('Creep hit! ' + item.hp + ' hp remaining');
                                if (item.hp <= 0) {
                                    /* Creep dies */
                                    particleSystem.CreepDeathExplosion({
                                        center: { x: item.position.x, y: item.position.y }
                                    });
                                    gameObjects.remove(item.id);
                                }
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
            dy = 0;
        
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
                            towerGrid[rows][items] = 1;
                            var temp2 = findShortestTopToBottom(0, 6);
                            if (temp2 == null) {
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
                                    temp = findShortestTopToBottom(objectList[i].gridCoordX, objectList[i].gridCoordY);
                                    if (temp == null) {
                                        towerGrid[rows][items] = 0;
                                        return false;
                                        //console.log("blockage found!");
                                    }

                                }
                            }
                            //uncomment lines below to dipslay shortest paths
                            //findShortestLeftToRight();
                            //findShortestTopToBottom();
                            var tower = gameObjects.getObject(selectedTower);
                            tower.useMouse = false;
                            tower.position = { x: dx + 25, y: dy + 25 };
                            tower.size = 40;
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
        
        return diffAngle < 15;
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
    
    function ValidateTarget(isAir, targetTypes){
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
    
    function DeleteSelectedTower() {
        gameObjects.remove(selectedTower);
        selectedTower = 0;
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
            maxRange = spec.maxRange;
        
        that.targetTypes = spec.targetTypes;
        that.imageId = spec.imageId;
        that.damage = spec.damage;
        
        that.update = function (elapsedTime) {
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
                distanceTraveled += movementX + movementY;
                
                if (!gameObjects.detectCollisions(that) && distanceTraveled >= maxRange) {
                    gameObjects.remove(that.id);
                }
            }
        }
        
        gameObjects.add(that);
    }
    
    function Creep(spec) {
        var that = GameObject(spec),
            originalHp = spec.hp,
            spriteSheetId = spec.spriteSheetId;
        
        
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
        
        //{ x: 325, y: 0 }
        if (that.position.x === 325 && that.position.y === 0) {
            that.directionX = 0;
            that.directionY = 1;
        }
        
        that.update = function (elapsedTime) {
            that.percentage = that.hp / originalHp;
            
            that.imageElapsedTime += elapsedTime;
            that.imageId = sprites[spriteSheetId].update(that);
            
            that.gridCoordX = Math.floor(that.position.x / 50);
            that.gridCoordY = Math.floor(that.position.y / 50);
            //console.log("current loc: " + that.gridCoordX + " " + that.gridCoordY);
            if ((that.gridCoordX == 6) && (that.gridCoordY == 15)) {
                //this is the code that handles the removal of this object
                gameObjects.remove(that.id);
                return;
            }
            if (!that.isAir) {
                that.nextMove = findShortestTopToBottom(that.gridCoordX, that.gridCoordY);
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
            
            that.rotation = Math.atan(that.directionY / that.directionX);
            
            UpdateGrid(that, lastCollisionGridX, lastCollisionGridY);
            
            if (that.position.y >= (700 + that.size / 2) || that.position.y <= -that.size / 2 || that.position.x <= -that.size / 2 || that.position.x >= (800 + that.size / 2)) {
                /* Creep escaped */
                gameObjects.remove(that.id);
            }
        }
        
        gameObjects.add(that);
    }
    
    function Turret(spec) {
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .3,
            lastFiredElapsedTime = 0;
        
        that.imageId = 'T1';
        that.fireRate = .25;
        that.damage = 3;
        that.targetTypes = 2;
        that.radius = 100;
        that.targetId = -1;
        
        that.update = function (elapsedTime) {
            findTarget(that);
            if (that.targetId == -1) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                lastFiredElapsedTime += (elapsedTime / 1000);
                if (TrackTower(that, elapsedTime) && lastFiredElapsedTime >= that.fireRate) {
                    lastFiredElapsedTime = 0;
                    
                    Projectile({
                        position : { x: that.position.x, y: that.position.y },
                        size : 10,
                        speed : 150,
                        direction : { x: Math.cos(that.rotation - Math.PI / 2), y: Math.sin(that.rotation - Math.PI / 2) },
                        maxRange : that.radius,
                        imageId : 'P1',
                        damage : that.damage,
                        targetTypes : that.targetTypes
                    });
                }
            }
        }
        
        gameObjects.add(that);
        selectedTower = that.id;
    }
    
    function Missile(spec) {
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .75,
            lastFiredElapsedTime = 0;
        
        that.imageId = 'M1';
        that.fireRate = 1;
        that.damage = 5;
        that.targetTypes = 1;
        that.radius = 150;
        that.targetId = -1;
        
        that.update = function (elapsedTime) {
            findTarget(that);
            if (that.targetId == -1) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                lastFiredElapsedTime += (elapsedTime / 1000);
                if (TrackTower(that, elapsedTime) && lastFiredElapsedTime >= that.fireRate) {
                    lastFiredElapsedTime = 0;
                    
                    Projectile({
                        position : { x: that.position.x, y: that.position.y },
                        size : 10,
                        speed : 100,
                        direction : { x: Math.cos(that.rotation - Math.PI / 2), y: Math.sin(that.rotation - Math.PI / 2) },
                        maxRange : that.radius,
                        imageId : 'P1',
                        damage : that.damage,
                        targetTypes : that.targetTypes
                    });
                }
            }
                
        }
        
        gameObjects.add(that);
        selectedTower = that.id;
    }
    
    function Bomb(spec) {
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .2,
            lastFiredElapsedTime = 0;
        
        that.imageId = 'B1';
        that.fireRate = 3;
        that.damage = 20;
        that.targetTypes = 0;
        that.radius = 250;
        that.targetId = -1;
        
        that.update = function (elapsedTime) {
            findTarget(that);
            if (that.targetId == -1) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                lastFiredElapsedTime += (elapsedTime / 1000);
                if (TrackTower(that, elapsedTime) && lastFiredElapsedTime >= that.fireRate) {
                    lastFiredElapsedTime = 0;
                    
                    Projectile({
                        position : { x: that.position.x, y: that.position.y },
                        size : 10,
                        speed : 70,
                        direction : { x: Math.cos(that.rotation - Math.PI / 2), y: Math.sin(that.rotation - Math.PI / 2) },
                        maxRange : that.radius,
                        imageId : 'P1',
                        damage : that.damage,
                        targetTypes : that.targetTypes
                    });
                }
            }
        }
        
        gameObjects.add(that);
        selectedTower = that.id;
    }
    
    function Frost(spec) {
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .5,
            lastFiredElapsedTime = 0;
        
        that.imageId = 'F1';
        that.fireRate = 1;
        that.damage = 5;
        that.targetTypes = 0;
        that.radius = 100;
        that.targetId = -1;
        
        that.update = function (elapsedTime) {
            if (!that.useMouse)
                findTarget(that);
            
            if (that.targetId == -1) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                lastFiredElapsedTime += (elapsedTime / 1000);
                if (TrackTower(that, elapsedTime) && lastFiredElapsedTime >= that.fireRate) {
                    lastFiredElapsedTime = 0;
                    
                    Projectile({
                        position : { x: that.position.x, y: that.position.y },
                        size : 10,
                        speed : 70,
                        direction : { x: Math.cos(that.rotation - Math.PI / 2), y: Math.sin(that.rotation - Math.PI / 2) },
                        maxRange : that.radius,
                        imageId : 'P1',
                        damage : that.damage,
                        targetTypes : that.targetTypes
                    });
                }
            }
                
        }
        
        gameObjects.add(that);
        
        selectedTower = that.id;
    }
    
    function UpdateAll(elapsedTime) {
        var objectList = gameObjects.getObjectList();
        for (var i = 0; i < objectList.length; ++i) {
            objectList[i].update(elapsedTime);
        }
        particleSystem.update(elapsedTime);
    }
    
    function RenderAll() {
        graphics.clearCanvas();
        graphics.drawStaticObjects();
        
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
                towerGridActive : towerGridActive
            });
        }

        particleSystem.render();
    }
    
    function circleCollisionDetection(circle1, circle2) {
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < circle1.radius + circle2.radius;
    }
    
    function findShortestTopToBottom(currentX, currentY) {
        //this code is when the creep has made it to the final square and now needs to exit the game
        if ((currentX == 6) && (currentY == 13)) {
            return [14, 6];
            console.log("special case");
        }
        //the creep is offically off the grid, but still appears on the screen
        //the code below continues the animation so the creep will move off the screen completely 
        if ((currentX == 6) && (currentY == 14)) {
            return [15, 6];
            console.log("special case");
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
                if ((!searchArry[node.posX + 1][node.posY].visited) && (towerGrid[node.posX + 1][node.posY] != 1)) {
                    if (searchArry[node.posX + 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX + 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX + 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX + 1][node.posY]);
                    }
                }
            }
            if (node.posX - 1 >= 0) {
                //check up
                if ((!searchArry[node.posX - 1][node.posY].visited) && (towerGrid[node.posX - 1][node.posY] != 1)) {
                    if (searchArry[node.posX - 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX - 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX - 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX - 1][node.posY]);
                    }
                }
            }
            if (node.posY + 1 <= 13) {
                //check right
                if ((!searchArry[node.posX][node.posY + 1].visited) && (towerGrid[node.posX][node.posY + 1] != 1)) {
                    if (searchArry[node.posX][node.posY + 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY + 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY + 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY + 1]);
                    }
                }
            }
            if (node.posY - 1 >= 0) {
                //check left
                if ((!searchArry[node.posX][node.posY - 1].visited) && (towerGrid[node.posX][node.posY - 1] != 1)) {
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
    
    function findShortestLeftToRight() {
        //creates a new 2d array of objects that are used for BFS
        //searchArray contains the objects that correspond to towerGrid array
        var searchArry = [];
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
        searchArry[6][0].dis = 0;
        searchQueue.push(searchArry[6][0]);
        while (searchQueue.length != 0) {
            var node = searchQueue[0];
            searchQueue.splice(0, 1);
            node.visited = true;
            if (node.posX + 1 <= 13) {
                //check down
                if ((!searchArry[node.posX + 1][node.posY].visited) && (towerGrid[node.posX + 1][node.posY] != 1)) {
                    if (searchArry[node.posX + 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX + 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX + 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX + 1][node.posY]);
                    }
                }
            }
            if (node.posX - 1 >= 0) {
                //check up
                if ((!searchArry[node.posX - 1][node.posY].visited) && (towerGrid[node.posX - 1][node.posY] != 1)) {
                    if (searchArry[node.posX - 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX - 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX - 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX - 1][node.posY]);
                    }
                }
            }
            if (node.posY + 1 <= 13) {
                //check right
                if ((!searchArry[node.posX][node.posY + 1].visited) && (towerGrid[node.posX][node.posY + 1] != 1)) {
                    if (searchArry[node.posX][node.posY + 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY + 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY + 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY + 1]);
                    }
                }
            }
            if (node.posY - 1 >= 0) {
                //check left
                if ((!searchArry[node.posX][node.posY - 1].visited) && (towerGrid[node.posX][node.posY - 1] != 1)) {
                    if (searchArry[node.posX][node.posY - 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY - 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY - 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY - 1]);
                    }
                   
                }
            }
        }
        
        //output of shortest path to endNode
        var endNode = searchArry[6][13];
        console.log("shortest path to [6][13] is...");
        while (endNode.pre != "null") {
            endNode = endNode.pre;
            console.log("[" + endNode.posX + "," + endNode.posY + "] " + endNode.dis);
        }
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
    

    
    //adds creep
    //needs to be replaced with a way to continuously introduce new creeps
   setInterval(function () {
        Creep({
            position : { x: 325, y: 0 },
            size : 30,
            spriteSheetId : 1,
            speed : 30,
            hp : 30
        });
    }, 3000); 
    setInterval(function () {
        Creep({
            position : { x: 325, y: 0 },
            size : 30,
            spriteSheetId : 3,
            speed : 20,
            hp : 60
        });
    }, 4000);
    setInterval(function () {
        Creep({
            position : { x: 325, y: 0 },
            size : 30,
            spriteSheetId : 2,
            speed : 15,
            hp : 80
        });
    }, 5000);
    
    graphics.drawStaticObjects();
    
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
        PlaceTower : PlaceTower
    };

}(MyGame.graphics, MyGame.particles));