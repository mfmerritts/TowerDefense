var MyGame = {
	screens : {},
};

MyGame.input = (function() {
    'use strict';
    
    function Keyboard(){
        var that = {
            keys : {},
            handlers : []
        },
        handler;
        
        function keyPress(e){
            that.keys[e.keyCode] = e.timeStamp;
        }
        
        function keyRelease(e){
            delete that.keys[e.keyCode];
        }
        
        that.clear = function(){
            that.handlers.length = 0;
            that.handlers = [];
        };
        
        that.registerCommand = function(key, handler){
            that.handlers.push({ key : key, handler : handler});
        };
        
        that.update = function(elapsedTime) {
			for (handler = 0; handler < that.handlers.length; handler++) {
				if (that.keys.hasOwnProperty(that.handlers[handler].key)) {
					that.handlers[handler].handler(elapsedTime);
				}
			}
		};
		
		window.addEventListener('keydown', keyPress);
		window.addEventListener('keyup', keyRelease);
        
		return that;
	}
	
	return {
		Keyboard : Keyboard
	};
}());