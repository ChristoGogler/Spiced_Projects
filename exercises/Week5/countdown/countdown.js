//importing the  module "events"
const events = require("events");

//constructor for MyCountdown
const MyCountdown = function (seconds) {
    this.seconds = seconds;
};

//add eventEmitter to the prototype, so that MyCountdown can use their methods
MyCountdown.prototype = new events.EventEmitter();

//implementing my own countdown method
MyCountdown.prototype.countdown = function (seconds) {
    if (seconds < 0) {
        return; //early return
    }
    this.emit("secondElapsed", seconds); // emits an event, passing the remaining seconds
    seconds--;
    setTimeout(() => {
        this.countdown(seconds); //call countdown again
    }, 1000);
};

//this is defining the package that will be exported
const exporting = {
    MyCountdown,
};

//export
module.exports = exporting;
