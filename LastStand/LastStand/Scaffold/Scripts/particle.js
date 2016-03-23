MyGame.particles = (function(graphics) { 
        'use strict';
        
        var that = {},
            nextName = 1,	// unique identifier for the next particle
            particles = {};	// Set of all active particles
            
        /* Once all particle images are loaded we'll replace the empty render function with the real one */
        function allImagesLoaded(){
             that.render = function() {
                var value,
                    particle;
                
                for (value in particles) {
                    if (particles.hasOwnProperty(value)) {
                        particle = particles[value];
                        graphics.drawParticle(particle);
                    }
                }
            };
        }

        /* Will need to change this to create effects rather than individual particles */
        function create(spec) {
            var p = {
                    image: spec.image,
                    size: Random.nextGaussian(3, 1),
                    center: {x: spec.center.x, y: spec.center.y},
                    direction: Random.nextCircleVector(),
                    speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev), 
                    rotation: 0,
                    lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev),	
                    alive: 0	
                };
            
            p.size = Math.max(1, p.size);
            p.lifetime = Math.max(0.01, p.lifetime);
            particles[nextName++] = p;
	};
	
	function update(elapsedTime) {
		var removeMe = [],
			value,
			particle;
			
		elapsedTime = elapsedTime / 1000;
		
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
	
    function render(){
        
    };
    
	return {
		render : render,
		update : update,
        create : create
	};
}(MyGame.graphics));