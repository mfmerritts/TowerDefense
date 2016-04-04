MyGame.graphics = (function() { 
    'use strict';
    
    var canvas = document.getElementById('canvas-main'),
        context = canvas.getContext('2d'),
        canvas2 = document.getElementById("canvas-tower-select"),
        context2 = canvas2.getContext("2d"),
        images = {},
        imagesLoaded = 0,
        imagesToLoad = 0;
    
    function loadImages(imageList){
        imagesToLoad = imageList.length;
        for (var i = 0; i < imageList.length; ++i) {
            var imageInfo = imageList[i];

            images[imageInfo.imageId] = createImage(imageInfo);
        }
    };
    
    function toggleTowerGrid(){
        towerGridActive = !towerGridActive;
    }
    
    function createImage(imageInfo){
        var image = new Image();
        image.onLoad = function (){
            imagesLoaded++;
        }
        image.src = imageInfo.src;
        return image;
    }
                
    function drawCircle(spec) {
        context.save();
        context.beginPath();
        context.arc(spec.x, spec.y, spec.radius, 0, Math.PI*2);
        context.fillStyle = spec.fillStyle;
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
    
    function drawGameObject(renderObject){
        context.save();
        context.translate(renderObject.position.x, renderObject.position.y);
        context.rotate(renderObject.rotation);
        context.translate(-renderObject.position.x, -renderObject.position.y);

        context.drawImage(
            images[renderObject.imageId],
            renderObject.position.x - renderObject.size / 2,
            renderObject.position.y - renderObject.size / 2,
            renderObject.size, renderObject.size);
        context.restore();

        if (renderObject.towerGridActive && renderObject.radius) {
            drawCircle({
                x: renderObject.position.x,
                y: renderObject.position.y,
                radius: renderObject.radius,
                fillStyle: 'rgba(255, 0, 0, 0.25)'
            });
        }
    };
    
    function drawGrid(spec){
        context.save();
        
        var dx = 0,
            dy = 0;
        
        for (var rows = 0; rows < spec.grid.length; ++rows) {
            for (var items = 0; items < spec.grid[rows].length; ++items) {
                context.rect(dx, dy, spec.size, spec.size);
                context.stroke();
                dx += spec.size;
            }
            dx = 0;
            dy += spec.size;
        }

        context.restore();
    }
    
    function drawTowerSelectMenu(){
        context2.save();

        context2.drawImage(
            images['T1'],
            25,
            100,
            50, 50);
        context2.drawImage(
            images['M1'],
            25,
            200,
            50, 50);
        context2.drawImage(
            images['B1'],
            25,
            300,
            50, 50);
        context2.drawImage(
            images['F1'],
            25,
            400,
            50, 50);
        
        context2.restore();
    }
    
    function clearCanvas(){
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    };
    
    function clearCanvas2(){
        context2.save();
        context2.setTransform(1, 0, 0, 1, 0, 0);
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.restore();
    }
    
    var imageList = [];
    imageList.push({
        imageId : 'T1',
        src: 'Scaffold/Images/TurretLevel1.png'
    });
    imageList.push({
        imageId : 'M1',
        src: 'Scaffold/Images/MissileLevel1.png'
    });
    imageList.push({
        imageId : 'B1',
        src: 'Scaffold/Images/BombLevel1.png'
    });
    imageList.push({
        imageId : 'F1',
        src: 'Scaffold/Images/FrostLevel1.png'
    });
    imageList.push({
        imageId : 'C1',
        src: 'Scaffold/Images/Creep1.png'
    });
    loadImages(imageList);

    return {
        drawCircle: drawCircle,
		drawRec : drawRec,
        drawText : drawText,
        drawParticle : drawParticle,
        drawGameObject : drawGameObject,
        clearCanvas : clearCanvas,
        clearCanvas2 : clearCanvas2,
        drawGrid : drawGrid,
        drawTowerSelectMenu : drawTowerSelectMenu
	};
}());