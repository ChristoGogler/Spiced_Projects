console.log("...COUNTDOWN STARTING...");

//importing the local module "countdown"
const imported = require("./countdown.js");

//creating an instance of MyCountdown, with parameter 10 (seconds)
const myCountdown = new imported.MyCountdown(10);

//add event listener "secondElapsed"
myCountdown.on("secondElapsed", function (secondsTillTakeOff) {
    if (secondsTillTakeOff < 0) {
        return; //early return
    } else if (secondsTillTakeOff == 0) {
        console.log("Lift Off!"); //if event reaches 0
    } else {
        console.log(secondsTillTakeOff + "!");
    }
});

//kick off the countdown
myCountdown.countdown(10);
