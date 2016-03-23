MyGame.graphics = (function() { 
    'use strict';
    
    var canvas = document.getElementById('canvas-main'),
        context = canvas.getContext('2d');
                
    function drawBall(spec){
        context.save();
        context.beginPath();
        context.arc(spec.x + spec.radius, spec.y + spec.radius, spec.radius, 0, Math.PI*2);
        context.fillStyle = spec.color;
        context.fill();
        context.closePath();
        context.restore();
    };
    
    function drawRec(spec)
    {
        context.save();

        context.translate(spec.x, spec.y);
        context.rotate(spec.rotation);
        context.translate(-spec.x, -spec.y);

        context.fillStyle = spec.rgb;
        context.fillRect(spec.x, spec.y, spec.width, spec.height);
        context.restore();
    };
    
    function drawText(spec){
        context.save();
        context.font = spec.font;
        context.textAlign = spec.textAlign;
        context.textBaseline = spec.textBaseLine;

        context.translate(spec.x, spec.y);
        context.rotate(spec.rotation);
        context.translate(-spec.x, -spec.y);

        context.fillText(spec.text, spec.x, spec.y);
        context.fill();
        context.restore();
    };
    
    function drawParticle(particle){
        context.save();
        context.translate(particle.center.x, particle.center.y);
        context.rotate(particle.rotation);
        context.translate(-particle.center.x, -particle.center.y);
        
        context.drawImage(
            particle.image, 
            particle.center.x - particle.size/2, 
            particle.center.y - particle.size/2,
            particle.size, particle.size);
        
        context.restore();
    };
    
    function clearCanvas(){
        context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.restore();
    };
    
    return {
		drawBall : drawBall,
		drawRec : drawRec,
        drawText : drawText,
        drawParticle : drawParticle,
        clearCanvas : clearCanvas
	};
}());