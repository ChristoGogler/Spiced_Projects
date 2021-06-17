const redPromise = new Promise((resolve, reject) => {
    resolve("Red Yay!");
    reject("Red No!");
});

const greenPromise = new Promise((resolve, reject) => {
    resolve("Green Yay!");
    reject("Green No!");
});

redPromise
    .then(function (val) {
        console.log("This promise was resolved.", val);
        return greenPromise;
    })
    .then(function (val) {
        console.log("resolved again", val);
    });
