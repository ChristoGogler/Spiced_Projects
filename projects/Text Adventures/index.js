(function () {
    console.log("WELCOME TO THE TEXT ADVENTURE");

    //importing modules
    const readline = require("readline");
    const chalk = require("chalk");
    const adventure = require("./adventure.json");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    function startAdventure(adventureData) {
        askQuestion(getNextNode(adventureData));
    }

    // askQuestion
    //parameter: 1) node - string or object
    function askQuestion(node) {
        //if of type string - meaning no further choices to make - it's the end!
        if (typeof node == "string") {
            console.log(node + chalk.blue("  ...The End..."));
            rl.close(); //close the readline
            return;
        } else {
            //get the next question
            const q = node.q;
            //and possible answers
            const posAnswers = Object.keys(node.answers);

            //open readline
            rl.question(
                //log question and possible answers
                chalk.green(`${q} --- Options:[${posAnswers}]`),
                (input) => {
                    if (posAnswers.includes(input)) {
                        //get next question if input is valid
                        askQuestion(node.answers[input]);
                    } else {
                        console.log(
                            chalk.red(
                                "Sorry, your answer is not possible. Try again!"
                            )
                        );
                        //otherwise ask same question again
                        askQuestion(node);
                    }
                }
            );
        }
    }

    function getNextNode(node) {
        const { ...qa } = node;

        return qa;
    }

    startAdventure(adventure);
})();
