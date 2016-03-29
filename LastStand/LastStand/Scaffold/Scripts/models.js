MyGame.models = (function () {
    'use strict';

    function GameObject(spec){
        var that = {
            /* x,y coordinate of the GameObject */
            position : spec.position,
            /* list of gridIds that this GameObject is a member of */
            gridIds : spec.gridIds,
            rotation : 0,
            size : spec.size,
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

    function Turret(spec){
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .3;
        
        that.imageId = 'T1';
        that.fireRate = 1;
        that.damage = 2;
        that.targetTypes = 2;
        that.radius = 10;
        that.targetDirection = {};

        that.update = function (elapsedTime){
            if(!that.targetDirection.x) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                /* TODO: Track target */
            }
                
        }

        return that;
    }
    
    function Missile(spec){
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .75;

        that.imageId = 'M1';
        that.fireRate = .5;
        that.damage = 5;
        that.targetTypes = 1;
        that.radius = 20;
        that.targetDirection = {};

        that.update = function (elapsedTime) {
            if (!that.targetDirection.x) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                /* TODO: Track target */
            }
                
        }
        
        return that;
    }
    
    function Bomb(spec){
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .2;
        
        that.imageId = 'B1';
        that.fireRate = .25;
        that.damage = 10;
        that.targetTypes = 0;
        that.radius = 50;
        that.targetDirection = {};
        
        that.update = function (elapsedTime) {
            if (!that.targetDirection.x) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                /* TODO: Track target */
            }
                
        }
        
        return that;
    }

    function Frost(spec) {
        var that = GameObject(spec),
            defaultRotationSpeed = Math.PI * .5;
        
        that.imageId = 'F1';
        that.fireRate = 2;
        that.damage = 3;
        that.targetTypes = 0;
        that.radius = 10;
        that.targetDirection = {};
        
        that.update = function (elapsedTime) {
            if (!that.targetDirection.x) {
                that.rotation += defaultRotationSpeed * (elapsedTime / 1000);
            } else {
                /* TODO: Track target */
            }
                
        }
        
        return that;
    }

    return {
        Turret : Turret,
        Missile : Missile,
        Bomb : Bomb,
        Frost : Frost
    };
}());