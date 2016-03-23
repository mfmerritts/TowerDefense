MyGame.screens['high-scores'] = (function(game) {
	'use strict';
     var highScores = {};
	
	function initialize() {
		document.getElementById('id-high-scores-back').addEventListener(
			'click',
			function() { 
                game.showScreen('main-menu'); 
            });
            document.getElementById('id-high-scores-reset').addEventListener(
			'click',
			function() { 
                highScores = [];
                localStorage.highScores = JSON.stringify(highScores);
                var ol = document.getElementById('highScores');
                while(ol.firstChild){
                    ol.removeChild(ol.firstChild);
                }
            });
	}
    
    function sortNumber(a,b) {
        return b - a;
    }
	
	function run() {
        var ol = document.getElementById('highScores');
        while(ol.firstChild){
            ol.removeChild(ol.firstChild);
        }
                
        if(localStorage.highScores){
	       highScores = JSON.parse(localStorage.highScores);
            if(highScores.length > 0){
                highScores.sort(sortNumber);
                if(highScores.length > 10){
                    highScores.splice(0, 1);
                }
            }
        } else {
            highScores = [];
        }
        
        if(highScores.length > 0){
            for(var i = 0; i < highScores.length; ++i){
                var newItem = document.createElement("li"),
                    newText = document.createTextNode(highScores[i]);
                newItem.appendChild(newText);
                ol.appendChild(newItem);
            }
        }
	}
	
	return {
		initialize : initialize,
		run : run
	};
}(MyGame.game));