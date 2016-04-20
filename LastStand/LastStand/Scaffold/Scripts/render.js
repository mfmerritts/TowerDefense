MyGame.graphics = (function() { 
    'use strict';
    
    var canvas = document.getElementById('canvas-main'),
        context = canvas.getContext('2d'),
        images = {},
        imagesLoaded = 0,
        imagesToLoad = 0,
        mouseX = 0,
        mouseY = 0;
    
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        mouseX = evt.clientX - rect.left;
        mouseY = evt.clientY - rect.top;
    }
    
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
            images[particle.imageId], 
            particle.center.x - particle.size/2, 
            particle.center.y - particle.size/2,
            particle.size, particle.size);
        
        context.restore();
    };
    
    function drawGameObject(renderObject){
        context.save();
        
        if (!renderObject.useMouse) {
            context.translate(renderObject.position.x, renderObject.position.y);
            context.rotate(renderObject.rotation);
            context.translate(-renderObject.position.x, -renderObject.position.y);
        }

        context.drawImage(
            images[renderObject.imageId],
            renderObject.useMouse ? mouseX - renderObject.size/2 : renderObject.position.x - renderObject.size / 2,
            renderObject.useMouse ? mouseY - renderObject.size/2 : renderObject.position.y - renderObject.size / 2,
            renderObject.size, renderObject.size);
        context.restore();

        if (renderObject.towerGridActive && renderObject.radius) {
            drawCircle({
                x: renderObject.useMouse ? mouseX : renderObject.position.x,
                y: renderObject.useMouse ? mouseY : renderObject.position.y,
                radius: renderObject.radius,
                fillStyle: 'rgba(255, 0, 0, 0.15)'
            });
        }

        if (renderObject.percentage) {
            var color = '';
            if (renderObject.percentage <= 1 && renderObject.percentage > .75) {
                color = 'rgb(0, 255, 0)';
            } else if (renderObject.percentage <= .75 && renderObject.percentage > .5) {
                color = 'rgb(255, 255, 0)';
            } else if (renderObject.percentage <= .5 && renderObject.percentage > .25) {
                color = 'rgb(255, 153, 0)';
            } else {
                color = 'rgb(255, 0, 0)';
            }
            drawRec({
                x: renderObject.position.x - renderObject.size/2,
                y: renderObject.position.y - renderObject.size/2 - 15,
                width: renderObject.percentage * renderObject.size,
                height: 5,
                rgb: color
            });
        }
    };
    
    function drawGrid(spec){
        context.save();
        
        var dx = 0,
            dy = 0;
        
        for (var rows = 0; rows < spec.grid.length; ++rows) {
            for (var items = 0; items < spec.grid[rows].length; ++items) {
                context.strokeStyle = "#a6a6a6";
                context.rect(dx, dy, spec.size, spec.size);
                context.stroke();
                dx += spec.size;
            }
            dx = 0;
            dy += spec.size;
        }

        context.restore();
    }
    
    function drawStaticObjects(){
        context.save();
        
        context.drawImage(
            images['BG'],
            0,
            0,
            700, 700);
        
        context.beginPath();
        context.moveTo(700, 0);
        context.lineTo(700, 700);
        context.stroke();

        context.drawImage(
            images['T1'],
            725,
            100,
            50, 50);
        context.drawImage(
            images['M1'],
            725,
            200,
            50, 50);
        context.drawImage(
            images['B1'],
            725,
            300,
            50, 50);
        context.drawImage(
            images['F1'],
            725,
            400,
            50, 50);
        
        context.restore();
    }
    
    function clearCanvas(){
        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();
    };
    

    
    var imageList = [];
    imageList.push({
        imageId : 'BG',
        src: 'Scaffold/Images/Terrain.jpg'
    });
    loadImages(imageList);
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
        imageId : 'P1',
        src: 'Scaffold/Images/P1.jpg'
    });
    imageList.push({
        imageId : 'Red1',
        src: 'Scaffold/Images/Red1.png'
    });
    imageList.push({
        imageId : 'Red2',
        src: 'Scaffold/Images/Red2.png'
    });
    imageList.push({
        imageId : 'Red3',
        src: 'Scaffold/Images/Red3.png'
    });
    imageList.push({
        imageId : 'Red4',
        src: 'Scaffold/Images/Red4.png'
    });
    imageList.push({
        imageId : 'Red5',
        src: 'Scaffold/Images/Red5.png'
    });
    imageList.push({
        imageId : 'Red6',
        src: 'Scaffold/Images/Red6.png'
    });
    imageList.push({
        imageId : 'Yellow1',
        src: 'Scaffold/Images/Yellow1.png'
    });
    imageList.push({
        imageId : 'Yellow2',
        src: 'Scaffold/Images/Yellow2.png'
    });
    imageList.push({
        imageId : 'Yellow3',
        src: 'Scaffold/Images/Yellow3.png'
    });
    imageList.push({
        imageId : 'Yellow4',
        src: 'Scaffold/Images/Yellow4.png'
    });
    imageList.push({
        imageId : 'Blue1',
        src: 'Scaffold/Images/Blue1.png'
    });
    imageList.push({
        imageId : 'Blue2',
        src: 'Scaffold/Images/Blue2.png'
    });
    imageList.push({
        imageId : 'Blue3',
        src: 'Scaffold/Images/Blue3.png'
    });
    imageList.push({
        imageId : 'Blue4',
        src: 'Scaffold/Images/Blue4.png'
    });
    imageList.push({
        imageId : 'Fire',
        src: 'Scaffold/Images/fire.png'
    });
    loadImages(imageList);
    
    canvas.addEventListener('mousemove', function (evt) {
        getMousePos(canvas, evt);
    }, false);

    return {
        drawCircle: drawCircle,
		drawRec : drawRec,
        drawText : drawText,
        drawParticle : drawParticle,
        drawGameObject : drawGameObject,
        clearCanvas : clearCanvas,
        drawGrid : drawGrid,
        drawStaticObjects : drawStaticObjects
	};
}());