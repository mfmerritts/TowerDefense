MyGame.screens['high-scores'] = (function (game) {
    'use strict';
    var highScores = {};
    
    function initialize() {
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
			function () {
                game.showScreen('main-menu');
            });
    }
    
    function sortObject(obj1, obj2) {
        return obj1.totalScore - obj2.totalScore;
    }
    
    function run() {
        
        var table = document.getElementById("tblHighScores"),
            tableRows = table.getElementsByTagName('tr'),
            rowCount = tableRows.length;
        
        for (var x = rowCount - 1; x > 0; x--) {
            table.removeChild(tableRows[x]);
        }

        highScores = localStorage.getItem('HighScores-All');
        
        if (highScores !== null) {
            highScores = JSON.parse(highScores);
        } else {
            highScores = [];
        }
        
        highScores.sort(sortObject);
       
        var count = 0;
        for (var i = 0; i < highScores.length; ++i) {
            count++;
            if (count > 10) {
                break;
            } else {
                var row = table.insertRow(1),
                    creepsKilled = row.insertCell(0),
                    livesRemaining = row.insertCell(1),
                    totalTowerValue = row.insertCell(2),
                    levelAndWave = row.insertCell(3),
                    totalScore = row.insertCell(4);
                
                creepsKilled.innerHTML = highScores[i].creepsDestroyed;
                livesRemaining.innerHTML = highScores[i].remainingLives;
                totalTowerValue.innerHTML = highScores[i].towerValues;
                levelAndWave.innerHTML = highScores[i].levelReached + ' / ' + highScores[i].waveReached;
                totalScore.innerHTML = highScores[i].totalScore;
            }
        }
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));