//init
let gameBoard;
const width = 10;
const height = 15;
var timer;
var currentTime;
var startTime;
var seconds = 0;
var minutes = 0;
let nextFigure = null;

var colors = [
    "#ff0000",
    "#ffff00",
    "#0000ff",
    "#00ffff",
    "#ff00ff",
];

function startGame() {
    timerStart();
    game();
}

$(document).ready(function () {
    gameBoard = new GameBoard(8, 12);
});

function game() {
    let oldColor = null;
    let newFigure = true;
    let currentFigurePlaced = true;

    let color;
    setInterval(function () {
        if (currentFigurePlaced) {
            nextFigure = null;
            nextFigure = new Block(gameBoard.pickNewFigure(), gameBoard.pickNewColor(oldColor));
            currentFigurePlaced = false;
        }
        if (!gameBoard.checkConflict(nextFigure)) {
            gameBoard.removeFigure(nextFigure);
            nextFigure.moveDown();
            gameBoard.mergeFigure(nextFigure);
            gameBoard.drawGameBoard();
        } else {
            gameBoard.placeFigure(nextFigure);
            gameBoard.checkFilledRow();
            currentFigurePlaced = true;
        }
    }, 500);
}

document.onkeydown = function(e) {
    gameBoard.removeFigure(nextFigure);
    switch(e.keyCode) {
        case 37:
            if (!gameBoard.checkHorizontalConflict(nextFigure, -1)) {
                nextFigure.moveLeft();
            }
            break;
        case 39:
            if (!gameBoard.checkHorizontalConflict(nextFigure, 1)) {
                nextFigure.moveRight();
            }
            break;
    }
    gameBoard.mergeFigure(nextFigure);
    gameBoard.drawGameBoard();
}

function resetGame() {
    window.location.reload();
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
    $(".timer-minutes").text("00");
    $(".timer-seconds").text("00.000");
    minutes = 0;
    seconds = 0;
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



function figureFall(nextFigure) {
    for (let i = 3; i >=0; i--) {
        nextFigure[i][0] += 1;
    }
    return nextFigure;
}

function clearOldFigure(oldFigure) {
    for (let i = 0; i <=3; i++) {
        for (let j = 1; j <= 4; j++) {
            if (oldFigure[i][j] !== null) {
                var y = oldFigure[i][0];
                var x = oldFigure[i][j];
                if (y >= 0 && y <= 11) {
                    gameBoard[y][x] = 0;
                }
            }
        }
    }
}

function printNewFigure(nextFigure, color) {
    for (let i = 0; i <= 3; i++) {
        for (let j = 1; j <= 4; j++) {
            if (nextFigure[i][j] !== null && nextFigure[i][0] >= 0) {
                var x = nextFigure[i][j];
                var y = nextFigure[i][0];
                if (y >= 0 && y <= 11) {
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
                color = "#d3d3d3";
            }
            $(fieldId).css("background-color", color);
        }
    }
}

function checkConflict(nextFigure) {
    var tmp = false;
    for (let i = 3; i >= 0; i--){
        if (nextFigure[i][0] > gameBoard.length) {
            tmp = true;
        }
        else {
            for (let j = 1; j <= 3; j++) {
                if (gameBoard[nextFigure[i][0]][nextFigure[i][j]] !== undefined ||
                    gameBoard[nextFigure[i][0]][nextFigure[i][j]] !== 0 ) {
                    return false;
                }
            }
        }
    }
    return tmp;
}