//init
var timer;
var currentTime;
var startTime;
var seconds = 0;
var minutes = 0;

function startGame() {
    timerStart();
    console.log("click")
}

function timerStart() {
    timerReset();
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