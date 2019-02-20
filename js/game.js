//init
var gameBoard = new Array();
var timer;
var currentTime;
var startTime;
var seconds = 0;
var minutes = 0;

function generateGameBoard() {
    $("#game").empty();
    for (var i = 0; i < 12; i++) {
        gameBoard.push([0, 0, 0, 0, 0, 0, 0, 0]);
        let newRow = document.createElement("DIV");
        newRow.className = "game-row";
        for (var j = 0; j < 8; j++) {
            let newDiv = document.createElement("DIV");
            newDiv.className = "game-field";
            const fieldId = i + "," + j;
            newDiv.id = fieldId;
            newDiv.height = "30px";// = newDiv.width;
            //newDiv.textContent = "a";
            newRow.append(newDiv);

        }
        $("#game").append(newRow);
    }
}

function startGame() {
    generateGameBoard();
    timerStart();
}

function timerStart() {
    timerReset();
    $(".btn-start").text("Reset");
    setInterval(function () {
        parseTimeUnits();
        currentTime = new Date;
        timer = currentTime - startTime;
        timer = timer.toString();
        timer = parseInt(timer);
        seconds = timer / 1000;

        timerUpdate();
    }, 10);
}

function timerStop() {
    console.log("a");
}

function timerReset() {
    startTime = new Date;
}

function timerUpdate() {
    if(seconds < 10) {
        var tmp = "0" + seconds;
        seconds = tmp;
    }
    if (seconds >= 60) {
        minutes += 1;
        startTime = new Date;
    }
    if (minutes < 10) {
        var tmp = "0" + minutes;
        minutes = tmp;
    }
    $(".timer-seconds").text(seconds);
    $(".timer-minutes").text(minutes);
}

function parseTimeUnits() {
    seconds = parseInt(seconds);
    minutes = parseInt(minutes);
}