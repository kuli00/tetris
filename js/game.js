//init
var gameBoard = new Array();
var timer;
var currentTime;
var startTime;
var seconds = 0;
var minutes = 0;

var colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#00ffff",
];

function generateGameBoard() {
    $("#game").empty();
    for (var i = 0; i < 12; i++) {
        gameBoard.push([0, 0, 0, 0, 0, 0, 0, 0]);
        let newRow = document.createElement("DIV");
        newRow.className = "game-row";
        for (var j = 0; j < 8; j++) {
            let newDiv = document.createElement("DIV");
            newDiv.className = "game-field";
            const fieldId = i + "_" + j;
            newDiv.id = fieldId;
            newRow.append(newDiv);

        }
        $("#game").append(newRow);
    }
}

function startGame() {
    generateGameBoard();
    timerStart();
    game();
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

function pickNewFigure() {
    let figureNumber = Math.floor(Math.random() * figures.length);
    return figures[figureNumber];
}

function pickNewColor(oldColor) {
    let colorId = Math.floor(Math.random() * colors.length);
    if (oldColor === null) {
        return colors[colorId];
    }
    if (colors[colorId] === oldColor) {
        pickNewColor(oldColor);
    }
    return colors[colorId];
}

function game() {
    let oldColor = null;
    let newFigure = true;
    let nextFigure = new Array();
    let currentFigurePlaced = true;

    let color;
    setInterval(function () {
        let currentFigurePosition = new Array();
        if (currentFigurePlaced) {
            nextFigure = pickNewFigure();
            color = pickNewColor(oldColor);
            currentFigurePlaced = false;
        }
        currentFigurePlaced = moveFigureDown(nextFigure, color);
    }, 500);
}


function moveFigureDown(nextFigure, color) {
    clearOldFigure(nextFigure);
    for (let i = 3; i >=0; i--) {
        nextFigure[i][0] += 1;
    }
    if(checkConflict(nextFigure) === false) {
        return true;
    }
    printNewFigure(nextFigure, color);
    refreshGameBoard();
    return false;
}

function clearOldFigure(oldFigure) {
    for (let i = 0; i <=3; i++) {
        for (let j = 1; j <= 4; j++) {
            if (oldFigure[i][j] !== null) {
                var y = oldFigure[i][0];
                var x = oldFigure[i][j];
                if (y >= 0) {
                    gameBoard[y][x] = 0;
                }
            }
        }
    }
}

function printNewFigure(nextFigure, color) {
    for (let i = 0; i <= 3; i++) {
        for (let j = 1; j <= 4; j++) {
            if (nextFigure[i][j] !== null) {
                var x = nextFigure[i][j];
                var y = nextFigure[i][0];
                if (y >= 0) {
                    gameBoard[y][x] = color;
                }
            }
        }
    }
}

function refreshGameBoard() {
    for (let i = 0; i <= 11; i++){
        for (let j = 0; j <= 7; j++) {
            var fieldId = "#" + i + "_" + j;
            var color = gameBoard[i][j];
            if (color === 0) {
                color = "#ffff00";
            }
            $(fieldId).css("background-color", color);
        }
    }
}

function checkConflict(nextFigure) {
    for (let i = 3; i >= 0; i--){
        for (let j = 0; j <= 3; j++) {
            if (nextFigure[i][0] > gameBoard.length - 1) {
                return false;
            }
        }
    }
}