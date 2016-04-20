MyGame.screens['help'] = (function(game) {
    'use strict';
    
    var editUpgrade = false;
    var editSell = false
    var editStart = false;
    
    function onKeyDownUpgrade(e) {
        document.getElementById('bind1').innerHTML = String.fromCharCode(e.keyCode);
    }
    
    function onKeyDownSell(e) {
        document.getElementById('bind2').innerHTML = String.fromCharCode(e.keyCode);
    }
    
    function onKeyDownStart(e) {
        document.getElementById('bind3').innerHTML = String.fromCharCode(e.keyCode);
    }
    
    function listenForUpgrade(){
        if (editUpgrade) {
            document.removeEventListener('keydown', onKeyDownUpgrade);
            document.getElementById('editbutton1').innerHTML = "Edit";
            editUpgrade = false;
        }
        else {
            document.addEventListener('keydown', onKeyDownUpgrade);
            document.getElementById('editbutton1').innerHTML = "Set";
            editUpgrade = true;
        }        
    }
    
    function listenForSell() {
        if (editUpgrade) {
            document.removeEventListener('keydown', onKeyDownSell);
            document.getElementById('editbutton2').innerHTML = "Edit";
            editUpgrade = false;
        }
        else {
            document.addEventListener('keydown', onKeyDownSell);
            document.getElementById('editbutton2').innerHTML = "Set";
            editUpgrade = true;
        }
    }
    
    function listenForStart() {
        if (editUpgrade) {
            document.removeEventListener('keydown', onKeyDownStart);
            document.getElementById('editbutton3').innerHTML = "Edit";
            editUpgrade = false;
        }
        else {
            document.addEventListener('keydown', onKeyDownStart);
            document.getElementById('editbutton3').innerHTML = "Set";
            editUpgrade = true;
        }
    }

	function initialize() {
		document.getElementById('id-help-back').addEventListener(
			'click',
			function () { game.showScreen('main-menu'); });

        document.getElementById('editbutton1').addEventListener(
            'click',
			function () { listenForUpgrade(); });

        document.getElementById('editbutton2').addEventListener(
            'click',
			function () { listenForSell(); });

        document.getElementById('editbutton3').addEventListener(
            'click',
			function () { listenForStart(); });
	}
	
	function run() {
		//
		// I know this is empty, there isn't anything to do.
	}
	
	return {
		initialize : initialize,
		run : run
	};
}(MyGame.game));
