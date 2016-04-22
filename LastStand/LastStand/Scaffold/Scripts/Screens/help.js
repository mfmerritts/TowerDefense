MyGame.screens['help'] = (function(game) {
    'use strict';
    
    var editUpgrade = false;
    var editSell = false
    var editStart = false;
    
    function onKeyDownUpgrade(e) {
        if ((e.ctrlKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.ctrlKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if (( e.keyCode >= 48) && (e.keyCode <= 57)) {
            document.getElementById('bind1').innerHTML =  String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
            document.getElementById('bind1').innerHTML = String.fromCharCode(e.keyCode);
        }
    }
    
    function onKeyDownSell(e) {
        if ((e.ctrlKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.ctrlKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 48) && (e.keyCode <= 57)) {
            document.getElementById('bind2').innerHTML = String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
            document.getElementById('bind2').innerHTML = String.fromCharCode(e.keyCode);
        }
    }
    
    function onKeyDownStart(e) {
        if ((e.ctrlKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.ctrlKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 48) && (e.keyCode <= 57)) {
            document.getElementById('bind3').innerHTML = String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
            document.getElementById('bind3').innerHTML = String.fromCharCode(e.keyCode);
        }
    }
    
    function listenForUpgrade(){
        if (editUpgrade) {
            document.removeEventListener('keydown', onKeyDownUpgrade);
            document.getElementById('editbutton1').innerHTML = "Edit";
            editUpgrade = false;

            if (document.getElementById('bind1').innerHTML == document.getElementById('bind2').innerHTML) {
                document.getElementById('bind2').innerHTML = "";
            }
            if (document.getElementById('bind1').innerHTML == document.getElementById('bind3').innerHTML) {
                document.getElementById('bind3').innerHTML = "";
            }
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

            if (document.getElementById('bind2').innerHTML == document.getElementById('bind1').innerHTML) {
                document.getElementById('bind1').innerHTML = "";
            }
            if (document.getElementById('bind2').innerHTML == document.getElementById('bind3').innerHTML) {
                document.getElementById('bind3').innerHTML = "";
            }
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

            if (document.getElementById('bind3').innerHTML == document.getElementById('bind2').innerHTML) {
                document.getElementById('bind2').innerHTML = "";
            }
            if (document.getElementById('bind3').innerHTML == document.getElementById('bind1').innerHTML) {
                document.getElementById('bind1').innerHTML = "";
            }
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
