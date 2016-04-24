MyGame.screens['help'] = (function(game) {
    'use strict';
    
    var editUpgrade = false;
    var editSell = false
    var editStart = false;
    
    var b1, b2, b3;
    
    var controls = [];
    var previousControls = localStorage.getItem('Tower.Controls');
    if (previousControls !== null) {
        controls = JSON.parse(previousControls);
        b1 = controls[0];
        b2 = controls[1];
        b3 = controls[2];
    }
    else {
        b1 = 'U',
        b2 = 'S',
        b3 = 'G';
    }

    function onKeyDownUpgrade(e) {
        if ((e.ctrlKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
            b1 = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.ctrlKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
            b1 = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
            b1 = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
            b1 = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
            b1 = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind1').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
            b1 = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if (( e.keyCode >= 48) && (e.keyCode <= 57)) {
            document.getElementById('bind1').innerHTML = String.fromCharCode(e.keyCode);
            b1 = String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
            document.getElementById('bind1').innerHTML = String.fromCharCode(e.keyCode);
            b1 = String.fromCharCode(e.keyCode);
        }
    }
    
    function onKeyDownSell(e) {
        if ((e.ctrlKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
            b2 = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.ctrlKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
            b2 = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
            b2 = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
            b2 = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
            b2 = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind2').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
            b2 = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 48) && (e.keyCode <= 57)) {
            document.getElementById('bind2').innerHTML = String.fromCharCode(e.keyCode);
            b2 = String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
            document.getElementById('bind2').innerHTML = String.fromCharCode(e.keyCode);
            b2 = String.fromCharCode(e.keyCode);
        }
    }
    
    function onKeyDownStart(e) {
        if ((e.ctrlKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
            b3 = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.ctrlKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Ctrl - " + String.fromCharCode(e.keyCode);
            b3 = "Ctrl - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
            b3 = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.shiftKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Shift - " + String.fromCharCode(e.keyCode);
            b3 = "Shift - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 48) && (e.keyCode <= 57)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
            b3 = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.altKey) && (e.keyCode >= 65) && (e.keyCode <= 90)) {
            e.preventDefault();
            document.getElementById('bind3').innerHTML = "Alt - " + String.fromCharCode(e.keyCode);
            b3 = "Alt - " + String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 48) && (e.keyCode <= 57)) {
            document.getElementById('bind3').innerHTML = String.fromCharCode(e.keyCode);
            b3 = String.fromCharCode(e.keyCode);
        }
        else if ((e.keyCode >= 65) && (e.keyCode <= 90)) {
            document.getElementById('bind3').innerHTML = String.fromCharCode(e.keyCode);
            b3 = String.fromCharCode(e.keyCode);
        }
    }
    
    function listenForUpgrade(){
        if (editUpgrade) {
            document.removeEventListener('keydown', onKeyDownUpgrade);
            document.getElementById('editbutton1').innerHTML = "Edit";
            editUpgrade = false;

            if (document.getElementById('bind1').innerHTML == document.getElementById('bind2').innerHTML) {
                document.getElementById('bind2').innerHTML = "";
                b2 = "";
            }
            if (document.getElementById('bind1').innerHTML == document.getElementById('bind3').innerHTML) {
                document.getElementById('bind3').innerHTML = "";
                b3 = "";
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
                b1 = "";
            }
            if (document.getElementById('bind2').innerHTML == document.getElementById('bind3').innerHTML) {
                document.getElementById('bind3').innerHTML = "";
                b3 = "";
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
                b2 = "";
            }
            if (document.getElementById('bind3').innerHTML == document.getElementById('bind1').innerHTML) {
                document.getElementById('bind1').innerHTML = "";
                b1 = "";
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
			function () {
                controls[0] = b1;
                controls[1] = b2;
                controls[2] = b3;
                localStorage['Tower.Controls'] = JSON.stringify(controls);
                game.showScreen('main-menu');
            });

        document.getElementById('editbutton1').addEventListener(
            'click',
			function () { listenForUpgrade(); });

        document.getElementById('editbutton2').addEventListener(
            'click',
			function () { listenForSell(); });

        document.getElementById('editbutton3').addEventListener(
            'click',
			function () { listenForStart(); });

        document.getElementById('bind1').innerHTML = b1
        document.getElementById('bind2').innerHTML = b2;
        document.getElementById('bind3').innerHTML = b3;

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
