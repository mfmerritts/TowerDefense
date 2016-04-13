MyGame.GameObjects = (function (graphics) {
    'use strict';
    
    var gameObjects = {},
        towerGridActive = false,
        towerGrid = [],
        selectedTower = 0;
    
    function GameObjects(){
        var that = {},
            objectsList = {},
            nextId = 0;

        that.add = function (gameObject){
            var newId = ++nextId;
            gameObject.id = newId;
            objectsList[newId] = gameObject;
            selectedTower = newId;
        }

        that.remove = function (objectId){
            delete objectsList[objectId];
        }
        
        that.getObject = function (objectId){
            if (objectsList.hasOwnProperty(objectId))
                return objectsList[objectId];
        }

        that.getObjectList = function (){
            var objects = [];
            for (var key in objectsList) {
                if (objectsList.hasOwnProperty(key)) {
                    objects.push(objectsList[key]);
                }
            }
            return objects;
        }

        return that;
    }
    
    function ToggleTowerGrid(){
        towerGridActive = !towerGridActive;
    }
    
    function PlaceTower(x, y){
        var dx = 0,
            dy = 0;
     
        for (var rows = 0; rows < towerGrid.length; ++rows) {
            if (y < dy + 50) { /* the tower is in this row */
                for (var items = 0; items < towerGrid[rows].length; ++items) {
                    if (x < dx + 50) { /* the tower is in the column */
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
    
    function findTarget(tower) {
        var thisTower = { x: tower.position.x, y: tower.position.y, radius: tower.radius },
            needNewTarget = true;

        /* Check if have a target already */
        if (tower.targetId != -1) {
            var target = gameObjects.getObject(tower.targetId),
                targetCircle = { x: target.position.x, y: target.position.y, radius: target.radius };
            /* Need to check if the current target is still in range */
            needNewTarget = !circleCollisionDetection(targetCircle, thisTower);
        }

        if (needNewTarget) {
            tower.targetId = -1;
            var objectList = gameObjects.getObjectList();
            for (var i = 0; i < objectList.length; ++i) {
                if (objectList[i].isCreep) {
                    var creep = { x: objectList[i].position.x, y: objectList[i].position.y, radius: objectList[i].size / 2 };
                    if (circleCollisionDetection(creep, thisTower)) {
                        tower.targetId = objectList[i].id;
                        break;
                    }
                }
            }
        }
    }
    
    function GameObject(spec){
        var that = {
            /* x,y coordinate of the GameObject */
            position : spec.useMouse ? { x: 0, y: 0 } : spec.position,
            /* list of gridIds that this GameObject is a member of */
            gridIds : spec.gridIds,
            rotation : 0,
            size : spec.size,
            id : 0,
            useMouse : spec.useMouse
        };
        
        that.removeGridId = function (idToRemove){
            var index = gridIds.indexOf(idToRemove);
            if(index !== -1)
                gridIds.splice(index, 1);
        }
        
        that.getType = function (){
            return spec.type;
        }

        return that;
    };
    
    function DeleteSelectedTower(){
        gameObjects.remove(selectedTower);
        selectedTower = 0;
    }
    
    function Creep(spec){
        var that = GameObject(spec);
        
        that.imageId = 'C1';
        that.velocity = { x: 1, y: 1 };
        that.speed = 200;
        that.hp = 50;
        that.angle = 3 * Math.PI / 180;
        that.isCreep = true;
        that.gridCoordX;
        that.gridCoordY;
        that.directionX;
        that.directionY;
        that.nextMove;
               
        that.update = function (elapsedTime){
            that.angle += .5 * Math.PI / 180;

            //cirle movement
            //that.position.x += 100 * Math.cos(that.angle) * (elapsedTime / 1000);
            //that.position.y += 100 * Math.sin(that.angle) * (elapsedTime / 1000);   
            
            that.gridCoordX = Math.floor(that.position.x / 50);
            that.gridCoordY = Math.floor(that.position.y / 50);
            //console.log("current loc: " + that.gridCoordX + " " + that.gridCoordY);
            if ((that.gridCoordX == 6) && (that.gridCoordY == 15)) {
                //this is the code that handles the removal of this object
                gameObjects.remove(that.id);
                return;
            }
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
                    that.position.x -= 25 * (elapsedTime / 1000);
                }
                if (correction < 20) {
                    that.position.x += 25 * (elapsedTime / 1000);
                }
            }
            
            //these helps the creep stay closer to the center of the square its in (y coords)
            if (that.directionY == 0) {
                var correction = that.position.y % (that.gridCoordY * 50);
                if (correction > 30) {
                    that.position.y -= 25 * (elapsedTime / 1000);
                }
                if (correction < 20) {
                    that.position.y += 25 * (elapsedTime / 1000);
                }
            }

            that.position.x += 25 * (elapsedTime / 1000) * that.directionX;
            that.position.y += 25 * (elapsedTime / 1000) * that.directionY;
        }

        gameObjects.add(that);
    }

    function Turret(spec){
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .3;
        
        that.imageId = 'T1';
        that.fireRate = 1;
        that.damage = 2;
        that.targetTypes = 2;
        that.radius = 100;
        that.targetId = -1;

        that.update = function (elapsedTime){
            findTarget(that);
            if (that.targetId == -1) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                /* TODO: Track Target */
                var target = gameObjects.getObject(that.targetId);
                var diffX = target.position.x - that.position.x;
                var diffY = target.position.y - that.position.y;
                var angle = Math.atan2(diffY, diffX) * (180 / Math.PI);
                if (angle >= -90) {
                    angle += 90;
                }
                else {
                    angle += 450;
                }
                var diffAngle = ((that.rotation * (180 / Math.PI)) % 360) - angle;
                console.log(diffAngle);
                if (diffAngle > 0) {
                    that.rotation -= defaultRotationSpeed * (elapsedTime / 1000);
                }      
                else if (diffAngle < 0) {
                    that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
                }
            }
        }

        gameObjects.add(that);
    }
    
    function Missile(spec){
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .75;

        that.imageId = 'M1';
        that.fireRate = .5;
        that.damage = 5;
        that.targetTypes = 1;
        that.radius = 150;
        that.targetId = -1;

        that.update = function (elapsedTime) {
            findTarget(that);
            if (that.targetId == -1) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                /* TODO: Track Target */
                var target = gameObjects.getObject(that.targetId);
                var diffX = target.position.x - that.position.x;
                var diffY = target.position.y - that.position.y;
                var angle = Math.atan2(diffY, diffX) * (180 / Math.PI);
                if (angle >= -90) {
                    angle += 90;
                }
                else {
                    angle += 450;
                }
                var diffAngle = ((that.rotation * (180 / Math.PI)) % 360) - angle;
                console.log(diffAngle);
                if (diffAngle > 0) {
                    that.rotation -= defaultRotationSpeed * (elapsedTime / 1000);
                }      
                else if (diffAngle < 0) {
                    that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
                }
            }
                
        }
        
        gameObjects.add(that);
    }
    
    function Bomb(spec){
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .2;
        
        that.imageId = 'B1';
        that.fireRate = .25;
        that.damage = 10;
        that.targetTypes = 0;
        that.radius = 250;
        that.targetId = -1;
        
        that.update = function (elapsedTime) {
            findTarget(that);
            if (that.targetId == -1) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                /* TODO: Track Target */
                var target = gameObjects.getObject(that.targetId);
                var diffX = target.position.x - that.position.x;
                var diffY = target.position.y - that.position.y;
                var angle = Math.atan2(diffY, diffX) * (180 / Math.PI);
                if (angle >= -90) {
                    angle += 90;
                }
                else {
                    angle += 450;
                }
                var diffAngle = ((that.rotation * (180 / Math.PI)) % 360) - angle;
                console.log(diffAngle);
                if (diffAngle > 0) {
                    that.rotation -= defaultRotationSpeed * (elapsedTime / 1000);
                }      
                else if (diffAngle < 0) {
                    that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
                }
            }
        }
        
        gameObjects.add(that);
    }

    function Frost(spec) {
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .5;
        
        that.imageId = 'F1';
        that.fireRate = 2;
        that.damage = 3;
        that.targetTypes = 0;
        that.radius = 100;
        that.targetId = -1;
        
        that.update = function (elapsedTime) {
            if(!that.useMouse)
                findTarget(that);

            if (that.targetId == -1) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                /* TODO: Track Target */
                var target = gameObjects.getObject(that.targetId);
                var diffX = target.position.x - that.position.x;
                var diffY = target.position.y - that.position.y;
                var angle = Math.atan2(diffY, diffX) * (180 / Math.PI);
                if (angle >= -90) {
                    angle += 90;
                }
                else {
                    angle += 450;
                }
                var diffAngle = ((that.rotation * (180 / Math.PI)) % 360) - angle;
                console.log(diffAngle);
                if (diffAngle > 0) {
                    that.rotation -= defaultRotationSpeed * (elapsedTime / 1000);
                }      
                else if (diffAngle < 0) {
                    that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
                }
            }
                
        }
        
        gameObjects.add(that);
    }
    
    function UpdateAll(elapsedTime){
        var objectList = gameObjects.getObjectList();
        for (var i = 0; i < objectList.length; ++i) {
            objectList[i].update(elapsedTime);
        }
    }
    
    function RenderAll(){
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
                towerGridActive : towerGridActive
            });
        }
    }
    
    function circleCollisionDetection(circle1, circle2) {
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < circle1.radius + circle2.radius;
    }
    
    function findShortestTopToBottom(currentX, currentY){
        //this code is when the creep has made it to the final square and now needs to exit the game
        if ((currentX == 6)&&(currentY == 13)){
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
                var node = { posX: x, posY: y, pre: "null", visited: false, dis: 1000000};
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
                    if(searchArry[node.posX + 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX + 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX + 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX + 1][node.posY]);
                    }
                }
            }
            if (node.posX - 1 >= 0) {
                //check up
                if ((!searchArry[node.posX - 1][node.posY].visited) && (towerGrid[node.posX - 1][node.posY] != 1)) {
                    if(searchArry[node.posX - 1][node.posY].dis > node.dis + 1) {
                        searchArry[node.posX - 1][node.posY].dis = node.dis + 1;
                        searchArry[node.posX - 1][node.posY].pre = node;
                        searchQueue.push(searchArry[node.posX - 1][node.posY]);
                    }
                }
            }
            if (node.posY + 1 <= 13) {
                //check right
                if ((!searchArry[node.posX][node.posY + 1].visited) && (towerGrid[node.posX][node.posY + 1] != 1)) {
                    if(searchArry[node.posX][node.posY + 1].dis > node.dis + 1) {
                        searchArry[node.posX][node.posY + 1].dis = node.dis + 1;
                        searchArry[node.posX][node.posY + 1].pre = node;
                        searchQueue.push(searchArry[node.posX][node.posY + 1]);
                    }
                }
            }
            if (node.posY - 1 >= 0) {
                //check left
                if ((!searchArry[node.posX][node.posY - 1].visited) && (towerGrid[node.posX][node.posY - 1] != 1)) {
                    if(searchArry[node.posX][node.posY - 1].dis > node.dis + 1) {
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
    
    function findShortestLeftToRight(){
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
        while(searchQueue.length != 0) {
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

    var temp = [];
    var rows = 14;
    var cols = 14;
    
    for (var x = 0; x < rows; x++) {
        temp = [];
        for (var y = 0; y < cols; y++) 
            temp[y] = 0;

        towerGrid.push(temp);
    }
        
    //adds creep
    //needs to be replaced with a way to continuously introduce new creeps
    Creep({
        position : { x: 325, y: 0 },
        gridIds : ['1'],
        size : 50
    });

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

}(MyGame.graphics));