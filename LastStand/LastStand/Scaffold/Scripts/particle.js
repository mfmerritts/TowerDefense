MyGame.particles = (function (graphics) {
    'use strict';
    
    var that = {},
        effectsNextName = 0,
        effects = {},
        nextName = 1,	// unique identifier for the next particle
        particles = {};	// Set of all active particles
    
    function CreateTowerSold(spec){
        var that = {
            id: 0
        },
            lifeTime = .1,
            duration = 0;
        
        that.update = function (elapsedTime) {
            duration += elapsedTime;
            if (duration >= lifeTime) {
                return false;
            } else {
                create({
                    imageId : 'money',
                    size : Random.nextGaussian(15, 2),
                    center: { x: spec.center.x, y: spec.center.y },
                    direction: Random.nextCircleVector(),
                    speed: Random.nextGaussian(20, 1), 
                    rotation: 0,
                    lifetime: Random.nextGaussian(.5, .5),	
                    alive: 0
                });
                return true;
            }
        }
        
        effectsNextName++;
        that.id = effectsNextName;
        effects[effectsNextName] = that;
    }
    
    function CreateFrostHit(spec){
        var that = {
            id: 0
        },
            lifeTime = 0.5,
            duration = 0;
        
        that.update = function (elapsedTime) {
            duration += elapsedTime;
            if (duration >= lifeTime) {
                return false;
            } else {
                create({
                    imageId : 'FrostShot',
                    size : Random.nextGaussian(5, 1),
                    center: { x: spec.center.x, y: spec.center.y },
                    direction: Random.nextCircleVector(),
                    speed: Random.nextGaussian(10, 5), 
                    rotation: 0,
                    lifetime: Random.nextGaussian(.5, .5),	
                    alive: 0
                });
                return true;
            }
        }
        
        effectsNextName++;
        that.id = effectsNextName;
        effects[effectsNextName] = that;
    }
    
    function CreateBombHit(spec) {
        var that = {
            id: 0
        },
            lifeTime = 0.5,
            duration = 0;

        that.update = function (elapsedTime){
            duration += elapsedTime;
            if (duration >= lifeTime) {
                return false;
            } else {
                create({
                    imageId : 'Fire',
                    size : Random.nextGaussian(5, 1),
                    center: { x: spec.center.x, y: spec.center.y },
                    direction: Random.nextCircleVector(),
                    speed: Random.nextGaussian(10, 5), 
                    rotation: 0,
                    lifetime: Random.nextGaussian(.5, .5),	
                    alive: 0
                });
                return true;
            }
        }

        effectsNextName++;
        that.id = effectsNextName;
        effects[effectsNextName] = that;
    }
    
    function CreepDeathExplosion(spec){
        var that = {
            id: 0    
        },
            lifeTime = .5,
            duration = 0;

        that.update = function (elapsedTime){
            duration += elapsedTime;
            if (duration >= lifeTime) {
                return false;
            } else {
                create({
                    imageId : 'Fire',
                    size : Random.nextGaussian(10, 1),
                    center: { x: spec.center.x, y: spec.center.y },
                    direction: Random.nextCircleVector(),
                    speed: Random.nextGaussian(20, 5), 
                    rotation: 0,
                    lifetime: Random.nextGaussian(1, .5),	
                    alive: 0
                });
                return true;
            }
        }

        effectsNextName++;
        that.id = effectsNextName;
        effects[effectsNextName] = that;
    }
    
    function create(spec) {
        spec.size = Math.max(1, spec.size);
        spec.lifetime = Math.max(0.01, spec.lifetime);
        particles[nextName++] = spec;
    };
    
    function update(elapsedTime) {
        var removeMe = [],
            effectId,
            value,
            particle;
        

        
        elapsedTime = elapsedTime / 1000;
        
        var newEffectList = {};
        for (effectId in effects) {
            if (effects.hasOwnProperty(effectId)) {
                var effect = effects[effectId];
                if (effect.update(elapsedTime)) {
                    newEffectList[effect.id] = effect;
                }
            }
        }
        effects = newEffectList;
        
        for (value in particles) {
            if (particles.hasOwnProperty(value)) {
                particle = particles[value];
                particle.alive += elapsedTime;
                
                particle.center.x += (elapsedTime * particle.speed * particle.direction.x);
                particle.center.y += (elapsedTime * particle.speed * particle.direction.y);
                
                particle.rotation += particle.speed / 500;
                
                if (particle.alive > particle.lifetime) {
                    removeMe.push(value);
                }
            }
        }
        
        for (particle = 0; particle < removeMe.length; particle++) {
            delete particles[removeMe[particle]];
        }
        removeMe.length = 0;
    };
    
    function render() {
        var value,
            particle;
        
        for (value in particles) {
            if (particles.hasOwnProperty(value)) {
                particle = particles[value];
                graphics.drawParticle(particle);
            }
        }
    };
    
    return {
        render : render,
        update : update,
        CreepDeathExplosion : CreepDeathExplosion,
        CreateBombHit : CreateBombHit,
        CreateFrostHit : CreateFrostHit,
        CreateTowerSold : CreateTowerSold
    };
}(MyGame.graphics));