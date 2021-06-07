const events = require("events");

const MyCountdown = function (seconds) {
    this.seconds = seconds;
};

MyCountdown.prototype = new events.EventEmitter();

MyCountdown.prototype.countdown = function (seconds) {
    // console.log("seconds", seconds);
    this.emit("secondElapsed", seconds);
    // console.log("emitting... seconds: ", seconds);
    seconds--;

    setTimeout(() => {
        this.countdown(seconds);
    }, 1000);
};

//this is defining the package that will be exported
const exporting = {
    MyCountdown,
};

const myCountdown = new MyCountdown(10);
console.log(typeof myCountdown, myCountdown);

myCountdown.on("secondElapsed", function (secondsTillTakeOff) {
    if (secondsTillTakeOff < 0) {
        return;
    } else if (secondsTillTakeOff == 0) {
        console.log("Lift Off!");
    } else {
        console.log(secondsTillTakeOff + "!");
    }
});

myCountdown.countdown(10);
